import { useEffect, useMemo, useReducer } from 'react';
import {
  Control,
  FieldPathValue,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import CustomSelect from './CustomSelect';
import BaseControlledField, { DependentField } from '../BaseControlledField';
import FetchAdapter from '../adapter/fetch.adapter';
import {
  SelectControlledActionType,
  selectControlledReducer,
} from './reducer/selectControlled.reducer';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
export type FetchProperties<T> = {
  method: 'GET'; // | 'POST' | 'PUT' | 'DELETE';
  baseUrl: string;
  endpoint: string;
  valueReplacement?: Path<T>[];
};

export type OptionProperties<T extends FieldValues, K> = {
  valueProperty: keyof K;
} & RequireAtLeastOne<
  {
    nameProperty?: keyof K;
    onFormatMenuItemLabel?: (value: K) => string;
  },
  'nameProperty' | 'onFormatMenuItemLabel'
> &
  RequireAtLeastOne<
    {
      options?: K[];
      optionsFromApi?: FetchProperties<T>;
    },
    'options' | 'optionsFromApi'
  >;

type SelectControlledFieldProps<T extends FieldValues, K> = {
  label?: string;

  name: Path<T>;
  nameSelectedOption: Path<T>;
  placeholder?: string | null;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  control: Control<T>;
  disabled?: boolean;
  // valueToSet?: K[keyof K];
  valueToSet?: K[SelectControlledFieldProps<
    T,
    K
  >['optionProps']['valueProperty']];
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  optionProps: OptionProperties<T, K>;
  helperText?: string;
  informationText?: string;
};

const SelectControlledField = <
  T extends FieldValues,
  K extends { [key: string]: any }
>({
  label,
  name,
  nameSelectedOption,
  defaultValue,
  rules,
  control,
  disabled,
  valueToSet,
  setValue,
  optionProps: {
    options,
    optionsFromApi,
    valueProperty,
    nameProperty,
    onFormatMenuItemLabel,
  },
  watch,
  dependentFields,
  helperText = ' ',
  informationText,
}: SelectControlledFieldProps<T, K>) => {
  // const [internalOptions, setInternalOptions] = useState<K[]>([]);

  const memoizedOptionsFromApi = useMemo(() => optionsFromApi, []);

  const [
    { options: internalOptions, loading, error: errorFetchinData },
    dispatch,
  ] = useReducer(selectControlledReducer<K>, {
    options: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (
      valueToSet !== undefined &&
      valueToSet !== null &&
      internalOptions.length > 0
    ) {
      const selectedOption = internalOptions.find(
        (option) => option[valueProperty] === valueToSet
      );

      if (selectedOption) {
        setValue(name, valueToSet as PathValue<T, Path<T>>);
        setValue(nameSelectedOption, selectedOption as PathValue<T, Path<T>>);
      }
    }
  }, [valueToSet, internalOptions]);

  useEffect(() => {
    if (options !== undefined && options !== null) {
      dispatch({
        type: SelectControlledActionType.FETCH_SUCCESS,
        payload: options,
      });
    }
  }, [options]);

  useEffect(() => {
    if (
      memoizedOptionsFromApi !== undefined &&
      memoizedOptionsFromApi !== null
    ) {
      if (memoizedOptionsFromApi.valueReplacement) {
        const { valueReplacement } = memoizedOptionsFromApi;
        const hasAllRequiresValues = valueReplacement.every(
          (field) => watch(field) !== undefined && watch(field) !== null
        );
        if (hasAllRequiresValues) {
          exectApi(memoizedOptionsFromApi);
        }
      } else {
        exectApi(memoizedOptionsFromApi);
      }
    }
  }, [
    memoizedOptionsFromApi,
    ...(memoizedOptionsFromApi?.valueReplacement?.map((field) =>
      watch(field)
    ) || []),
  ]);

  const exectApi = async (optionsFromApi?: FetchProperties<T>) => {
    if (optionsFromApi === undefined || optionsFromApi === null) {
      return;
    }
    dispatch({ type: SelectControlledActionType.FETCH_INIT });
    let endpoint = optionsFromApi.endpoint;

    if (optionsFromApi.valueReplacement) {
      optionsFromApi.valueReplacement.forEach((field) => {
        const fieldValue = watch(field);
        endpoint = endpoint.replace(`{{${field}}}`, fieldValue);
      });
    }

    const api = new FetchAdapter(optionsFromApi.baseUrl);
    try {
      const data = await api.get<K[]>(endpoint);
      dispatch({
        type: SelectControlledActionType.FETCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SelectControlledActionType.FETCH_FAILURE,
        payload: ' Failed to fetch options. Click here to retry.',
      });
    }
  };

  return (
    <BaseControlledField
      watch={watch}
      dependentFields={dependentFields}
      name={name}
      control={control}
      disabled={disabled}
      defaultValue={defaultValue}
      rules={rules}
      render={({ value, onChange, onBlur, name, ref, error, disabled }) => {
        return (
          <CustomSelect<K>
            label={loading ? 'loading.....' : label}
            error={!!error}
            errorMessage={
              (errorFetchinData && (
                <span
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => exectApi(optionsFromApi)}
                >
                  {errorFetchinData}
                </span>
              )) ||
              error?.message
            }
            disabled={disabled}
            options={internalOptions}
            valueProperty={valueProperty}
            value={value}
            valueToSet={valueToSet}
            name={name}
            inputRef={ref}
            helperText={helperText}
            informationText={informationText}
            onFormatValue={(option: K) => {
              if (onFormatMenuItemLabel) {
                return onFormatMenuItemLabel(option);
              }
              return option[nameProperty];
            }}
            onChange={(selectedValue, selectedOption) => {
              onChange(selectedValue);
              setValue(
                nameSelectedOption,
                selectedOption as PathValue<T, Path<T>>
              );
            }}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default SelectControlledField;

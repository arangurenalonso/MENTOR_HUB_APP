import { useEffect, useMemo, useReducer, useRef } from 'react';
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
  valueReplacement?: { variableReplace: string; field: Path<T> }[] | undefined;
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
      optionsFromApi?: FetchProperties<T> | undefined;
    },
    'options' | 'optionsFromApi'
  >;

type SelectControlledFieldProps<T extends FieldValues, K> = {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  dependentFields?: DependentField<T>[];
  name: Path<T>;
  disabled?: boolean;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;

  label?: string;
  helperText?: string;
  informationText?: string;
  isFromArrayForm?: boolean;

  valueToSet?: K[SelectControlledFieldProps<
    T,
    K
  >['optionProps']['valueProperty']];
  // valueToSet?: K[keyof K];

  nameSelectedOption: Path<T>;
  optionProps: OptionProperties<T, K>;
};
const SelectControlledField = <
  T extends FieldValues,
  K extends { [key: string]: any }
>({
  watch,
  setValue,
  control,
  dependentFields,
  name,
  disabled,
  defaultValue,
  rules,

  label,
  helperText = ' ',
  informationText,
  isFromArrayForm,

  valueToSet,

  nameSelectedOption,
  optionProps: {
    options,
    optionsFromApi,
    valueProperty,
    nameProperty,
    onFormatMenuItemLabel,
  },
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
  const isInitialValueUsed = useRef(false);
  useEffect(() => {
    if (
      valueToSet !== undefined &&
      valueToSet !== null &&
      internalOptions.length > 0 &&
      isInitialValueUsed.current === false
    ) {
      isInitialValueUsed.current = true;
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
          ({ field }) => watch(field) !== undefined && watch(field) !== null
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
    ...(memoizedOptionsFromApi?.valueReplacement?.map(({ field }) =>
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
      optionsFromApi.valueReplacement.forEach(({ variableReplace, field }) => {
        const fieldValue = watch(field);
        endpoint = endpoint.replace(`{{${variableReplace}}}`, fieldValue);
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
            isFromArrayForm={isFromArrayForm}
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

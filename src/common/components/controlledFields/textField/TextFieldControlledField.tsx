import { useEffect } from 'react';
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
import BaseControlledField, { DependentField } from '../BaseControlledField';
import CustomTextField from './CustomTextField';
// import { v4 as uuidv4 } from 'uuid';

type TextFieldControlledFieldProps<T extends FieldValues> = {
  label?: string;
  icon?: React.ElementType;
  name: Path<T>;
  placeholder?: string | null;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  control: Control<T>;
  disabled?: boolean;
  valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  helperText?: string;
  informationText?: string;
};
const TextFieldControlledField = <T extends FieldValues>({
  label,
  icon: Icon,
  name,
  placeholder,
  defaultValue,
  rules,
  control,
  disabled,
  valueToSet,
  setValue,
  watch,
  dependentFields,
  helperText,
  informationText,
}: TextFieldControlledFieldProps<T>) => {
  //   const [id, setId] = useState(uuidv4());

  useEffect(() => {
    if (valueToSet !== undefined && valueToSet !== null) {
      setValue(name, valueToSet as PathValue<T, Path<T>>);
    }
  }, [valueToSet]);

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
          <CustomTextField
            inputRef={ref}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            helperText={helperText}
            informationText={informationText}
            placeholder={placeholder || ''}
            error={!!error}
            errorMessage={error?.message}
            disabled={disabled}
            Icon={Icon}
          />
        );
      }}
    />
  );
};

export default TextFieldControlledField;

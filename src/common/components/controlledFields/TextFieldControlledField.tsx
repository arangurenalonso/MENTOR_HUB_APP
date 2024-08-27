import { TextField } from '@mui/material';
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
import BaseControlledField, { DependentField } from './BaseControlledField';
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
          <TextField
            // id={`textField-id-${id}`}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            value={value || ''}
            disabled={disabled}
            name={name}
            label={label}
            placeholder={placeholder || ''}
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error?.message}
            InputProps={{
              startAdornment: <>{Icon && <Icon />}</>,
            }}
          />
        );
      }}
    />
  );
};

export default TextFieldControlledField;

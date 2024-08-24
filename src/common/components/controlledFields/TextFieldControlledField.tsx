import { TextField } from '@mui/material';
import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';
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
}: TextFieldControlledFieldProps<T>) => {
  //   const [id, setId] = useState(uuidv4());

  return (
    <Controller
      disabled={disabled}
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { value, onChange, onBlur, name, ref, disabled },
        fieldState: { error },
      }) => {
        return (
          <TextField
            // id={`textField-id-${id}`}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            value={value}
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

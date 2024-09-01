import {
  Control,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import CustomTextField from './CustomTextField';
import BaseControlledField, {
  DependentField,
} from '../common/BaseControlledField';
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
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  helperText?: string;
  informationText?: string;
  isFromArrayForm?: boolean;
  valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;
};
const TextFieldControlledField = <T extends FieldValues>({
  watch,
  // setValue,
  control,
  dependentFields,
  name,
  disabled,
  defaultValue,
  rules,
  valueToSet,

  label,
  helperText = ' ',
  informationText,
  isFromArrayForm,

  icon: Icon,
  placeholder,
}: TextFieldControlledFieldProps<T>) => {
  return (
    <BaseControlledField
      watch={watch}
      dependentFields={dependentFields}
      name={name}
      valueToSet={valueToSet}
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
            isFromArrayForm={isFromArrayForm}
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

import { TextField } from '@mui/material';
import { useMemo } from 'react';
import CustomInputLabel from '../common/CustomInputLabel';
type CustomTextFieldProps = {
  label?: string;
  value: string | number | undefined;
  onChange: (value?: string) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  Icon?: React.ElementType;
  helperText?: string;
  informationText?: string;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  error,
  errorMessage,
  disabled,
  inputRef,
  helperText = ' ',
  Icon,
  informationText,
}) => {
  const id: string = useMemo(() => {
    return `text-field-id-${name}`;
  }, [name]);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };
  return (
    <TextField
      id={id}
      onChange={handleOnChange}
      onBlur={onBlur}
      ref={inputRef}
      value={value || ''}
      disabled={disabled}
      name={name}
      label={
        <CustomInputLabel label={label} informationText={informationText} />
      }
      placeholder={placeholder || ''}
      variant="outlined"
      //   InputLabelProps={{ shrink: true, onClick: () => console.log('clicked') }}
      fullWidth
      error={!!error}
      helperText={error && errorMessage ? errorMessage : helperText}
      InputProps={{
        startAdornment: <>{Icon && <Icon />}</>,
      }}
    />
  );
};

export default CustomTextField;

import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';
import RichTextEditor from '../RichTextEditor/RichTextEditor';

type RichTextEditorControlledFieldProps<T extends FieldValues> = {
  name: Path<T>;
  nameForJson: Path<T>;
  placeholder?: string | null;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
};

const RichTextEditorControlledField = <T extends FieldValues>({
  name,
  nameForJson,
  placeholder,
  control,
  setValue,
  rules,
}: RichTextEditorControlledFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <RichTextEditor
            placeholder={placeholder || ''}
            onChange={({ plainText, jsonContent }) => {
              onChange(plainText);
              setValue(nameForJson, jsonContent as PathValue<T, Path<T>>);
            }}
            value={value}
            error={!!error}
            errorMessage={error?.message}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default RichTextEditorControlledField;

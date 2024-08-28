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
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import { useEffect } from 'react';
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import BaseControlledField, { DependentField } from './BaseControlledField';

type RichTextEditorControlledFieldProps<T extends FieldValues> = {
  name: Path<T>;
  namePlainText: Path<T>;
  placeholder?: string | null;
  rules:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  control: Control<T>;
  disabled?: boolean;
  setValue: UseFormSetValue<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
  valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;

  watch: UseFormWatch<T>;
  dependentFields?: DependentField<T>[];
  label?: string;
  helperText?: string;
  informationText?: string;
};

const RichTextEditorControlledField = <T extends FieldValues>({
  name,
  namePlainText,
  placeholder,
  control,
  setValue,
  rules,
  defaultValue,
  valueToSet,
  watch,
  dependentFields,
  disabled,
  label,
  helperText,
  informationText,
}: RichTextEditorControlledFieldProps<T>) => {
  useEffect(() => {
    if (valueToSet) {
      try {
        if (typeof valueToSet === 'string') {
          const rawContent = JSON.parse(valueToSet) as RawDraftContentState;
          const contentState = convertFromRaw(rawContent);
          const editorState = EditorState.createWithContent(contentState);
          const plainText = editorState.getCurrentContent().getPlainText();
          setValue(name, editorState as PathValue<T, Path<T>>);

          // const currentContent = editorState.getCurrentContent();
          // const rawContentState: RawDraftContentState =
          //   convertToRaw(currentContent);

          setValue(namePlainText, plainText as PathValue<T, Path<T>>);
        }
      } catch (error) {
        console.error('Invalid JSON value provided:', error);
      }
    }
  }, [valueToSet]);

  return (
    <>
      <BaseControlledField
        watch={watch as UseFormWatch<FieldValues>}
        dependentFields={dependentFields}
        name={namePlainText}
        control={control as Control<FieldValues>}
        disabled={disabled}
        defaultValue={defaultValue}
        rules={rules}
        render={({ value, onChange, onBlur, error, disabled }) => {
          return (
            <RichTextEditor
              placeholder={placeholder || ''}
              onChange={({ plainText, editorState }) => {
                onChange(plainText);
                setValue(name, editorState as PathValue<T, Path<T>>);
              }}
              disabled={disabled}
              value={value}
              valueToSet={valueToSet}
              error={!!error}
              errorMessage={error?.message}
              onBlur={onBlur}
              label={label}
              helperText={helperText}
              informationText={informationText}
            />
          );
        }}
      />
    </>
  );
};

export default RichTextEditorControlledField;

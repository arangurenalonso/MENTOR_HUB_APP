import {
  Control,
  Controller,
  FieldPathValue,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import { useEffect } from 'react';
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';

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
      <Controller
        name={namePlainText}
        control={control as Control<FieldValues>}
        rules={rules}
        defaultValue={defaultValue}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => {
          return (
            <RichTextEditor
              placeholder={placeholder || ''}
              onChange={({ plainText, editorState }) => {
                onChange(plainText);
                setValue(name, editorState as PathValue<T, Path<T>>);
              }}
              value={value}
              valueToSet={valueToSet}
              error={!!error}
              errorMessage={error?.message}
              onBlur={onBlur}
            />
          );
        }}
      />
      {/* <Controller
        name={namePlainText}
        control={control as Control<FieldValues>}
        rules={rules} // Aplica las reglas aquí
        render={({ fieldState: { error } }) => (
          <>{error && <p style={{ color: 'red' }}>{error.message}</p>}</>
        )}
      /> */}
    </>
  );
};

export default RichTextEditorControlledField;

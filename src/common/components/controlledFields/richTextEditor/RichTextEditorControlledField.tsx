import {
  Control,
  Controller,
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useEffect, useState } from 'react';
// import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js';
import RichTextEditor from './RichTextEditor/RichTextEditor';
import BaseControlledField, {
  DependentField,
} from '../common/BaseControlledField';

type RichTextEditorControlledFieldProps<T extends FieldValues> = {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  dependentFields?: DependentField<T>[];
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  defaultValue?: FieldPathValue<T, Path<T>>;
  rules:
    | Omit<
        RegisterOptions<FieldValues, Path<T>>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;

  label?: string;
  helperText?: string;
  informationText?: string;
  isFromArrayForm?: boolean;

  // valueToSet?: FieldPathValue<T, Path<T>> | string | undefined | null;

  namePlainText: Path<T>;
  placeholder?: string | null;
};
const RichTextEditorControlledField = <T extends FieldValues>({
  watch,
  // setValue,
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

  // valueToSet,

  namePlainText,
  placeholder,
}: RichTextEditorControlledFieldProps<T>) => {
  const [errorTextPlain, setErrorTextPlain] = useState<
    FieldError | undefined
  >();
  const [isBlur, setIsBlur] = useState(false);
  const [plainText, setPlainText] = useState('');
  // useEffect(() => {
  //   if (valueToSet) {
  //     try {
  //       if (typeof valueToSet === 'string') {
  //         const rawContent = JSON.parse(valueToSet) as RawDraftContentState;
  //         const contentState = convertFromRaw(rawContent);
  //         const editorState = EditorState.createWithContent(contentState);
  //         const plainText = editorState.getCurrentContent().getPlainText();
  //         setValue(name, editorState as PathValue<T, Path<T>>);

  //         // const currentContent = editorState.getCurrentContent();
  //         // const rawContentState: RawDraftContentState =
  //         //   convertToRaw(currentContent);

  //         setValue(namePlainText, plainText as PathValue<T, Path<T>>);
  //       }
  //     } catch (error) {
  //       console.error('Invalid JSON value provided:', error);
  //     }
  //   }
  // }, [valueToSet]);
  return (
    <>
      <BaseControlledField
        watch={watch as UseFormWatch<FieldValues>}
        dependentFields={dependentFields}
        name={name}
        control={control as Control<FieldValues>}
        disabled={disabled}
        defaultValue={defaultValue}
        // rules={rules}
        render={({
          value,
          onChange,
          onBlur,
          // error,
          disabled,
        }) => {
          return (
            <>
              <RichTextEditor
                placeholder={placeholder || ''}
                onChange={(editorState) => {
                  onChange(editorState);
                }}
                onChangePlaneText={(plainText) => {
                  // setValue(namePlainText, plainText as PathValue<T, Path<T>>);
                  setPlainText(plainText);
                }}
                isFromArrayForm={isFromArrayForm}
                disabled={disabled}
                value={value}
                // valueToSet={valueToSet}
                error={!!errorTextPlain}
                errorMessage={errorTextPlain?.message}
                onBlur={() => {
                  setIsBlur(true);
                  onBlur();
                }}
                label={label}
                helperText={helperText}
                informationText={informationText}
              />
              <Controller
                name={namePlainText}
                rules={rules}
                defaultValue={defaultValue}
                control={control as Control<FieldValues>}
                render={({
                  field: { onBlur, onChange },
                  fieldState: { error },
                }) => {
                  useEffect(() => {
                    if (isBlur) {
                      onBlur();
                    }
                  }, [isBlur]);
                  useEffect(() => {
                    onChange(plainText);
                  }, [plainText]);
                  useEffect(() => {
                    setErrorTextPlain(error);
                  }, [error]);
                  return <></>;
                }}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default RichTextEditorControlledField;

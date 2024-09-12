import { useEffect, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js';
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  useTheme,
} from '@mui/material';
import './RichTextEditor.css';
import { customStyleMap, myBlockStyleFn } from './richTextStyles';
import ToolbarRichTextEditor from './toolbar/ToolbarRichTextEditor';
import CustomInputLabel from '../../common/CustomInputLabel';

type RichTextEditorProps = {
  placeholder: string;
  value?: string | EditorState;
  // valueToSet?: string | EditorState | undefined | null;

  error?: boolean;
  errorMessage?: string;

  onChange: (editorStateJson: EditorState) => void;
  onChangePlaneText: (plainText: string) => void;
  onBlur?: () => void;
  label?: string;
  helperText?: string;
  informationText?: string;

  isFromArrayForm?: boolean;
  disabled?: boolean;
};
const RichTextEditor = ({
  placeholder,
  value,
  error = false,
  errorMessage = '',
  onChange,
  onChangePlaneText,
  onBlur,
  // valueToSet,
  label,
  helperText = ' ',
  informationText,
  isFromArrayForm,
  disabled,
}: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [charCount, setCharCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // const currentContent = editorState.getCurrentContent();
    // const rawContentState: RawDraftContentState = convertToRaw(currentContent);
    // const editorStateJson = JSON.stringify(rawContentState);

    onChange(editorState);
    const plainText = editorState.getCurrentContent().getPlainText();

    onChangePlaneText(plainText);
  }, [editorState]);

  useEffect(() => {
    // console.log('value', value);

    if (value === null || value === undefined || value === '') {
      const emptyEditorState = EditorState.createEmpty();

      setEditorState(emptyEditorState);
    }
    if (value) {
      try {
        if (typeof value === 'string') {
          const rawContent = JSON.parse(value) as RawDraftContentState;
          const contentState = convertFromRaw(rawContent);
          const editorState = EditorState.createWithContent(contentState);

          setEditorState(editorState);
        } else if (value instanceof EditorState) {
          const newValueText = value.getCurrentContent().hasText();
          const currentValueText = editorState.getCurrentContent().hasText();
          if (newValueText) {
            if (newValueText != currentValueText) {
              setEditorState(value);
            }
          }
        } else {
          console.error(
            'Invalid value type: Expected undefined, null, string or EditorState.'
          );
        }
      } catch (error) {
        console.log('Error', error);
      }
    }
  }, [value]);

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const plainText = currentContent.getPlainText();
    setCharCount(plainText.length);
  }, [editorState]);

  const editorRef = useRef<Editor>(null);
  const theme = useTheme();
  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleOnChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleFocusEditor = () => {
    // console.log('handleFocusEditor');
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  const handleOnChange = (editorState: EditorState) => {
    // console.log('HandleOnChange');
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    setEditorState(editorState);
  };
  const handleOnBlur = () => {
    // console.log('handleOnBlur');
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <FormControl fullWidth>
      {!isFromArrayForm && (
        <InputLabel
          sx={{
            backgroundColor: theme.palette.background.default,
            px: 1,
            color: error
              ? theme.palette.error.main
              : theme.palette.primary.main,
          }}
        >
          <CustomInputLabel
            label={label}
            labelStyles={{ fontSize: '20px' }}
            informationText={informationText}
          />
        </InputLabel>
      )}
      <Box
        sx={{
          color: error ? theme.palette.error.main : theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            border: `1px solid ${
              error ? theme.palette.error.main : theme.palette.primary.main
            }`,
            flexGrow: 1,
            overflow: 'auto',
            p: 1,
            minHeight: '150px',
            borderRadius: '5px',
          }}
        >
          <ToolbarRichTextEditor
            editorState={editorState}
            setEditorState={handleOnChange}
          />
          <Divider />
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 1,
              minHeight: '150px',
            }}
            onClick={handleFocusEditor}
          >
            <Editor
              onBlur={handleOnBlur}
              ref={editorRef}
              placeholder={placeholder}
              handleKeyCommand={handleKeyCommand}
              editorState={editorState}
              customStyleMap={customStyleMap}
              blockStyleFn={myBlockStyleFn}
              onChange={(editorState) => {
                handleOnChange(editorState);
              }}
              readOnly={disabled}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Esto distribuye el contenido equitativamente
            flexWrap: 'nowrap', // Evita que el contenido se envuelva
          }}
        >
          <Box
            sx={{
              flexShrink: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: error
                ? theme.palette.error.main
                : theme.palette.primary.main,
            }}
          >
            <FormHelperText
              sx={{
                color: error
                  ? theme.palette.error.main
                  : theme.palette.primary.main,
              }}
            >
              {errorMessage ? errorMessage : !isFromArrayForm && helperText}
            </FormHelperText>
          </Box>
          <Box sx={{ whiteSpace: 'nowrap', fontSize: '12px', paddingRight: 2 }}>
            &#x270F;&#xFE0F;: {charCount}
          </Box>
        </Box>
      </Box>
    </FormControl>
  );
};

export default RichTextEditor;

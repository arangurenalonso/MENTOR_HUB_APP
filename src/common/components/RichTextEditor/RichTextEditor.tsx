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
import CustomInputLabel from '../controlledFields/common/CustomInputLabel';

type RichTextEditorProps = {
  placeholder: string;
  value?: EditorState;
  valueToSet?: string | EditorState | undefined | null;

  error?: boolean;
  errorMessage?: string;

  onChange?: (content: { plainText: string; editorState: EditorState }) => void;
  onBlur?: () => void;
  label?: string;
  helperText?: string;
  informationText?: string;
  disabled?: boolean;
};
const RichTextEditor = ({
  placeholder,
  value,
  error = false,
  errorMessage = '',
  onChange,
  onBlur,
  valueToSet,
  label,
  helperText = ' ',
  informationText,
  disabled,
}: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    value || EditorState.createEmpty()
  );
  const [charCount, setCharCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (valueToSet) {
      try {
        if (typeof valueToSet === 'string') {
          const rawContent = JSON.parse(valueToSet) as RawDraftContentState;
          const contentState = convertFromRaw(rawContent);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
        }
      } catch (error) {
        // console.error('Invalid JSON value provided:', error);
      }
    }
  }, [valueToSet]);

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
      // console.log('initialLoad');
      setInitialLoad(false);
      return;
    }

    setEditorState(editorState);

    // const currentContent = editorState.getCurrentContent();
    // const rawContentState: RawDraftContentState = convertToRaw(currentContent);
    // const jsonContent = JSON.stringify(rawContentState);

    if (onChange) {
      onChange({
        plainText: editorState.getCurrentContent().getPlainText(),
        editorState: editorState,
      });
    }
  };
  const handleOnBlur = () => {
    // console.log('handleOnBlur');
    if (onBlur) {
      onBlur();
    }
  };
  return (
    <FormControl fullWidth>
      <InputLabel
        sx={{
          backgroundColor: 'white',
          px: 1,
          color: error ? theme.palette.error.main : theme.palette.primary.main,
        }}
      >
        <CustomInputLabel label={label} informationText={informationText} />
      </InputLabel>
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
            <FormHelperText>
              {errorMessage ? errorMessage : helperText}
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

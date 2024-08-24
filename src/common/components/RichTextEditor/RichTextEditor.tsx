import { useEffect, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertToRaw,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js';
import { Box, Typography, useTheme } from '@mui/material';
import './RichTextEditor.css';
import { customStyleMap, myBlockStyleFn } from './richTextStyles';
import ToolbarRichTextEditor from './toolbar/ToolbarRichTextEditor';

type RichTextEditorProps = {
  placeholder: string;
  value?: EditorState;
  valueToSet?: string | EditorState | undefined | null;

  error?: boolean;
  errorMessage?: string;

  onChange?: (content: { plainText: string; editorState: EditorState }) => void;
  onBlur?: () => void;
};
const RichTextEditor = ({
  placeholder,
  value,
  error = false,
  errorMessage = '',
  onChange,
  onBlur,
  valueToSet,
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
    console.log('HandleOnChange');
    if (initialLoad) {
      console.log('initialLoad');
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
    <Box sx={{ border: `2px solid  ${theme.palette.primary.main} `, p: 1 }}>
      <ToolbarRichTextEditor
        editorState={editorState}
        setEditorState={handleOnChange}
      />
      <Box
        sx={{
          border: `1px solid ${
            error ? theme.palette.error.main : theme.palette.primary.main
          }`,
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
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {error && (
          <Typography sx={{ mt: 1, color: theme.palette.error.main }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ flexGrow: 1 }}></Box>
        <Typography sx={{ mt: 2, textAlign: 'right' }}>
          &#x270F;&#xFE0F;: {charCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default RichTextEditor;

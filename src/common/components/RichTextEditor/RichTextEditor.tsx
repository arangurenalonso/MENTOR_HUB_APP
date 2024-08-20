import { useEffect, useRef, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertToRaw,
} from 'draft-js';
import { Box, Typography, useTheme } from '@mui/material';
import './RichTextEditor.css';
import { customStyleMap, myBlockStyleFn } from './richTextStyles';
import ToolbarRichTextEditor from './toolbar/ToolbarRichTextEditor';

type RichTextEditorProps = {
  placeholder: string;
  value?: string;

  error?: boolean;
  errorMessage?: string;

  onChange?: (content: { plainText: string; jsonContent: string }) => void;
  onBlur?: () => void;
};
const RichTextEditor = ({
  placeholder,
  value,
  error = false,
  errorMessage = '',
  onChange,
  onBlur,
}: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [charCount, setCharCount] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

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
    console.log('handleFocusEditor');
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };
  const handleOnChange = (editorState: EditorState) => {
    if (initialLoad) {
      setInitialLoad(false); // Marca la primera carga como completa
      return;
    }
    console.log('HandleOnChange');

    setEditorState(editorState);

    const currentContent = editorState.getCurrentContent();
    const plainText = currentContent.getPlainText('');
    setCharCount(plainText.length);
    const rawContentState = convertToRaw(currentContent);
    const jsonContent = JSON.stringify(rawContentState);

    if (onChange) {
      onChange({ plainText, jsonContent });
    }
  };
  const handleOnBlur = () => {
    console.log('handleOnBlur');

    if (onBlur) {
      onBlur(); // Ejecuta la función onBlur pasada como prop
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

      {error && (
        <Typography sx={{ mt: 1, color: theme.palette.error.main }}>
          {errorMessage}
        </Typography>
      )}
      <Typography sx={{ mt: 2, textAlign: 'right' }}>
        Characters: {charCount}
      </Typography>
    </Box>
  );
};

export default RichTextEditor;

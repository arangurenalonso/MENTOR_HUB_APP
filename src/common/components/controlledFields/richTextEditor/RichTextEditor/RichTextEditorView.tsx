import { Box } from '@mui/material';
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js';
import { useState, useEffect } from 'react';
import { customStyleMap, myBlockStyleFn } from './richTextStyles';

type RichTextEditorViewProps = {
  content: string;
};

const RichTextEditorView = ({ content }: RichTextEditorViewProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!content) {
      return;
    }
    try {
      const rawContent: RawDraftContentState = JSON.parse(content);
      const contentState = convertFromRaw(rawContent);
      setEditorState(EditorState.createWithContent(contentState));
    } catch (error) {
      console.error('Error converting content:', error);
    }
  }, [content]);
  return (
    <>
      <Editor
        editorState={editorState}
        customStyleMap={customStyleMap}
        blockStyleFn={myBlockStyleFn}
        onChange={() => {}}
        readOnly={true}
      />
    </>
  );
};

export default RichTextEditorView;

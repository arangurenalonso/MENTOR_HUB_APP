import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, DraftHandleValue } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Box, Button, useTheme } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const theme = useTheme();
  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onStrikeThroughClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  const onAlignLeftClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'left'));
  };

  const onAlignCenterClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'center'));
  };

  const onAlignRightClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'right'));
  };
  const onAlignJustifyClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'justify'));
  };

  const onBulletListClick = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, 'unordered-list-item')
    );
  };

  const onNumberedListClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
  };
  return (
    <Box sx={{ border: `2px solid  ${theme.palette.primary.main} `, p: 1 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: 2 }}>
        <Box sx={{ border: `2px solid  ${theme.palette.primary.main} ` }}>
          <Button onClick={onBoldClick}>
            <FormatBoldIcon />
          </Button>
          <Button onClick={onItalicClick}>
            <FormatItalicIcon />
          </Button>
          <Button onClick={onUnderlineClick}>
            <FormatUnderlinedIcon />
          </Button>
          <Button onClick={onStrikeThroughClick}>
            <StrikethroughSIcon />
          </Button>
        </Box>

        <Box sx={{ border: `2px solid  ${theme.palette.primary.main} ` }}>
          <Button onClick={onAlignLeftClick}>
            <FormatAlignLeftIcon />
          </Button>
          <Button onClick={onAlignCenterClick}>
            <FormatAlignCenterIcon />
          </Button>
          <Button onClick={onAlignRightClick}>
            <FormatAlignRightIcon />
          </Button>
          <Button onClick={onAlignJustifyClick}>
            <FormatAlignJustifyIcon />
          </Button>
        </Box>
        <Box sx={{ border: `2px solid  ${theme.palette.primary.main} ` }}>
          <Button onClick={onBulletListClick}>
            <FormatListBulletedIcon />
          </Button>
          <Button onClick={onNumberedListClick}>
            <FormatListNumberedIcon />
          </Button>
        </Box>
      </Box>
      <Box
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          minHeight: '300px',
        }}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </Box>
    </Box>
  );
};

export default RichTextEditor;

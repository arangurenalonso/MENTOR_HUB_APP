import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';

import { EditorState, RichUtils } from 'draft-js';
import { useEffect, useState } from 'react';
import { availableFontSizes } from '../richTextStyles';
import toolbarItems from './toolbarItems';

type ToolbarProps = {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
};

const fontStyles = availableFontSizes.map((x) => 'FONT_SIZE_' + x);

const selectTheSeccion = (editorState: EditorState): EditorState => {
  let newEditorState = editorState;
  const selection = newEditorState.getSelection();

  const updatedSelection = selection.merge({
    anchorOffset: selection.getStartOffset(),
    focusOffset: selection.getEndOffset(),
  });

  newEditorState = EditorState.forceSelection(newEditorState, updatedSelection);

  return newEditorState;
};

const setStylesFontSize = (
  editorState: EditorState,
  style: string
): EditorState => {
  let newEditorState = editorState;

  // Verifica si existe un tamaño de fuente aplicado que sea diferente al que queremos aplicar
  const hasDifferentFontSize = fontStyles.some(
    (fontStyle) =>
      fontStyle !== style && editorState.getCurrentInlineStyle().has(fontStyle)
  );
  // Si hay un tamaño de fuente diferente aplicado, eliminamos todos los tamaños de fuente antes de aplicar el nuevo
  if (hasDifferentFontSize) {
    newEditorState = fontStyles.reduce((state, fontStyle) => {
      return state.getCurrentInlineStyle().has(fontStyle)
        ? RichUtils.toggleInlineStyle(state, fontStyle)
        : state;
    }, newEditorState);
  }
  // Aplica el nuevo estilo de fuente si aún no se ha aplicado
  if (!newEditorState.getCurrentInlineStyle().has(style)) {
    newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
  }

  return newEditorState;
};

const ToolbarRichTextEditor = ({
  editorState,
  setEditorState,
}: ToolbarProps) => {
  const theme = useTheme();
  const [fontSize, setFontSize] = useState<string>('16');

  useEffect(() => {
    applyStyle(`FONT_SIZE_${fontSize}`, 'inline');
  }, [fontSize]);

  const handleFontSizeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const selectedFontSize = event.target.value;
    setFontSize(selectedFontSize);
  };
  const applyStyle = (
    style: string,
    method: string,
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    if (e) {
      e.preventDefault();
    }

    let newEditorState = editorState;
    if (method === 'block') {
      newEditorState = RichUtils.toggleBlockType(editorState, style);
    } else {
      if (style.startsWith('FONT_SIZE_')) {
        newEditorState = setStylesFontSize(editorState, style);
      } else {
        newEditorState = RichUtils.toggleInlineStyle(editorState, style);
      }
    }
    newEditorState = selectTheSeccion(newEditorState);
    setEditorState(newEditorState);
  };

  const isActive = (style: string, method: string) => {
    if (method === 'block') {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  const previewFontSize = (size: string) => {
    applyStyle(`FONT_SIZE_${size}`, 'inline');
  };

  const resetFontSizePreview = () => {
    applyStyle(`FONT_SIZE_${fontSize}`, 'inline');
  };
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: 2 }}>
      <Select
        value={fontSize}
        onChange={(e) => handleFontSizeChange(e)}
        onClick={(e) => e.preventDefault()}
        onOpen={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        sx={{ marginRight: 2 }}
      >
        {availableFontSizes.map((size) => (
          <MenuItem
            key={size}
            value={size}
            onMouseEnter={(e) => {
              e.preventDefault();
              previewFontSize(size.toString());
            }}
            onMouseLeave={(e) => {
              e.preventDefault();
              resetFontSizePreview();
            }}
          >
            {size}px
          </MenuItem>
        ))}
      </Select>
      {toolbarItems.map((item, idx) => (
        <IconButton
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(item.style, item.method, e)}
          onMouseDown={(e) => e.preventDefault()}
          sx={{
            color: isActive(item.style, item.method)
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
            border: isActive(item.style, item.method)
              ? `2px solid ${theme.palette.primary.main}`
              : 'none',
          }}
        >
          {item.icon || item.label}
        </IconButton>
      ))}
    </Box>
  );
};

export default ToolbarRichTextEditor;

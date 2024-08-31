import {
  DraftStyleMap,
  ContentBlock,
  ContentState,
  EditorState,
} from 'draft-js';
import { RenderConfig, stateToHTML } from 'draft-js-export-html';
import { customStyleMap } from './richTextStyles';

const transformStyleMap = (styleMap: DraftStyleMap) => {
  const transformedMap: { [styleName: string]: RenderConfig } = {};

  Object.keys(styleMap).forEach((key) => {
    transformedMap[key] = {
      style: {
        ...styleMap[key],
      },
    };
  });

  return transformedMap;
};

const renderBlockWithAlignment = (block: ContentBlock, alignment: string) => {
  const blockContentState = ContentState.createFromBlockArray([block]);
  const blockEditorState = EditorState.createWithContent(blockContentState);
  const blockHtml = stateToHTML(blockEditorState.getCurrentContent(), {
    inlineStyles: {
      ...transformStyleMap(customStyleMap),
    },
  });
  return `<div style="text-align: ${alignment}">${blockHtml}</div>`;
};

export const convertDraftToHtml = (editorState: EditorState) => {
  const currentContent = editorState.getCurrentContent();
  const htmlContent = stateToHTML(currentContent, {
    inlineStyles: {
      // BOLD: { style: { fontWeight: 'bold' } },
      // ITALIC: { style: { fontStyle: 'italic' } },
      // UNDERLINE: { style: { textDecoration: 'underline' } },
      // STRIKETHROUGH: { style: { textDecoration: 'line-through' } },
      // SUPERSCRIPT: { style: { verticalAlign: 'super', fontSize: 'smaller' } },
      // SUBSCRIPT: { style: { verticalAlign: 'sub', fontSize: 'smaller' } },
      ...transformStyleMap(customStyleMap),
    },
    blockRenderers: {
      leftAlign: (block) => renderBlockWithAlignment(block, 'left'),
      rightAlign: (block) => renderBlockWithAlignment(block, 'right'),
      centerAlign: (block) => renderBlockWithAlignment(block, 'center'),
      justifyAlign: (block) => renderBlockWithAlignment(block, 'justify'),
    },
    defaultBlockTag: 'div',
  });
  return htmlContent;
};

import { RawDraftContentState, convertToRaw } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
// html-to-draftjs
export const htmlToRawDraftContentState = (
  html: string
): RawDraftContentState => {
  const contentState = stateFromHTML(html);

  const rawDraftContentState = convertToRaw(contentState);

  return rawDraftContentState;
};

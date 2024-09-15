import { EditorState } from 'draft-js';

export type ProfileFormField = {
  headline: string;
  introductionPlainText: string;
  introduction: string | EditorState;

  teachingExperiencePlainText: string;
  teachingExperience: string | EditorState;

  motivationPlainText: string;
  motivation: string | EditorState;
};

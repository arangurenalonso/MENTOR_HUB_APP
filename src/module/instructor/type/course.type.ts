import { EditorState } from 'draft-js';

export type CategoryType = {
  id: string;
  description: string;
};

export type SubCategoryType = {
  id: string;
  description: string;
};

export type CourseFormField = {
  category: string;
  categoryOption: CategoryType;
  subCategory: string;
  subCategoryOption: SubCategoryType;
  courseTitle: string;
  courseDescriptionPlainText: string;
  courseDescription: EditorState;
  requirements: Partial<RequirementsForm>[];
  learningObjectives: Partial<LearningObjectiveForm>[];
  intendedLearners: Partial<IntendedLearnersForm>[];
};
export type RequirementsForm = {
  id: string;
  description: string;
};
export type LearningObjectiveForm = {
  id: string;
  description: string;
};
export type IntendedLearnersForm = {
  id: string;
  description: string;
};

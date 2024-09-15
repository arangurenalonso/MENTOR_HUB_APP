import { EditorState } from 'draft-js';
import {
  Category,
  Level,
  SubCategory,
} from '../../../store/course/course.type';
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
export type CourseFormField = {
  idCategory: string;
  categoryOption: Category;
  idLevel: string;
  levelOption: Level;
  idSubCategory: string;
  subCategoryOption: SubCategory;
  courseTitle: string;
  courseDescriptionPlainText: string;
  courseDescription: EditorState | string;
  requirements: Partial<RequirementsForm>[];
  learningObjectives: Partial<LearningObjectiveForm>[];
  intendedLearners: Partial<IntendedLearnersForm>[];
};

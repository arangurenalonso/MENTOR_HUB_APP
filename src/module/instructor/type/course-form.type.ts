import { EditorState } from 'draft-js';
import {
  Category,
  IntendedLearners,
  LearningObjective,
  Level,
  Requirements,
  SubCategory,
} from '../../../store/course/course.type';

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
  requirements: Partial<Requirements>[];
  learningObjectives: Partial<LearningObjective>[];
  intendedLearners: Partial<IntendedLearners>[];
};
export type ProfileFormField = {
  headline: string;
  introductionPlainText: string;
  introduction: string | EditorState;

  teachingExperiencePlainText: string;
  teachingExperience: string | EditorState;

  motivationPlainText: string;
  motivation: string | EditorState;
};

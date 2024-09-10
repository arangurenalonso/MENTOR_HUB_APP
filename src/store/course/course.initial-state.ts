import { CourseType } from './course.type';

export type courseStatus = 'Init' | 'Loading' | 'Error' | 'Loaded';

export enum courseStatusEnum {
  INIT = 'Init',
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
}

export type CourseState = {
  status: courseStatus;
  courses: CourseType[];
  course: CourseType | null;
  errorMessage: string | null;
};

export const courseInitialState: CourseState = {
  status: courseStatusEnum.INIT,
  courses: [],
  course: null,
  errorMessage: null,
};

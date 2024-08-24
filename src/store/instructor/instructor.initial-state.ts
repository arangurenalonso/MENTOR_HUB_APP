import { InstructorType } from './instructor.types';

export type instructorStatus = 'Init' | 'Loading' | 'Error' | 'Loaded';

export enum instructorStatusEnum {
  INIT = 'Init',
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
}

export type InstructorState = {
  status: instructorStatus;
  instructor: InstructorType | null;
  errorMessage: string | null;
};

export const instructorInitialState: InstructorState = {
  status: instructorStatusEnum.INIT,
  instructor: null,
  errorMessage: null,
};

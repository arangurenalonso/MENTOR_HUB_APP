import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  instructorInitialState,
  instructorStatusEnum,
} from './instructor.initial-state';
import { InstructorType } from './instructor.types';

export const instructorSlice = createSlice({
  name: 'instructor',
  initialState: instructorInitialState,
  reducers: {
    seInstructor: (state, action: PayloadAction<InstructorType>) => {
      const instructor = action.payload;
      state.instructor = instructor;
      state.status = instructorStatusEnum.LOADED;
      state.errorMessage = null;
    },
    onLogout: (state) => {
      state.instructor = null;
      state.status = instructorStatusEnum.INIT;
      state.errorMessage = null;
    },
    onChecking: (state) => {
      state.status = instructorStatusEnum.LOADING;
      state.errorMessage = null;
    },
    onSetError: (state, action: PayloadAction<string>) => {
      state.status = instructorStatusEnum.ERROR;
      state.instructor = null;
      state.errorMessage = action.payload;
    },
    onClear: (state) => {
      state.status = instructorStatusEnum.LOADED;
      state.instructor = null;
      state.errorMessage = null;
    },
  },
});

export const { seInstructor, onLogout, onChecking, onSetError, onClear } =
  instructorSlice.actions;

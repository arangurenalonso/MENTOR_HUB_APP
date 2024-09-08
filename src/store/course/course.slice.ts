import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { courseInitialState, courseStatusEnum } from './course.initial-state';
import { CourseType } from './course.type';

export const coursesSlice = createSlice({
  name: 'course',
  initialState: courseInitialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseType[]>) => {
      const courses = action.payload;
      state.courses = courses;
      state.status = courseStatusEnum.LOADED;
      state.errorMessage = null;
    },
    setCourse: (state, action: PayloadAction<CourseType>) => {
      const course = action.payload;
      state.course = course;
      state.status = courseStatusEnum.LOADED;
      state.errorMessage = null;
    },

    onLogout: (state) => {
      state.courses = [];
      state.course = null;
      state.status = courseStatusEnum.INIT;
      state.errorMessage = null;
    },
    onChecking: (state) => {
      state.status = courseStatusEnum.LOADING;
      state.errorMessage = null;
    },
    onSetError: (state, action: PayloadAction<string>) => {
      state.status = courseStatusEnum.ERROR;
      state.course = null;
      state.errorMessage = action.payload;
    },
    onClear: (state) => {
      state.status = courseStatusEnum.LOADED;
      state.course = null;
      state.errorMessage = null;
    },
  },
});

export const {
  setCourses,
  setCourse,
  onLogout,
  onChecking,
  onSetError,
  onClear,
} = coursesSlice.actions;

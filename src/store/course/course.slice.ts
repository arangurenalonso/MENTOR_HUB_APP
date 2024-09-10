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
    findAndSetCourse: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const course = state.courses.find((course) => course.id === id);
      if (course) {
        state.course = course;
      } else {
        state.course = null;
      }
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
      state.errorMessage = action.payload;
    },
    onClear: (state) => {
      state.status = courseStatusEnum.LOADED;
      state.errorMessage = null;
    },
    onInsertCourse: (state, action: PayloadAction<CourseType>) => {
      const course = action.payload;
      state.courses.push(course);
      state.course = course;
    },
    onUpdateCourse(state, action: PayloadAction<CourseType>) {
      const course = action.payload;
      const index = state.courses.findIndex((c) => c.id === course.id);
      if (index !== -1) {
        state.courses[index] = course;
      }
    },
  },
});

export const {
  setCourses,
  setCourse,
  onInsertCourse,
  onUpdateCourse,
  findAndSetCourse,
  onLogout,
  onChecking,
  onSetError,
  onClear,
} = coursesSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { courseInitialState, courseStatusEnum } from './course.initial-state';
import { CourseType } from './course.type';

export const coursesSlice = createSlice({
  name: 'course',
  initialState: courseInitialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseType[]>) => {
      // console.log('setCourses');
      const courses = action.payload;
      state.courses = courses;
      state.status = courseStatusEnum.LOADED;
      state.errorMessage = null;
    },
    setCourse: (state, action: PayloadAction<CourseType | null>) => {
      // console.log('setCourse');
      const course = action.payload;

      state.course = course;
      state.status = courseStatusEnum.LOADED;
      state.errorMessage = null;
    },
    findAndSetCourse: (state, action: PayloadAction<string>) => {
      // console.log('findAndSetCourse');
      const id = action.payload;
      const course = state.courses.find((course) => course.id === id);
      if (course) {
        state.course = course;
      } else {
        state.course = null;
      }
    },
    onLogout: (state) => {
      // console.log('onLogout');
      state.courses = [];
      state.course = null;
      state.status = courseStatusEnum.INIT;
      state.errorMessage = null;
    },
    onChecking: (state) => {
      // console.log('onChecking');
      state.status = courseStatusEnum.LOADING;
      state.errorMessage = null;
    },
    onSetError: (state, action: PayloadAction<string>) => {
      // console.log('onSetError');
      state.status = courseStatusEnum.ERROR;
      state.errorMessage = action.payload;
    },
    onClear: (state) => {
      // console.log('onClear');

      state.status = courseStatusEnum.LOADED;
      state.errorMessage = null;
    },
    onInsertCourse: (state, action: PayloadAction<CourseType>) => {
      // console.log('onInsertCourse');

      const course = action.payload;
      state.courses.push(course);
      state.course = course;
    },
    onUpdateCourse(state, action: PayloadAction<CourseType>) {
      // console.log('onUpdateCourse');
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

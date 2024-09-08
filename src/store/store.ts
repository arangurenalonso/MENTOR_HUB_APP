import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { themeSlice } from './theme/theme.slice';
import { instructorSlice } from './instructor/instructor.slice';
import { coursesSlice } from './course/course.slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    instructor: instructorSlice.reducer,
    courses: coursesSlice.reducer,
    theme: themeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

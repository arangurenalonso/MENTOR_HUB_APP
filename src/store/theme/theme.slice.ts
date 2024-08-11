import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialThemeState, themeEnum, ThemeMode } from './theme.initial-state';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    toggleTheme: (state) => {
      state.mode =
        state.mode === themeEnum.LIGHT ? themeEnum.DARK : themeEnum.LIGHT;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

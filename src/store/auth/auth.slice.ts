import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  authInitialState,
  authStatusEnum,
  UserPayLoad,
} from './auth.initial-state';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayLoad>) => {
      const user = action.payload;
      state.status = authStatusEnum.AUTHENTICATED;
      state.user = user;
      state.errorMessage = null;
    },
    onLogout: (state) => {
      state.status = authStatusEnum.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = null;
    },
    onChecking: (state) => {
      state.status = authStatusEnum.CHECKING;
      state.user = null;
      state.errorMessage = null;
    },
    onSetError: (state, action: PayloadAction<string>) => {
      state.status = authStatusEnum.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = action.payload;
    },
    onClear: (state) => {
      state.status = authStatusEnum.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = null;
    },
  },
});

export const { onChecking, setUser, onLogout, onSetError, onClear } =
  authSlice.actions;

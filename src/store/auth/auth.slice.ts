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
      console.log('setUser');

      const user = action.payload;
      state.isLogged = true;
      state.status = authStatusEnum.AUTHENTICATED;
      state.user = user;
      state.errorMessage = null;
    },
    onLogout: (state) => {
      console.log('onLogout');
      state.status = authStatusEnum.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = null;
      state.isLogged = false;
    },
    onChecking: (state) => {
      state.status = authStatusEnum.CHECKING;
      state.user = null;
      state.errorMessage = null;
    },
    onSetError: (state, action: PayloadAction<string>) => {
      console.log('onSetError');
      state.status = authStatusEnum.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = action.payload;
      state.isLogged = false;
    },
    onClear: (state) => {
      state.status = authStatusEnum.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = null;
    },
    onSetRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload;
    },
  },
});

export const {
  onChecking,
  setUser,
  onLogout,
  onSetError,
  onClear,
  onSetRedirectPath,
} = authSlice.actions;

import { useDispatch, useSelector } from 'react-redux';
import {
  onChecking,
  onClear,
  onLogout,
  onSetError,
  setUser,
} from '../store/auth/auth.slice';
import { authApi, registerParams } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';
import { UserPayLoad } from '../store/auth/auth.initial-state';
import { AppDispatch, RootState } from '../store/store';
import { ValidateError, ErrorData } from '../utils/adpters/axios-http-client';

const useAuthStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const handleDecodingError = (
    errorData: ValidateError[] | ErrorData | string
  ) => {
    let formattedErrorMessage: string = '';

    if (typeof errorData === 'string') {
      formattedErrorMessage = errorData;
    }
    if (Array.isArray(errorData)) {
      formattedErrorMessage = errorData
        .map((err) => `${err.field}: ${err.message}`)
        .join(', ');
    }
    if (
      typeof errorData === 'object' &&
      'type' in errorData &&
      'error' in errorData
    ) {
      formattedErrorMessage = errorData.error;
    }

    dispatch(onSetError(formattedErrorMessage));

    setTimeout(() => {
      dispatch(onClear());
    }, 5000);
  };
  const loginProcess = async (email: string, password: string) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.login(email, password);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleDecodingError(error.error);
      return;
    }
    const authenticationResponse = authenticationResult.value;
    const accessToken = authenticationResponse.accessToken;

    try {
      const decodedToken = jwtDecode<UserPayLoad>(accessToken);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(setUser(decodedToken));
    } catch (error) {
      console.error('Error decodificando el token:', error);
      handleDecodingError(
        'Error decodificando el token, please contact with TI.'
      );
      return;
    }
  };

  const registerProcess = async (params: registerParams) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.register(params);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleDecodingError(error.error);
      return;
    }
    const authenticationResponse = authenticationResult.value;
    const accessToken = authenticationResponse.accessToken;

    try {
      const decodedToken = jwtDecode<UserPayLoad>(accessToken);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(setUser(decodedToken));
    } catch (error) {
      console.error('Error decodificando el token:', error);
      handleDecodingError(
        'Error decodificando el token, please contact with TI.'
      );
      return;
    }
  };

  const logOutProcess = () => {
    dispatch(onLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('token-init');
    localStorage.clear();
  };
  return {
    //*Properties
    status,
    user,
    errorMessage,
    //*Methods
    loginProcess,
    registerProcess,
    // checkAuthToken,
    logOutProcess,
  };
};

export default useAuthStore;

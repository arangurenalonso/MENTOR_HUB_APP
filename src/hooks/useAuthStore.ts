import { useDispatch, useSelector } from 'react-redux';
import {
  onChecking,
  onClear,
  onLogout,
  onSetError,
  onSetRedirectPath,
  setUser,
} from '../store/auth/auth.slice';
import { authApi, registerParams } from '../api/auth.api';
import { jwtDecode } from 'jwt-decode';
import { UserPayLoad } from '../store/auth/auth.initial-state';
import { AppDispatch, RootState } from '../store/store';
import { ValidateError, ErrorData } from '../utils/adpters/axios-http-client';
import LocalStorageEnum from '../common/enum/localstorage.enum';
import { FirebaseAuth } from '../firebase/firebase.config';
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

const useAuthStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, user, isLogged, errorMessage, redirectPath } = useSelector(
    (state: RootState) => state.auth
  );

  const navigate = useNavigate();
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
  const signInProcess = async (email: string, password: string) => {
    dispatch(onChecking());
    const authenticationResult = await authApi.login(email, password);
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      handleDecodingError(error.error);
      return;
    }
    const authenticationResponse = authenticationResult.value;
    const accessToken = authenticationResponse.accessToken;
    await decodeToken(accessToken);
  };

  const signInGoogleProcess = async (timezone: string) => {
    let userCredential: UserCredential;
    try {
      const result = await signInWithPopup(FirebaseAuth, googleProvider);
      userCredential = result;
    } catch (error) {
      console.log('ERRORRRRRRRRRRRR al authentcar con google', error);
      return;
    }
    const { displayName, email, photoURL, uid } = userCredential.user;
    const authenticationResult = await authApi.socialMediaProvider({
      name: displayName || '',
      email: email! || '',
      uid,
      provider: 'Google',
      timeZone: timezone,
      photoURL,
    });
    if (authenticationResult.isErr()) {
      const error = authenticationResult.error;
      console.log('error', error);
      handleDecodingError(error.error);
      return;
    }
    const authenticationResponse = authenticationResult.value;
    const accessToken = authenticationResponse.accessToken;
    await decodeToken(accessToken);
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
    await decodeToken(accessToken);
  };

  const checkAuthTokenProcess = async () => {
    const accessToken = localStorage.getItem(LocalStorageEnum.TOKEN);

    if (!accessToken) {
      dispatch(onLogout());
      return;
    }
    const validTokenResponseResult = await authApi.validateToken();
    if (validTokenResponseResult.isErr()) {
      const error = validTokenResponseResult.error;
      console.log('error', error);
      handleDecodingError(error.error);
      return;
    }
    const validTokenResponse = validTokenResponseResult.value;
    if (validTokenResponse.isAuthenticated) {
      await decodeToken(accessToken);
    }
  };

  const logOutProcess = () => {
    dispatch(onLogout());
    localStorage.removeItem(LocalStorageEnum.TOKEN);
    localStorage.removeItem(LocalStorageEnum.TOKEN_INIT);
    localStorage.clear();
  };

  const setRedirectPath = (fullPathName: string | null) => {
    console.log('Entro', fullPathName);

    dispatch(onSetRedirectPath(fullPathName));
  };

  const decodeToken = async (accessToken: string) => {
    try {
      const decodedToken = jwtDecode<UserPayLoad>(accessToken);
      localStorage.setItem(LocalStorageEnum.TOKEN, accessToken);
      localStorage.setItem(
        LocalStorageEnum.TOKEN_INIT,
        new Date().getTime().toString()
      );

      dispatch(setUser(decodedToken));

      if (redirectPath) {
        navigate(redirectPath, {
          state: { replace: true },
        });
        onSetRedirectPath(null);
      }
    } catch (error) {
      console.error('Error decodificando el token:', error);
      handleDecodingError(
        `Error decoding the token, please contact IT support. ${error}}`
      );
      return;
    }
  };

  return {
    //*Properties
    status,
    user,
    errorMessage,
    isLogged,
    redirectPath,
    //*Methods
    signInProcess,
    registerProcess,
    checkAuthTokenProcess,
    logOutProcess,
    setRedirectPath,
    signInGoogleProcess,
  };
};

export default useAuthStore;

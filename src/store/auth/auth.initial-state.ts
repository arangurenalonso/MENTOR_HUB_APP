export type authStatus =
  | 'Init'
  | 'checking'
  | 'authenticated'
  | 'not-authenticated'
  | 'Error';

export enum authStatusEnum {
  ERROR = 'Error',
  INIT = 'Init',
  CHECKING = 'checking',
  AUTHENTICATED = 'authenticated',
  NOT_AUTHENTICATED = 'not-authenticated',
}

export type rolesType = {
  id: string;
  description: string;
};
export type timeZoneType = {
  id: string;
  offsetMinutes: number;
  offsetHours: number;
  timeZoneStringId: string;
  description: string;
};

export type UserPayLoad = {
  name: string;
  idUser: string;
  email: string;
  roles: rolesType[];
  timeZone: timeZoneType;
};

export type AuthState = {
  status: authStatus;
  isLogged: boolean;
  redirectPath: string | null;
  user: UserPayLoad | null;
  errorMessage: string | null;
};

export const authInitialState: AuthState = {
  status: authStatusEnum.INIT,
  isLogged: false,
  redirectPath: null,
  user: null,
  errorMessage: null,
};

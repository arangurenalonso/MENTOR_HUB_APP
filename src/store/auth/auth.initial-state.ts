export type authStatus =
  | 'checking'
  | 'authenticated'
  | 'not-authenticated'
  | 'Error';

export enum authStatusEnum {
  ERROR = 'Error',
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
  id: string;
  email: string;
  roles: rolesType[];
  timeZone: timeZoneType;
};

export type AuthState = {
  status: authStatus;
  user: UserPayLoad | null;
  errorMessage: string | null;
};

export const authInitialState: AuthState = {
  status: authStatusEnum.CHECKING,
  user: null,
  errorMessage: null,
};

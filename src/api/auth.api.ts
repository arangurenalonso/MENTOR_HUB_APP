import { AxiosHttpClient } from '../utils/adpters/axios-http-client';
import getEnvVariable from '../utils/envs/enviroments';

const httpClient = new AxiosHttpClient(getEnvVariable().AUTH_API_URL!);

export type registerParams = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  timeZone: string;
};

export type AuthenticationResponse = {
  accessToken: string;
  isAuthenticated: boolean;
  errorMessage: string;
};

export const authApi = {
  login: async (email: string, password: string) => {
    const data = { email, password };
    return await httpClient.postJson<AuthenticationResponse>(
      '/api/auth/login',
      data
    );
  },

  register: async (params: registerParams) => {
    const data = {
      name: params.name,
      email: params.email,
      password: params.password,
      confirmPassword: params.confirmPassword,
      timeZone: params.timeZone,
    };
    return await httpClient.postJson<AuthenticationResponse>(
      '/api/auth/register',
      data
    );
  },

  //   logout: async () => {
  //     return await httpClient.postJson('/auth/logout', {});
  //   },

  //   refreshToken: async () => {
  //     return await httpClient.postJson('/auth/refresh-token', {});
  //   },

  //   getUserProfile: async () => {
  //     return await httpClient.get('/auth/profile');
  //   },
};

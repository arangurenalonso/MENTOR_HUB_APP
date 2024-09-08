import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  // InternalAxiosRequestConfig,
} from 'axios';
import { Result, err, ok } from 'neverthrow';
import LocalStorageEnum from '../../common/enum/localstorage.enum';

export type ValidateError = {
  field: string;
  message: any;
};

export type ErrorData = {
  type: string;
  error: string;
  stack?: string;
};

type HttpError = {
  status?: number;
  error: ValidateError[] | ErrorData | string;
};
// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

export class AxiosHttpClient {
  private instance: AxiosInstance;
  // private isRefreshing = false;
  // private failedQueue: {
  //   resolve: (value: unknown) => void;
  //   reject: (reason?: any) => void;
  // }[] = [];

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
    // Interceptor para agregar el token en cada solicitud
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(LocalStorageEnum.TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Interceptor para manejar errores de respuesta
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // const originalRequest = error.config as
        //   | CustomAxiosRequestConfig
        //   | undefined;
        if (
          error.response?.status === 401
          // && originalRequest
          // && !originalRequest._retry
        ) {
          // if (this.isRefreshing) {
          //   return new Promise((resolve, reject) => {
          //     this.failedQueue.push({ resolve, reject });
          //   })
          //     .then(() => this.instance(originalRequest))
          //     .catch((err) => Promise.reject(err));
          // }
          // originalRequest._retry = true;
          // this.isRefreshing = true;
          // try {
          //   const newToken = await this.refreshToken();
          //   localStorage.setItem('token', newToken);
          //   this.processQueue(null, newToken);
          //   return this.instance(originalRequest);
          // } catch (refreshError) {
          //   this.processQueue(refreshError, null);
          //   return Promise.reject(refreshError);
          // } finally {
          //   this.isRefreshing = false;
          // }
        }
        return Promise.reject(error);
      }
    );
  }
  // private async refreshToken(): Promise<string> {
  //   // Suponiendo que tu API de refresh devuelve un nuevo token en la propiedad `token`
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   if (!refreshToken) {
  //     throw new Error('No refresh token available');
  //   }

  //   const response = await this.instance.post<{ token: string }>(
  //     '/auth/refresh',
  //     { token: refreshToken }
  //   );
  //   return response.data.token;
  // }
  // private processQueue(error: any, token: string | null = null) {
  //   this.failedQueue.forEach((prom) => {
  //     if (error) {
  //       prom.reject(error);
  //     } else {
  //       prom.resolve(token);
  //     }
  //   });
  //   this.failedQueue = [];
  // }
  async get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.get<T>(url, config);
      console.log('response', response.data);

      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getFile(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<Blob, HttpError>> {
    try {
      const response = await this.instance.get(url, {
        ...config,
        responseType: 'blob',
      });
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async postJson<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.post<T>(url, data, {
        ...config,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async postFormData<T>(
    url: string,
    formData: FormData,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.post<T>(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return ok(response.data);
    } catch (error) {
      return this.handleError(error);
    }
  }
  private handleError(error: unknown): Result<never, HttpError> {
    console.log('error', error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      if (this.isValidateErrorArray(errorData) || this.isErrorData(errorData)) {
        return err({ status, error: errorData });
      }
      if (typeof errorData === 'string') {
        return err({ status, error: errorData });
      }
      return err({ status, error: `Unexpected error format: ${errorData}` });
    } else {
      console.error('An unexpected error occurred:', error);
      return err({ error: `An unexpected error occurred:${error}` });
    }
  }

  private isValidateErrorArray(data: any): data is ValidateError[] {
    return (
      Array.isArray(data) && data.every((item) => item.field && item.message)
    );
  }

  private isErrorData(data: any): data is ErrorData {
    return (
      data && typeof data === 'object' && 'type' in data && 'error' in data
    );
  }
}

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Result, err, ok } from 'neverthrow';

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

export class AxiosHttpClient {
  private instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.instance = axios.create({
      baseURL: baseUrl,
    });
    // Interceptor para agregar el token en cada solicitud
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
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
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Si el código de estado es 401, cerrar la sesión
          this.handleUnauthorizedError();
        }
        return Promise.reject(error);
      }
    );
  }
  private handleUnauthorizedError() {
    console.error('No autorizado. Redirigiendo al login...');
    // Puedes agregar lógica adicional aquí, como redirigir al login
  }

  async get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<Result<T, HttpError>> {
    try {
      const response = await this.instance.get<T>(url, config);
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

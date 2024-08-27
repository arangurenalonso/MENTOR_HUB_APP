interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

class FetchAdapter {
  private baseURL: string;
  private defaultOptions: FetchOptions;

  constructor(baseURL: string, defaultOptions: FetchOptions = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = defaultOptions;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const config: FetchOptions = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json();
  }

  get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options: FetchOptions = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }
}
export default FetchAdapter;

import { API_CONFIG } from "./config";

export class BaseFetcher {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL = API_CONFIG.baseURL, headers = API_CONFIG.headers) {
    this.baseURL = baseURL;
    this.defaultHeaders = headers;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: this.defaultHeaders,
    });
    return this.handleResponse<T>(response);
  }

  protected async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.defaultHeaders,
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

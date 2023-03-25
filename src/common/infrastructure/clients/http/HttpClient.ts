export type RetriesConfig = {
  retries: number;
};

export default interface HttpClient {
  request<T>(options: HttpRequestOptions): Promise<HttpResponse<T>>;
  get<T>(
    operationId: string,
    url: string,
    timeout: number,
    headers?: any,
    retries?: RetriesConfig
  ): Promise<HttpResponse<T>>;
  post<T>(
    operationId: string,
    url: string,
    timeout: number,
    body?: any,
    headers?: any,
    retries?: RetriesConfig
  ): Promise<HttpResponse<T>>;
  put<T>(
    operationId: string,
    url: string,
    timeout: number,
    body?: any,
    headers?: any,
    retries?: RetriesConfig
  ): Promise<HttpResponse<T>>;
  patch<T>(
    operationId: string,
    url: string,
    timeout: number,
    body?: any,
    headers?: any,
    retries?: RetriesConfig
  ): Promise<HttpResponse<T>>;
  delete<T>(
    operationId: string,
    url: string,
    timeout: number,
    body?: any,
    headers?: any,
    retries?: RetriesConfig
  ): Promise<HttpResponse<T>>;
}

export interface HttpResponse<T> {
  status: number;
  data: T;
  headers: any;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export interface HttpRequestOptions {
  operation: string;
  url: string;
  method: HttpMethod;
  headers?: any;
  data?: any;
  timeout?: number;
  'axios-retry'?: RetriesConfig;
}

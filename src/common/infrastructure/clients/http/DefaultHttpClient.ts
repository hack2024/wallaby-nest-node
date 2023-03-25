import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import HttpClient, {
  HttpMethod,
  HttpRequestOptions,
  HttpResponse,
  RetriesConfig
} from '@common/infrastructure/clients/http/HttpClient';
import { toSnake } from 'snake-camel';
import axiosRetry from 'axios-retry';
import HttpClientException from '@common/infrastructure/errors/HttpClientException';
import Logger from '@common/infrastructure/Logger';

axiosRetry(axios, {
  retries: 0,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status <= 599)
    );
  }
});

/**
 * Contains all the common logic for making http requests
 * with circuit breakers and so on..
 */
@Injectable()
export default class DefaultHttpClient implements HttpClient {
  constructor(private readonly logger: Logger) {}

  async get<T>(
    operationId: string,
    url: string,
    timeout: number,
    headers?: any,
    retries: RetriesConfig = { retries: 0 }
  ): Promise<HttpResponse<T>> {
    const requestConfig: HttpRequestOptions = {
      method: HttpMethod.GET,
      url,
      headers,
      operation: operationId,
      timeout,
      'axios-retry': retries
    };

    return this.request(requestConfig);
  }

  async post<T>(
    operationId: string,
    url: string,
    timeout: number,
    data?: any,
    headers?: any,
    retries: RetriesConfig = { retries: 0 }
  ): Promise<HttpResponse<T>> {
    const requestConfig: HttpRequestOptions = {
      method: HttpMethod.POST,
      url,
      headers,
      data,
      operation: operationId,
      timeout,
      'axios-retry': retries
    };

    return this.request(requestConfig);
  }

  async put<T>(
    operationId: string,
    url: string,
    timeout: number,
    data?: any,
    headers?: any,
    retries: RetriesConfig = { retries: 0 }
  ): Promise<HttpResponse<T>> {
    const requestConfig: HttpRequestOptions = {
      method: HttpMethod.PUT,
      url,
      headers,
      data,
      operation: operationId,
      timeout,
      'axios-retry': retries
    };

    return this.request(requestConfig);
  }

  async patch<T>(
    operationId: string,
    url: string,
    timeout: number,
    data?: any,
    headers?: any,
    retries: RetriesConfig = { retries: 0 }
  ): Promise<HttpResponse<T>> {
    const requestConfig: HttpRequestOptions = {
      method: HttpMethod.PATCH,
      url,
      headers,
      data,
      operation: operationId,
      timeout,
      'axios-retry': retries
    };

    return this.request(requestConfig);
  }

  async delete<T>(
    operationId: string,
    url: string,
    timeout: number,
    data?: any,
    headers?: any,
    retries: RetriesConfig = { retries: 0 }
  ): Promise<HttpResponse<T>> {
    const requestConfig: HttpRequestOptions = {
      method: HttpMethod.DELETE,
      url,
      headers,
      data,
      operation: operationId,
      timeout,
      'axios-retry': retries
    };

    return this.request(requestConfig);
  }

  async request<T>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      url: options.url,
      data: toSnake(options.data),
      method: options.method,
      timeout: options.timeout,
      headers: options.headers,
      'axios-retry': options['axios-retry']
    };
    const result = await this.doRequest(requestConfig);
    return this.forceCast<HttpResponse<T>>(result);
  }

  private async doRequest(
    requestConfig: AxiosRequestConfig
  ): Promise<AxiosResponse<unknown>> {
    const defRestConfig: AxiosRequestConfig = {
      ...requestConfig,
      validateStatus(status) {
        return status < 500;
      }
    };

    let response;
    try {
      response = await axios.request(defRestConfig);

      return response;
    } catch (error) {
      throw new HttpClientException(
        `HTTP request error | method: ${requestConfig.method}, url: ${requestConfig.url}, status: ${response?.status}`,
        error as Error
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected forceCast<T>(input: unknown): T {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore <-- forces TS compiler to compile this as-is
    return input;
  }
}

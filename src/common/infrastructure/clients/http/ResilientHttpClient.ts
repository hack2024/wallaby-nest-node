import { Injectable } from '@nestjs/common';
import CircuitBreakers from '@common/infrastructure/clients/http/CircuitBreakers';
import DefaultHttpClient from '@common/infrastructure/clients/http//DefaultHttpClient';
import { HttpRequestOptions, HttpResponse } from './HttpClient';
import Logger from '@common/infrastructure/Logger';

@Injectable()
export default class ResilientHttpClient extends DefaultHttpClient {
  constructor(private readonly circuitBreakers: CircuitBreakers, log: Logger) {
    super(log);
  }

  async request<T>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
    const requestCall = (ops: HttpRequestOptions) => super.request(ops);
    const breaker = this.circuitBreakers.get(options.operation, requestCall);
    return this.forceCast<HttpResponse<T>>(breaker.fire(options));
  }
}

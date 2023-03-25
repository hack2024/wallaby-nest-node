import ErrorUtils from '@common/application/ErrorUtils';

export default class HttpClientException extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'Http Client Exception';
    Error.captureStackTrace(this);
    ErrorUtils.stackTrace(this, error);
  }
}

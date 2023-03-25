import Logger from '@common/infrastructure/Logger';

export default class DummyLogger extends Logger {
  info(message: any, args?: any): void {}

  warn(message: any, args?: any): void {}

  error(message: any, args?: any): void {}

  debug(message: any, args?: any): void {}
}

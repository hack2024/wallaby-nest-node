import Environment from '@common/application/Environment';
import * as winston from 'winston';

export default class Logger {
  private internalLogger: winston.Logger;

  constructor() {
    winston.addColors({
      error: 'red',
      warn: 'yellow',
      info: 'cyan',
      debug: 'green'
    });

    let format: any;

    if (Environment.isLocal()) {
      format = winston.format.combine(
        winston.format.printf((log) => {
          return `[${log.level.toUpperCase()}] | ${log.message} ${
            (log.message as unknown) instanceof Error
              ? (log.message as unknown as Error).stack
              : ''
          } | ${JSON.stringify(log.metadata)}`;
        }),
        winston.format.timestamp(),
        winston.format.colorize({ all: true })
      );
    } else {
      const newrelicFormatter = require('@newrelic/winston-enricher');
      format = winston.format.combine(
        winston.format.errors({ stack: true }),
        newrelicFormatter()
      );
    }

    const logConfiguration = {
      transports: [new winston.transports.Console()],
      format
    };
    this.internalLogger = winston.createLogger(logConfiguration);
    this.internalLogger.level = Environment.isLocal() ? 'info' : 'warn';
  }

  info(message: any, args?: any): void {
    this.internalLogger.info(message, {
      metadata: args
    });
  }

  warn(message: any, args?: any): void {
    this.internalLogger.warn(message, {
      metadata: args
    });
  }

  error(message: any, args?: any): void {
    const params = args instanceof Error ? { error: args } : { metadata: args };

    this.internalLogger.error(message, params);
  }

  debug(message: any, args?: any): void {
    this.internalLogger.debug(message, {
      metadata: args
    });
  }
}

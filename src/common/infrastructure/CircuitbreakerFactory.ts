import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CircuitBreaker from 'opossum';

import Logger from '@common/infrastructure/Logger';

/**
 * Used for creating circuit breakers
 * based on name
 */
export interface CircuitBreakerFactory {
  /**
   * Creates an instance of a circuit breaker depending on the name
   * @param name name of the cb specified in the config
   * @param fallback callback function to be trigger in case the breaker is open, log with the status of
   * the breaker is set by default.
   * @returns
   */
  create<TR = unknown>(
    name: string,
    call: (...args: any[]) => any,
    fallback?: (result: any) => void
  ): CircuitBreaker;
}

@Injectable()
export class DefaultCircuitBreakerFactory implements CircuitBreakerFactory {
  /**
   * Default options for all breakers if not specified in config.
   */
  private readonly breakerDefaultOptions: CircuitBreaker.Options = {
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 10000, // After 10 seconds, try again.
    rollingCountTimeout: 10000, // window time to check the service status
    rollingCountBuckets: 10 // number of buckets in which will be divided the rollingCountTimeout
  };

  constructor(
    private readonly config: ConfigService,
    private readonly logger: Logger
  ) {}

  /**
   * implementation of the create() in CircuitBreakerFactory interface
   * adds a fallback when the breaker is open if not specified
   * @param name name of the cb specified in the config
   * @param fallback callback function to be trigger in case the braker is open, log with the status of
   * the breaker is set by default.
   * @returns
   */
  create<TR = unknown>(
    name: string,
    call: (...args: any[]) => any,
    fallback?: (result: any) => void
  ): CircuitBreaker {
    const breakerConfig = this.config.get(
      'circuitBreakers.' + name,
      this.breakerDefaultOptions
    );

    const config = {
      ...breakerConfig,
      name
    };

    const breaker: CircuitBreaker = new CircuitBreaker<unknown[], TR>(
      call,
      config
    );

    if (fallback) {
      breaker.fallback(fallback);
    }

    // TODO Add in this events custom metrics for monitoring
    breaker.on('open', () => {
      this.logger.warn(`${name} circuit breaker open`, {});
    });
    breaker.on('halfOpen', () => {
      this.logger.warn(`${name} circuit breaker half open`, {});
    });
    breaker.on('close', () => {
      this.logger.warn(`${name} circuit breaker closed`, {});
    });

    return breaker;
  }
}

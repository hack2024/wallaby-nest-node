import { CircuitBreakerFactory } from '../../CircuitbreakerFactory';
import { Inject } from '@nestjs/common';
import CircuitBreaker from 'opossum';

/**
 Encapsulates all the circuit breaker instances and common logic
 between them.
 */
export default class CircuitBreakers {
  private readonly cbMap: Map<string, CircuitBreaker>;

  constructor(
    @Inject('DefaultCircuitBreakerFactory')
    private readonly circuitBreakerFactory: CircuitBreakerFactory
  ) {
    this.cbMap = new Map<string, CircuitBreaker>();
  }

  get(key: string, call: (...args: any[]) => any): CircuitBreaker {
    if (!this.cbMap.has(key)) {
      const breaker = this.circuitBreakerFactory.create(key, call);
      this.cbMap.set(key, breaker);
    }

    return this.cbMap.get(key) as CircuitBreaker;
  }
}

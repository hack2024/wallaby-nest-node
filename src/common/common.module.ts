import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import GreattingsController from '@common/application/controllers/GreattingsController';
import { GreattingsService } from '@common/domain/services/GreattingsService';
import { WeatherRepository } from '@common/infrastructure/repositories/WeatherRepository';
import GreattingsListener from '@common/application/listeners/GreattingsListener';
import { DefaultCircuitBreakerFactory } from '@common/infrastructure/CircuitbreakerFactory';
import { configLoader } from '@config/configuration';
import ProviderLoader from '@common/application/ProviderLoader';
import DefaultHttpClient from '@common/infrastructure/clients/http/DefaultHttpClient';
import ResilientHttpClient from '@common/infrastructure/clients/http/ResilientHttpClient';
import Logger from '@common/infrastructure/Logger';
import CircuitBreakers from './infrastructure/clients/http/CircuitBreakers';

const dependencies: any[] = ProviderLoader([
  GreattingsService,
  WeatherRepository,
  GreattingsListener,
  DefaultCircuitBreakerFactory,
  DefaultHttpClient,
  ResilientHttpClient
]);

const configurations = [
  ConfigModule.forRoot({
    load: [configLoader]
  }),
  EventEmitterModule.forRoot()
];

@Global()
@Module({
  imports: configurations,
  controllers: [GreattingsController],
  providers: [...dependencies, CircuitBreakers, Logger],
  exports: [...dependencies, ...configurations, Logger]
})
export default class CommonModule {}

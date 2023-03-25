import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import IWeatherRepository from '@common/domain/repositories/WeatherRepository';
import GreattingsEvent from '@common/domain/events/GreattingsEvent';
import Greattings from '@common/domain/entities/Greattings';

export interface IGreattingsSerivce {
  sayHi(): Promise<Greattings>;
}

@Injectable()
export class GreattingsService implements IGreattingsSerivce {
  constructor(
    @Inject('WeatherRepository')
    private readonly repository: IWeatherRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async sayHi(): Promise<Greattings> {
    try {
      const response = await this.repository.getWeather();
      this.eventEmitter.emit(
        'greattings.hi',
        new GreattingsEvent('someId', 'Pomelo')
      );
      return {
        message: response?.data?.Headline?.Text ?? ''
      };
    } catch (e) {
      throw new Error('Unexpected error when greatting');
    }
  }
}

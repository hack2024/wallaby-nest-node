import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WeatherDTO from '@common/domain/entities/Weather';
import IWeatherRepository from '@common/domain/repositories/WeatherRepository';
import ResilientHttpClient from '@common/infrastructure/clients/http/ResilientHttpClient';
import { HttpResponse } from '@common/infrastructure/clients/http/HttpClient';

@Injectable()
export class WeatherRepository implements IWeatherRepository {
  constructor(
    private readonly config: ConfigService,
    @Inject('ResilientHttpClient')
    private readonly httpClient: ResilientHttpClient
  ) {}

  getWeather(): Promise<HttpResponse<WeatherDTO>> {
    const url =
      'https://dataservice.accuweather.com/forecasts/v1/daily/1day/1236863?apikey=zpsba1ULzaxvzcikdJiDr0ztADYHe5nw&language=es-AR';

    return this.httpClient.get<WeatherDTO>('weather', url, 3000);
  }
}

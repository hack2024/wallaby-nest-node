import { HttpResponse } from '@common/infrastructure/clients/http/HttpClient';
import WeatherDTO from '@common/domain/entities/Weather';

export default interface IWeatherRepository {
  getWeather(): Promise<HttpResponse<WeatherDTO>>;
}

import { Controller, Get, Inject } from '@nestjs/common';
import { IGreattingsSerivce } from '@common/domain/services/GreattingsService';
import Greattings from '@common/domain/entities/Greattings';

type GreattingsControllerResponse = Promise<Greattings>;

@Controller()
export default class GreattingsController {
  private greattingsService: IGreattingsSerivce;

  constructor(@Inject('GreattingsService') service: IGreattingsSerivce) {
    this.greattingsService = service;
  }

  @Get('/ping')
  getPong(): string {
    return 'pong';
  }

  @Get('/hi')
  async getHello(): GreattingsControllerResponse {
    return await this.greattingsService.sayHi();
  }
}

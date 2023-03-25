import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HTTP } from '@config/types';
import { HttpOptionsDefault } from '@common/infrastructure/HttpOptionsDefault';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get<ConfigService>(ConfigService);
  const http = configService.get<HTTP>('http') || HttpOptionsDefault;

  await app.listen(http.port, http.host);
  const logger = new Logger('main');
  logger.log(`App listening on ${http.host}:${http.port}`);
}

bootstrap();

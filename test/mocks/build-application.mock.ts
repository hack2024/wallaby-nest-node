import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import Logger from '@common/infrastructure/Logger';
import DummyLogger from 'test/common/DummyLogger';
import AppModule from '../../src/app.module';

let app: NestFastifyApplication;

interface ProvidersInterface {
  token: string;
  spy: unknown;
}

const buildApplication = async (
  providers: Array<ProvidersInterface>
): Promise<NestFastifyApplication> => {
  const testingModuleBuilder = Test.createTestingModule({
    imports: [AppModule]
  });

  // this is for cancelling log noise in test console
  testingModuleBuilder.overrideProvider(Logger).useValue(new DummyLogger());

  providers.forEach((provider) => {
    testingModuleBuilder
      .overrideProvider(provider.token)
      .useValue(provider.spy);
  });

  const testingModule = await testingModuleBuilder.compile();
  app = testingModule.createNestApplication(new FastifyAdapter());

  await app.init();

  return app;
};

const stopApplication = async (): Promise<void> => {
  await app.close();
};

export { buildApplication, stopApplication };

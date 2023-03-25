import { expect } from 'chai';
import Greattings from '@common/domain/entities/Greattings';
import GreattingsController from '@common/application/controllers/GreattingsController';
import { IGreattingsSerivce } from '@common/domain/services/GreattingsService';

describe('GreattingsController', () => {
  // Mocks
  const greattingServicMock: IGreattingsSerivce = {
    sayHi(): Promise<Greattings> {
      return Promise.resolve({
        message: 'Hi there!'
      });
    }
  };

  // Tests
  describe('get -> /hi', () => {
    const controller = new GreattingsController(greattingServicMock);

    it('should return { message : "Hi there!"}', async () => {
      const response = await controller.getHello();

      expect(response).to.be.eql({ message: 'Hi there!' });
    });
  });

  describe('get -> /ping', () => {
    const controller = new GreattingsController(greattingServicMock);

    it('should return "pong"', async () => {
      const response = await controller.getPong();

      expect(response).to.be.eq('pong');
    });
  });
});

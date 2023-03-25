import { expect } from 'chai';
import {
  buildApplication,
  stopApplication
} from '../mocks/build-application.mock';

describe('Ping', () => {
  after(async () => {
    await stopApplication();
  });

  it('Pong', async () => {
    const app = await buildApplication([]);

    const response = await app.inject({
      method: 'GET',
      url: `/ping`
    });

    expect(response.statusCode).to.be.eq(200);
    expect(response.body).to.be.eq('pong');
  });
});

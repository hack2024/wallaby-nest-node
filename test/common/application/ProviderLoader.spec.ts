import ProviderLoader from '@common/application/ProviderLoader';
import { expect } from 'chai';

describe('provider loader', () => {
  it('should return a specific framework provider json', () => {
    class Foo {}
    class Bar {}

    const result = ProviderLoader([Foo, Bar]);

    expect(result).to.be.eql([
      {
        provide: 'Foo',
        useClass: Foo
      },
      {
        provide: 'Bar',
        useClass: Bar
      }
    ]);
  });
});

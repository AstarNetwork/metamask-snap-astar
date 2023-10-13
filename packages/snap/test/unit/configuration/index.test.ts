import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import type { UnitConfiguration } from '@astar-network/metamask-astar-types';
import { getConfiguration, getDefaultConfiguration } from '../../../src/configuration';
import {
  defaultConfiguration,
  kusamaConfiguration,
  westendConfiguration
} from '../../../src/configuration/predefined';
import { EmptyMetamaskState } from '../../../src/interfaces';
import type { WalletMock } from '../wallet.mock';
import { getWalletMock } from '../wallet.mock';

type SnapNetworks = 'astar' | 'shiden' | 'shibuya';

interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

chai.use(sinonChai);

describe('Test configuration functions', function () {
  describe('getDefaultConfiguration', function () {
    it('should return shiden configuration on "shiden"', function () {
      const configuration = getDefaultConfiguration('shiden');
      expect(configuration).to.be.deep.eq(kusamaConfiguration);
    });

    it('should return shibuya configuration on "shibuya"', function () {
      const configuration = getDefaultConfiguration('shibuya');
      expect(configuration).to.be.deep.eq(westendConfiguration);
    });

    it('should return default configuration on empty string', function () {
      const configuration = getDefaultConfiguration('');
      expect(configuration).to.be.deep.eq(defaultConfiguration);
    });

    it('should return default configuration on non network name string', function () {
      const configuration = getDefaultConfiguration('test');
      expect(configuration).to.be.deep.eq(defaultConfiguration);
    });
  });

  describe('getConfiguration', function () {
    let walletStub: WalletMock;

    before(function () {
      walletStub = getWalletMock();
    });

    afterEach(function () {
      walletStub.reset();
    });

    it('should return configuration saved in state"', async function () {
      const customConfiguration: SnapConfig = {
        addressPrefix: 5,
        networkName: 'shibuya',
        wsRpcUrl: 'url'
      };
      walletStub.request.returns({ config: JSON.stringify(customConfiguration) });
      const configuration = await getConfiguration();
      expect(configuration).to.be.deep.eq(customConfiguration);
    });

    it('should return default configuration on empty state"', async function () {
      walletStub.request.returns(EmptyMetamaskState());
      const configuration = await getConfiguration();
      expect(configuration).to.be.deep.eq(defaultConfiguration);
    });
  });
});

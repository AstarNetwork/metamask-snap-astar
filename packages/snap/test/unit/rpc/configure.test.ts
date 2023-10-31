import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import type { UnitConfiguration } from '@astar-network/metamask-astar-types';
import { kusamaConfiguration, westendConfiguration } from '../../../src/configuration/predefined';
import { configure } from '../../../src/rpc/configure';
import { EmptyMetamaskState } from '../../../src/interfaces';
import { getWalletMock } from '../wallet.mock';

type SnapNetworks = 'astar' | 'shiden' | 'shibuya';

interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

chai.use(sinonChai);
const walletStub = getWalletMock();

describe('Test rpc handler function: configure', function () {
  afterEach(function () {
    walletStub.reset();
  });

  it('should set predefined shiden configuration', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const result = await configure('shiden', {});

    // assertions
    expect(result).to.be.deep.eq(kusamaConfiguration);
  });

  it('should set predefined shibuya configuration', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const result = await configure('shibuya', {});
    // assertions
    expect(result).to.be.deep.eq(westendConfiguration);
  });

  it('should set custom configuration', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // stubs
    const customConfiguration: SnapConfig = {
      addressPrefix: 1,
      networkName: 'shibuya',
      unit: { customViewUrl: 'custom-view-url', decimals: 1, image: 'image', symbol: 'TST' },
      wsRpcUrl: 'ws-rpc-url'
    };
    // tested method
    const result = await configure('test-network', customConfiguration);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
  });

  it('should set predefined shiden configuration with additional property override', async function () {
    walletStub.request.returns(EmptyMetamaskState());
    // tested method
    const customConfiguration = kusamaConfiguration;
    if (customConfiguration.unit) {
      customConfiguration.unit.symbol = 'TST_KSM';
    }
    const result = await configure('shiden', {
      unit: { symbol: 'TST_KSM' }
    } as SnapConfig);
    // assertions
    expect(result).to.be.deep.eq(customConfiguration);
  });
});

import deepmerge from 'deepmerge';
import type { UnitConfiguration } from '@chainsafe/metamask-polkadot-types';
import { getDefaultConfiguration } from '../configuration';
import { getMetamaskState } from './getMetamaskState';

export type SnapNetworks = 'astar' | 'shiden' | 'shibuya';

export interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

export async function configure(networkName: string, overrides: unknown): Promise<SnapConfig> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = deepmerge(defaultConfig, overrides) as SnapConfig;

  const state = await getMetamaskState();
  console.info('Current state', state);
  await snap.request({
    method: 'snap_manageState',
    params: {
      newState: { ...state, config: JSON.stringify(configuration) },
      operation: 'update'
    }
  });

  return configuration;
}

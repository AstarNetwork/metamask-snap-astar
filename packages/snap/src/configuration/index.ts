import type { UnitConfiguration } from '@astar-network/metamask-astar-types';
import { getMetamaskState } from '../rpc/getMetamaskState';
import {
  defaultConfiguration,
  kusamaConfiguration,
  polkadotConfiguration,
  westendConfiguration
} from './predefined';

export type SnapNetworks = 'astar' | 'shiden' | 'shibuya';

export interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case 'astar':
      console.log('Astar configuration selected');
      return polkadotConfiguration;
    case 'shiden':
      console.log('Shiden configuration selected');
      return kusamaConfiguration;
    case 'shibuya':
      console.log('Shibuya configuration selected');
      return westendConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(): Promise<SnapConfig> {
  const state = await getMetamaskState();

  if (!state?.config) {
    return defaultConfiguration;
  }
  return JSON.parse(<string>state.config) as SnapConfig;
}

import type { UnitConfiguration } from '@astar-network/metamask-astar-types';
import { getMetamaskState } from '../rpc/getMetamaskState';
import {
  defaultConfiguration,
  kusamaConfiguration,
  polkadotConfiguration,
  westendConfiguration
} from './predefined';

export type SnapNetworks = 'astar' | 'shiden' | 'shibuya';

export type SnapConfig = {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

/**
 * Retrieves the default configuration for a specified network.
 *
 * @param networkName - The name of the network ('astar', 'shiden', or 'shibuya')
 * @returns The configuration object for the specified network, or default configuration if network is not recognized
 */
export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case 'astar':
      return polkadotConfiguration;
    case 'shiden':
      return kusamaConfiguration;
    case 'shibuya':
      return westendConfiguration;
    default:
      return defaultConfiguration;
  }
}

/**
 * Retrieves the current snap configuration from MetaMask state.
 * If no configuration is stored in state, returns the default configuration.
 *
 * @returns A promise that resolves to the current snap configuration
 */
export async function getConfiguration(): Promise<SnapConfig> {
  const state = await getMetamaskState();

  if (!state?.config) {
    return defaultConfiguration;
  }
  return JSON.parse(<string>state.config) as SnapConfig;
}

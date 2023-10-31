import type { UnitConfiguration } from '@astar-network/metamask-astar-types';

export type SnapNetworks = 'astar' | 'shiden' | 'shibuya';

export interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

export const kusamaConfiguration: SnapConfig = {
  addressPrefix: 5,
  networkName: 'shiden',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L3o.svg',
    symbol: 'SDN'
  },
  wsRpcUrl: 'https://shiden.api.onfinality.io/public'
};

export const westendConfiguration: SnapConfig = {
  addressPrefix: 5,
  networkName: 'shibuya',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'SBY'
  },
  wsRpcUrl: 'https://shibuya.public.blastapi.io'
};

export const polkadotConfiguration: SnapConfig = {
  addressPrefix: 5,
  networkName: 'astar',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/zAE.svg',
    symbol: 'ASTR'
  },
  wsRpcUrl: 'https://astar.api.onfinality.io/public'
};

export const defaultConfiguration: SnapConfig = westendConfiguration;

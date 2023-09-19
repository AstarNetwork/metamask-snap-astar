import type { SnapConfig } from '@chainsafe/metamask-polkadot-types';

export const kusamaConfiguration: SnapConfig = {
  addressPrefix: 5,
  networkName: 'kusama',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L3o.svg',
    symbol: 'SDN'
  },
  wsRpcUrl: 'https://shiden.api.onfinality.io/public'
};

export const westendConfiguration: SnapConfig = {
  addressPrefix: 5,
  networkName: 'westend',
  unit: {
    decimals: 18,
    image: 'https://svgshare.com/i/L2d.svg',
    symbol: 'SBY'
  },
  wsRpcUrl: 'https://shibuya.public.blastapi.io'
};

export const polkadotConfiguration: SnapConfig = {
  addressPrefix: 5,
  networkName: 'polkadot',
  unit: {
    decimals: 18,
    image: 'https://polkadot.js.org/apps/static/polkadot-circle.1eea41b2..svg',
    symbol: 'ASTR'
  },
  wsRpcUrl: 'https://astar.api.onfinality.io/public'
};

export const defaultConfiguration: SnapConfig = westendConfiguration;

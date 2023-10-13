import type { SnapConfig } from '@astar-network/metamask-astar-types';

declare module '@astar-network/metamask-astar-adapter' {
  export function injectMetamaskPolkadotSnapProvider(
    network: 'westend' | 'kusama',
    config?: SnapConfig,
    pluginOrigin?: string
  ): void;
}

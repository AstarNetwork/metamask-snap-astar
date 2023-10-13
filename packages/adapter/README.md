# Metamask <> Astar snap adapter

![](https://github.com/AstarNetwork/metamask-snap-astar/workflows/ci/badge.svg)
![](https://img.shields.io/github/license/AstarNetwork/metamask-snap-astar)
![](https://img.shields.io/badge/yarn-%3E%3D1.17.0-orange.svg?style=flat-square)
![Discord](https://img.shields.io/discord/644182966574252073?color=blue&label=Discord&logo=discord)

Metamask <> Astar snap adapter is used to inject [astar snap](https://github.com/AstarNetwork/metamask-snap-astar) as web3 provider. It lists snap inside `window.injectedWeb3["metamask-astar-snap"]` so it can be enabled using `@polkadot/extension-dapp` package.  

For more details on astar snap itself see [snap repo](https://github.com/AstarNetwork/metamask-snap-astar) or read full [astar snap documentation](https://github.com/AstarNetwork/metamask-snap-astar/wiki).

## Usage

Adapter has only one exposed function for enabling snap as web3 provider.

```typescript
function enablePolkadotSnap(
  config?: SnapConfig,
  snapOrigin?: string,
  snapInstallationParams?: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetamaskPolkadotSnap>
```

By providing `config` as argument it is possible to override default configurations.

Configuration structure is shown below.

```ts
SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

SnapNetworks = "astar" | "shiden" | "shibuya";

UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}
```

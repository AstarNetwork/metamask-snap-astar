import { web3EnablePromise, web3Enable } from '@polkadot/extension-dapp';
import type { InjectedMetamaskExtension } from '@astar-network/metamask-astar-adapter/src/types';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { enablePolkadotSnap, initPolkadotSnap } from '@astar-network/metamask-astar-adapter';
import type { MetamaskPolkadotSnap } from '@astar-network/metamask-astar-adapter/build/snap';

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

export const defaultSnapId = 'local:http://localhost:8081';

export async function installPolkadotSnap(): Promise<boolean> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    await enablePolkadotSnap({ networkName: 'shibuya' as any }, snapId);
    console.info('Snap installed!!');
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function isPolkadotSnapInstalled(): Promise<boolean> {
  return !!(await getInjectedMetamaskExtension());
}

export async function getInjectedMetamaskExtension(): Promise<InjectedMetamaskExtension | null> {
  const extensions = await web3EnablePromise;
  console.log('extensions', extensions);
  return getMetamaskExtension(extensions || []) || null;
}

function getMetamaskExtension(
  extensions: InjectedExtension[]
): InjectedMetamaskExtension | undefined {
  console.log('getMetamaskExtension', extensions);
  return extensions.find((item) => item.name === 'metamask-astar-snap') as unknown as
    | InjectedMetamaskExtension
    | undefined;
}

export interface SnapInitializationResponse {
  isSnapInstalled: boolean;
  snap?: MetamaskPolkadotSnap;
}

export async function initiatePolkdatodSnap(): Promise<SnapInitializationResponse> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;

  try {
    console.info('Attempting to connect to snap...');
    const metamaskPolkadotSnap = await enablePolkadotSnap(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
      { networkName: 'shibuya' as any },
      snapId
    );
    console.info('Snap installed!');
    // await initPolkadotSnap();
    // const extensions = await web3Enable('metamask-astar-snap');
    // console.info('extensions', extensions);
    return { isSnapInstalled: true, snap: metamaskPolkadotSnap };
  } catch (e) {
    console.error(e);
    return { isSnapInstalled: false };
  }
}

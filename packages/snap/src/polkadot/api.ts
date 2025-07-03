import { ApiPromise, HttpProvider } from '@polkadot/api';
import { getConfiguration } from '../configuration';

let api: ApiPromise;
let provider: HttpProvider;
let isConnecting: boolean;

/**
 * Initialize substrate api and awaits for it to be ready
 */
async function initApi(rpcUrl: string): Promise<ApiPromise> {
  try {
    provider = new HttpProvider(rpcUrl);
  } catch (error) {
    console.error('Error on provider creation', error);
    throw error;
  }
  const api = await ApiPromise.create({ provider });

  return api;
}

export const resetApi = async (): Promise<void> => {
  if (api && provider) {
    try {
      await api.disconnect();
    } catch (e) {
      console.error('Error on api disconnect.');
    }
    api = null;
    provider = null;
  }
};

export const getApi = async (): Promise<ApiPromise> => {
  if (!api) {
    // api not initialized or configuration changed
    const config = await getConfiguration();
    api = await initApi(config.wsRpcUrl);
    isConnecting = false;
  } else {
    while (isConnecting) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!provider.isConnected) {
      isConnecting = true;
      await provider.connect();
      isConnecting = false;
    }
  }
  return api;
};

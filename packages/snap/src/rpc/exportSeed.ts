import type { JsonBIP44CoinTypeNode } from '@metamask/key-tree';
import { showConfirmationDialog } from '../util/confirmation';

const astarCoinType = 810;

export async function exportSeed(): Promise<string | null> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog({
    prompt: 'Do you want to export your seed?'
  });
  // return seed if user confirmed action
  if (confirmation) {
    const bip44Node = (await snap.request({
      method: 'snap_getBip44Entropy',
      params: { coinType: astarCoinType }
    })) as JsonBIP44CoinTypeNode;
    return bip44Node.privateKey.slice(0, 32);
  }
  return null;
}

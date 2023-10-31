import type { JsonBIP44CoinTypeNode } from '@metamask/key-tree';
import { showConfirmationDialog } from '../util/confirmation';

const astarCoinType = 810;

export async function exportSeed(): Promise<string | null> {
  // ask for confirmation
  const confirmation = await showConfirmationDialog({
    prompt: `Are you sure you want to export your seed? 
    Please be aware that exporting your seed poses significant risks:

    - If your seed is exposed to others, they can gain full access to your funds.
    - A leaked seed can lead to a total loss of all your assets in this account.
  
    To ensure the security of your funds:
    
    - Store your seed in a secure, offline location.
    - Do not share your seed with anyone.
    - Avoid storing it on digital devices that can be hacked or accessed without your consent.
  
    By exporting your seed, you acknowledge these risks and the responsibility for keeping it safe. 
    Do you still wish to proceed?`
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

import { panel, heading, text } from '@metamask/snaps-ui';

type ConfirmationDialogContent = {
  prompt: string;
  description?: string;
  textAreaContent?: string;
};

export async function showConfirmationDialog(message: ConfirmationDialogContent): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      content: panel([
        heading(message.prompt || 'Are you sure?'),
        text(message.description || ''),
        text(message.textAreaContent || '')
      ]),
      type: 'confirmation'
    }
  })) as boolean;
}

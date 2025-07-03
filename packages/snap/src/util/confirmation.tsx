import { Box, Heading, Text  } from '@metamask/snaps-sdk/jsx';

type ConfirmationDialogContent = {
  prompt: string;
  description?: string;
  textAreaContent?: string;
};

export async function showConfirmationDialog(message: ConfirmationDialogContent): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      content: (
        <Box>
          <Heading>{message.prompt || 'Are you sure?'}</Heading>
          {<Text>{message.description || ''}</Text>}
          {<Text>{message.textAreaContent || ''}</Text>}
        </Box>
      ),
      type: 'confirmation'
    }
  })) as boolean;
}

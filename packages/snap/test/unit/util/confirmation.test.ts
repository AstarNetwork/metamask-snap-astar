import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { panel, heading, text } from '@metamask/snaps-ui';
import { showConfirmationDialog } from '../../../src/util/confirmation';
import { getWalletMock } from '../wallet.mock';

chai.use(sinonChai);

describe('Test showConfirmationDialog', function () {
  // eslint-disable-next-line mocha/no-setup-in-describe
  const walletStub = getWalletMock();

  afterEach(function () {
    walletStub.reset();
  });

  it('should return true on positive confirmation', async function () {
    await showConfirmationDialog({
      description: 'description',
      prompt: 'confirmation',
      textAreaContent: 'textAreaContent'
    });

    expect(walletStub.request).to.have.been.calledOnceWith({
      method: 'snap_dialog',
      params: {
        content: panel([heading('confirmation'), text('description'), text('textAreaContent')]),
        type: 'confirmation'
      }
    });
  });

  it('should return false on negative confirmation', async function () {
    await showConfirmationDialog({ prompt: 'confirmation' });

    expect(walletStub.request).to.have.been.calledOnceWith({
      method: 'snap_dialog',
      params: {
        content: panel([heading('confirmation'), text(''), text('')]),
        type: 'confirmation'
      }
    });
  });
});

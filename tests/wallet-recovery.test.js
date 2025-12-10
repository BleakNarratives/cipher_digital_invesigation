import { test } from 'node:test';
import assert from 'node:assert';
import { AdvancedWalletRecovery } from '../src/wallet/advanced-recovery.js';

test('Wallet Recovery - Mnemonic Validation', async () => {
  const recovery = new AdvancedWalletRecovery();
  const validMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
  
  assert.strictEqual(recovery.validateMnemonic(validMnemonic), true);
  assert.strictEqual(recovery.validateMnemonic('invalid mnemonic'), false);
});

test('Wallet Recovery - Typo Correction', async () => {
  const recovery = new AdvancedWalletRecovery();
  const corrections = recovery.findTypoCorrections('abandn', 2);
  
  assert.ok(corrections.length > 0);
  assert.strictEqual(corrections[0].word, 'abandon');
});

test('Wallet Recovery - Multi-Chain Derivation', async () => {
  const recovery = new AdvancedWalletRecovery();
  const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
  const addresses = recovery.deriveMultiChain(mnemonic, 5);
  
  assert.strictEqual(addresses.ethereum.length, 5);
  assert.ok(addresses.ethereum[0].address.startsWith('0x'));
});

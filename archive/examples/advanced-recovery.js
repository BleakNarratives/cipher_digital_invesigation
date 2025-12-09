import { CryptoForensicsWorkbench } from '../src/index.js';

async function advancedRecoveryDemo() {
  const workbench = await new CryptoForensicsWorkbench().initialize();
  
  console.log('🚀 Advanced Recovery Demonstration\n');
  
  // Scenario 1: Partial mnemonic recovery
  console.log('📝 Scenario 1: Recovering partial mnemonic');
  const partialMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
  
  // Simulate missing word at position 2
  const words = partialMnemonic.split(' ');
  words[2] = '???';
  const damaged = words.join(' ');
  
  console.log('Damaged mnemonic:', damaged);
  console.log('Starting parallel brute force...\n');
  
  workbench.walletRecovery.on('progress', (data) => {
    console.log(`Progress: ${data.checked}/${data.total} words checked`);
  });
  
  // Note: This would take time in production
  // const results = await workbench.walletRecovery.bruteForceParallel(damaged, [2]);
  // console.log('Found:', results.length, 'valid mnemonics\n');
  
  // Scenario 2: Typo correction
  console.log('🔧 Scenario 2: Correcting typos');
  const typoMnemonic = 'abandn abandn abandn abandn abandn abandn abandn abandn abandn abandn abandn about';
  const suggestions = workbench.walletRecovery.suggestCorrections(typoMnemonic);
  
  console.log('Found typos at positions:', suggestions.map(s => s.position));
  suggestions.forEach(s => {
    console.log(`Position ${s.position}: "${s.original}" -> "${s.suggestions[0].word}"`);
  });
  
  // Scenario 3: Multi-chain derivation
  console.log('\n💼 Scenario 3: Multi-chain address derivation');
  const addresses = workbench.walletRecovery.deriveMultiChain(partialMnemonic, 5);
  
  console.log('Ethereum addresses:');
  addresses.ethereum.forEach((addr, i) => {
    console.log(`  [${i}] ${addr.address}`);
  });
  
  console.log('\n✅ Demo complete!');
}

advancedRecoveryDemo().catch(console.error);

import { CryptoForensicsWorkbench } from '../src/index.js';

async function main() {
  const workbench = await new CryptoForensicsWorkbench().initialize();
  
  // Example 1: Generate and validate mnemonic
  console.log('\n📝 Wallet Recovery Example:');
  const mnemonic = workbench.walletRecovery.generateMnemonic();
  console.log('Generated mnemonic:', mnemonic);
  console.log('Valid:', workbench.walletRecovery.validateMnemonic(mnemonic));
  
  // Example 2: Multi-chain wallet derivation
  console.log('\n💼 Multi-Chain Wallet Recovery:');
  const addresses = workbench.walletRecovery.deriveMultiChain(mnemonic, 3);
  console.log('Ethereum addresses:', addresses.ethereum.map(a => a.address));
  
  // Example 3: Typo correction
  console.log('\n🔧 Typo Correction:');
  const corrections = workbench.walletRecovery.findTypoCorrections('abandn', 2);
  console.log('Suggestions:', corrections.slice(0, 3).map(c => c.word));
  
  // Example 4: Crypto utilities
  console.log('\n🔐 Crypto Utils Example:');
  const data = 'sensitive data';
  const password = 'strong-password';
  const encrypted = workbench.cryptoUtils.encrypt(data, password);
  console.log('Encrypted:', encrypted.encrypted.substring(0, 32) + '...');
  const decrypted = workbench.cryptoUtils.decrypt(encrypted, password);
  console.log('Decrypted:', decrypted);
  
  // Example 5: Case management
  console.log('\n📁 Case Management:');
  const caseData = await workbench.caseManager.createCase({
    investigator: 'Agent Smith',
    subject: 'Suspicious wallet activity',
    priority: 'high'
  });
  console.log('Case created:', caseData.caseId);
  
  // Example 6: Graph analysis
  console.log('\n📊 Graph Analysis:');
  const mockTransactions = [
    { from: '0xaaa', to: '0xbbb', value: '1.5', timestamp: Date.now() },
    { from: '0xbbb', to: '0xccc', value: '0.5', timestamp: Date.now() },
    { from: '0xaaa', to: '0xccc', value: '2.0', timestamp: Date.now() }
  ];
  workbench.graphAnalyzer.buildTransactionGraph(mockTransactions);
  const stats = workbench.graphAnalyzer.getStatistics();
  console.log('Graph stats:', stats);
}

main().catch(console.error);

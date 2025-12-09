import { performance } from 'perf_hooks';
import { CryptoForensicsWorkbench } from '../src/index.js';

async function benchmarkWalletRecovery() {
  console.log('\n🔬 Benchmarking Wallet Recovery...');
  
  const workbench = await new CryptoForensicsWorkbench().initialize();
  const testMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
  
  const start = performance.now();
  
  // Test mnemonic validation
  for (let i = 0; i < 10000; i++) {
    workbench.walletRecovery.validateMnemonic(testMnemonic);
  }
  
  const end = performance.now();
  const opsPerSec = 10000 / ((end - start) / 1000);
  
  console.log(`✓ Mnemonic validation: ${opsPerSec.toFixed(0)} ops/sec`);
}

async function benchmarkGraphAnalysis() {
  console.log('\n🔬 Benchmarking Graph Analysis...');
  
  const workbench = await new CryptoForensicsWorkbench().initialize();
  
  // Generate test transactions
  const transactions = [];
  for (let i = 0; i < 1000; i++) {
    transactions.push({
      from: `0x${i.toString(16).padStart(40, '0')}`,
      to: `0x${(i + 1).toString(16).padStart(40, '0')}`,
      value: Math.random() * 10,
      timestamp: Date.now()
    });
  }
  
  const start = performance.now();
  workbench.graphAnalyzer.buildTransactionGraph(transactions);
  const patterns = workbench.graphAnalyzer.findSuspiciousPatterns();
  const end = performance.now();
  
  console.log(`✓ Graph analysis (1000 tx): ${(end - start).toFixed(2)}ms`);
  console.log(`✓ Patterns found: ${Object.values(patterns).flat().length}`);
}

async function runBenchmarks() {
  console.log('🚀 Starting Benchmarks...');
  
  await benchmarkWalletRecovery();
  await benchmarkGraphAnalysis();
  
  console.log('\n✅ Benchmarks complete!');
}

runBenchmarks().catch(console.error);

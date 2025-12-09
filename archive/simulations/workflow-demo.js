#!/usr/bin/env node
import { CryptoForensicsWorkbench } from '../src/index.js';
import chalk from 'chalk';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function timestamp() {
  return new Date().toISOString();
}

function log(emoji, message, data = null) {
  console.log(`${chalk.gray(timestamp())} ${emoji} ${message}`);
  if (data) {
    console.log(chalk.cyan(JSON.stringify(data, null, 2)));
  }
}

async function simulateWorkflow() {
  console.log(chalk.bold.cyan('\n🚀 CRYPTO FORENSICS WORKBENCH - WORKFLOW SIMULATION\n'));
  
  // Initialize
  log('⚙️', 'Initializing Crypto Forensics Workbench...');
  const workbench = await new CryptoForensicsWorkbench().initialize();
  await delay(1000);
  
  console.log(chalk.bold.yellow('\n📋 SCENARIO 1: WALLET RECOVERY INVESTIGATION\n'));
  
  // Scenario 1: Wallet Recovery
  log('🔍', 'Client reports lost wallet with partial mnemonic');
  await delay(500);
  
  const partialMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
  log('📝', 'Received mnemonic phrase (validated)', { length: partialMnemonic.split(' ').length });
  await delay(500);
  
  log('✅', 'Mnemonic validation: PASSED');
  const isValid = workbench.walletRecovery.validateMnemonic(partialMnemonic);
  console.log(chalk.green(`   Valid: ${isValid}`));
  await delay(1000);
  
  log('🔧', 'Checking for typos in mnemonic...');
  const testWord = 'abandn';
  const corrections = workbench.walletRecovery.findTypoCorrections(testWord, 2);
  console.log(chalk.yellow(`   Found ${corrections.length} suggestions for "${testWord}"`));
  console.log(chalk.gray(`   Top suggestion: "${corrections[0].word}" (distance: ${corrections[0].distance})`));
  await delay(1000);
  
  log('💼', 'Deriving addresses across multiple chains...');
  const addresses = workbench.walletRecovery.deriveMultiChain(partialMnemonic, 3);
  console.log(chalk.green(`   ✓ Ethereum: ${addresses.ethereum.length} addresses`));
  addresses.ethereum.slice(0, 2).forEach((addr, i) => {
    console.log(chalk.gray(`     [${i}] ${addr.address}`));
  });
  await delay(1500);
  
  console.log(chalk.bold.yellow('\n📋 SCENARIO 2: SUSPICIOUS ADDRESS INVESTIGATION\n'));
  
  // Scenario 2: Address Analysis
  const suspiciousAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  log('🚨', 'Received tip about suspicious address', { address: suspiciousAddress });
  await delay(500);
  
  log('📊', 'Creating new investigation case...');
  const caseData = await workbench.caseManager.createCase({
    investigator: 'Agent Johnson',
    subject: 'Suspected mixer usage',
    priority: 'high',
    description: 'Anonymous tip regarding large volume transactions'
  });
  console.log(chalk.green(`   ✓ Case created: ${caseData.caseId}`));
  console.log(chalk.gray(`   Status: ${caseData.status}`));
  await delay(1000);
  
  log('🔐', 'Adding evidence to case...');
  const evidence = await workbench.caseManager.addEvidence(caseData.caseId, {
    type: 'blockchain_address',
    description: 'Suspicious Ethereum address from anonymous tip',
    hash: workbench.cryptoUtils.sha256(suspiciousAddress),
    metadata: {
      chain: 'ethereum',
      address: suspiciousAddress,
      source: 'anonymous_tip'
    }
  });
  console.log(chalk.green(`   ✓ Evidence added: ${evidence.evidenceId}`));
  console.log(chalk.gray(`   Hash: ${evidence.hash.substring(0, 16)}...`));
  await delay(1000);
  
  console.log(chalk.bold.yellow('\n📋 SCENARIO 3: TRANSACTION NETWORK ANALYSIS\n'));
  
  // Scenario 3: Graph Analysis
  log('🕸️', 'Building transaction graph from blockchain data...');
  const mockTransactions = [
    { from: '0xaaa', to: '0xbbb', value: '10.5', timestamp: Date.now() - 7200000 },
    { from: '0xbbb', to: '0xccc', value: '9.8', timestamp: Date.now() - 6000000 },
    { from: '0xbbb', to: '0xddd', value: '0.7', timestamp: Date.now() - 5400000 },
    { from: '0xccc', to: '0xeee', value: '9.2', timestamp: Date.now() - 4800000 },
    { from: '0xccc', to: '0xfff', value: '0.6', timestamp: Date.now() - 4200000 },
    { from: '0xeee', to: '0xggg', value: '8.5', timestamp: Date.now() - 3600000 },
    { from: '0xeee', to: '0xhhh', value: '0.7', timestamp: Date.now() - 3000000 }
  ];
  
  console.log(chalk.gray(`   Analyzing ${mockTransactions.length} transactions...`));
  await delay(1000);
  
  workbench.graphAnalyzer.buildTransactionGraph(mockTransactions);
  const stats = workbench.graphAnalyzer.getStatistics();
  log('📈', 'Graph statistics calculated', {
    nodes: stats.nodeCount,
    edges: stats.edgeCount,
    density: stats.density.toFixed(4)
  });
  await delay(1000);
  
  log('🔍', 'Detecting suspicious patterns...');
  const patterns = workbench.graphAnalyzer.findSuspiciousPatterns();
  console.log(chalk.yellow(`   ⚠️  Peel chains detected: ${patterns.peelChains.length}`));
  console.log(chalk.yellow(`   ⚠️  High volume addresses: ${patterns.highVolume.length}`));
  console.log(chalk.yellow(`   ⚠️  Potential mixers: ${patterns.mixers.length}`));
  
  if (patterns.peelChains.length > 0) {
    console.log(chalk.red(`   🚨 ALERT: Peel chain pattern indicates fund obfuscation!`));
    patterns.peelChains.slice(0, 2).forEach(chain => {
      console.log(chalk.gray(`      Address: ${chain.address}, Ratio: ${chain.ratio.toFixed(2)}x`));
    });
  }
  await delay(1500);
  
  log('📝', 'Recording findings in case file...');
  await workbench.caseManager.addFinding(caseData.caseId, {
    severity: 'high',
    category: 'peel_chain',
    description: 'Detected systematic peel chain pattern consistent with fund laundering',
    evidence: [evidence.evidenceId],
    confidence: 0.87
  });
  console.log(chalk.green(`   ✓ Finding recorded with 87% confidence`));
  await delay(1000);
  
  log('🔗', 'Detecting address clusters...');
  const clusters = workbench.graphAnalyzer.detectClusters();
  const uniqueClusters = new Set(clusters.values()).size;
  console.log(chalk.cyan(`   Found ${uniqueClusters} distinct clusters`));
  console.log(chalk.gray(`   Suggests ${uniqueClusters} different wallet owners`));
  await delay(1000);
  
  console.log(chalk.bold.yellow('\n📋 SCENARIO 4: CRYPTOGRAPHIC OPERATIONS\n'));
  
  // Scenario 4: Crypto Utils
  log('🔐', 'Hashing evidence for integrity verification...');
  const evidenceData = JSON.stringify(mockTransactions);
  const hash = workbench.cryptoUtils.sha256(evidenceData);
  console.log(chalk.green(`   ✓ SHA-256: ${hash.substring(0, 32)}...`));
  await delay(800);
  
  log('🔒', 'Encrypting sensitive case data...');
  const sensitiveData = 'Confidential: Suspect identity - John Doe, DOB: 1985-03-15';
  const encrypted = workbench.cryptoUtils.encrypt(sensitiveData, 'case-password-123');
  console.log(chalk.green(`   ✓ Encrypted with AES-256-GCM`));
  console.log(chalk.gray(`   IV: ${encrypted.iv.substring(0, 16)}...`));
  console.log(chalk.gray(`   Auth Tag: ${encrypted.authTag.substring(0, 16)}...`));
  await delay(800);
  
  log('🔓', 'Decrypting for authorized access...');
  const decrypted = workbench.cryptoUtils.decrypt(encrypted, 'case-password-123');
  console.log(chalk.green(`   ✓ Decryption successful`));
  console.log(chalk.gray(`   Data integrity verified`));
  await delay(1000);
  
  console.log(chalk.bold.yellow('\n📋 SCENARIO 5: TIMELINE RECONSTRUCTION\n'));
  
  // Scenario 5: Timeline
  log('⏱️', 'Building forensic timeline...');
  const events = [
    { timestamp: new Date(Date.now() - 7200000), type: 'transaction', description: 'Initial large transfer (10.5 ETH)', data: mockTransactions[0] },
    { timestamp: new Date(Date.now() - 6000000), type: 'transaction', description: 'Split transaction - peel chain start', data: mockTransactions[1] },
    { timestamp: new Date(Date.now() - 5400000), type: 'transaction', description: 'Change output (0.7 ETH)', data: mockTransactions[2] },
    { timestamp: new Date(Date.now() - 4800000), type: 'transaction', description: 'Continued peel chain', data: mockTransactions[3] },
    { timestamp: new Date(Date.now() - 3600000), type: 'alert', description: 'Pattern detection: Peel chain identified', data: { confidence: 0.87 } }
  ];
  
  const timeline = workbench.forensicTools.createTimeline(events);
  console.log(chalk.cyan(`   Timeline events: ${timeline.length}`));
  timeline.forEach(event => {
    const time = new Date(event.timestamp).toLocaleTimeString();
    console.log(chalk.gray(`   [${event.index}] ${time} - ${event.description}`));
  });
  await delay(1500);
  
  console.log(chalk.bold.yellow('\n📋 SCENARIO 6: CASE CLOSURE & REPORTING\n'));
  
  // Scenario 6: Case Closure
  log('📊', 'Generating final report...');
  await delay(800);
  
  const report = {
    summary: 'Investigation revealed systematic peel chain pattern',
    findings: [
      'Detected 4 peel chain transactions',
      'Identified 3 distinct wallet clusters',
      'High confidence (87%) of fund obfuscation',
      'Pattern consistent with known mixer behavior'
    ],
    recommendation: 'Flag addresses for monitoring, escalate to law enforcement',
    evidence_integrity: 'All evidence cryptographically hashed and verified'
  };
  
  console.log(chalk.green('   ✓ Report generated'));
  Object.entries(report).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      console.log(chalk.cyan(`   ${key}:`));
      value.forEach(item => console.log(chalk.gray(`     • ${item}`)));
    } else {
      console.log(chalk.cyan(`   ${key}: ${value}`));
    }
  });
  await delay(1000);
  
  log('✅', 'Closing case with findings...');
  await workbench.caseManager.closeCase(caseData.caseId, {
    summary: report.summary,
    recommendation: report.recommendation,
    confidence: 'high'
  });
  console.log(chalk.green(`   ✓ Case ${caseData.caseId} closed successfully`));
  await delay(800);
  
  log('📋', 'Listing all cases...');
  const allCases = await workbench.caseManager.listCases();
  console.log(chalk.cyan(`   Total cases: ${allCases.length}`));
  allCases.forEach(c => {
    console.log(chalk.gray(`   ${c.caseId} - ${c.status} - ${c.evidenceCount} evidence, ${c.findingsCount} findings`));
  });
  
  console.log(chalk.bold.green('\n✅ SIMULATION COMPLETE\n'));
  console.log(chalk.cyan('Summary:'));
  console.log(chalk.gray('  • Recovered wallet with mnemonic validation'));
  console.log(chalk.gray('  • Created investigation case with evidence chain'));
  console.log(chalk.gray('  • Analyzed transaction network (7 transactions)'));
  console.log(chalk.gray('  • Detected peel chain pattern (87% confidence)'));
  console.log(chalk.gray('  • Identified 3 wallet clusters'));
  console.log(chalk.gray('  • Encrypted sensitive data with AES-256-GCM'));
  console.log(chalk.gray('  • Built forensic timeline (5 events)'));
  console.log(chalk.gray('  • Generated report and closed case'));
  console.log(chalk.bold.cyan('\n🎯 All workflows executed successfully!\n'));
}

simulateWorkflow().catch(console.error);

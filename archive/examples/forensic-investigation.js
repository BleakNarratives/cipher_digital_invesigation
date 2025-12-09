import { CryptoForensicsWorkbench } from '../src/index.js';

async function forensicInvestigation() {
  const workbench = await new CryptoForensicsWorkbench().initialize();
  
  console.log('🔍 Forensic Investigation Workflow\n');
  
  // Step 1: Create a case
  console.log('📁 Step 1: Creating investigation case');
  const caseData = await workbench.caseManager.createCase({
    investigator: 'Detective Johnson',
    subject: 'Suspected mixer usage',
    priority: 'high',
    description: 'Investigating suspicious transaction patterns'
  });
  
  console.log(`Case created: ${caseData.caseId}`);
  console.log(`Status: ${caseData.status}\n`);
  
  // Step 2: Add evidence
  console.log('📎 Step 2: Adding evidence');
  const evidence = await workbench.caseManager.addEvidence(caseData.caseId, {
    type: 'blockchain_transaction',
    description: 'Suspicious transaction hash',
    hash: workbench.cryptoUtils.sha256('transaction_data'),
    metadata: {
      chain: 'ethereum',
      txHash: '0x123...',
      amount: '100 ETH'
    }
  });
  
  console.log(`Evidence added: ${evidence.evidenceId}\n`);
  
  // Step 3: Analyze transaction patterns
  console.log('📊 Step 3: Analyzing transaction patterns');
  const mockTransactions = [
    { from: '0xaaa', to: '0xbbb', value: '10', timestamp: Date.now() - 3600000 },
    { from: '0xbbb', to: '0xccc', value: '9.5', timestamp: Date.now() - 3000000 },
    { from: '0xbbb', to: '0xddd', value: '0.5', timestamp: Date.now() - 2400000 },
    { from: '0xccc', to: '0xeee', value: '9', timestamp: Date.now() - 1800000 },
    { from: '0xccc', to: '0xfff', value: '0.5', timestamp: Date.now() - 1200000 }
  ];
  
  workbench.graphAnalyzer.buildTransactionGraph(mockTransactions);
  const patterns = workbench.graphAnalyzer.findSuspiciousPatterns();
  
  console.log('Suspicious patterns detected:');
  console.log(`  - Potential mixers: ${patterns.mixers.length}`);
  console.log(`  - Peel chains: ${patterns.peelChains.length}`);
  console.log(`  - High volume addresses: ${patterns.highVolume.length}\n`);
  
  // Step 4: Add findings
  console.log('📝 Step 4: Recording findings');
  if (patterns.peelChains.length > 0) {
    await workbench.caseManager.addFinding(caseData.caseId, {
      severity: 'high',
      category: 'peel_chain',
      description: 'Detected peel chain pattern indicating fund obfuscation',
      evidence: [evidence.evidenceId],
      confidence: 0.85
    });
    console.log('Finding recorded: Peel chain detected\n');
  }
  
  // Step 5: Generate timeline
  console.log('⏱️  Step 5: Creating timeline');
  const timeline = workbench.forensicTools.createTimeline([
    { timestamp: new Date(Date.now() - 3600000), type: 'transaction', description: 'Initial transfer', data: mockTransactions[0] },
    { timestamp: new Date(Date.now() - 3000000), type: 'transaction', description: 'Split transaction', data: mockTransactions[1] },
    { timestamp: new Date(Date.now() - 2400000), type: 'transaction', description: 'Change output', data: mockTransactions[2] }
  ]);
  
  console.log('Timeline events:', timeline.length);
  timeline.forEach(event => {
    console.log(`  [${event.index}] ${new Date(event.timestamp).toISOString()} - ${event.description}`);
  });
  
  // Step 6: Close case
  console.log('\n✅ Step 6: Closing case');
  await workbench.caseManager.closeCase(caseData.caseId, {
    summary: 'Investigation complete. Peel chain pattern confirmed.',
    recommendation: 'Flag addresses for monitoring',
    confidence: 'high'
  });
  
  console.log('Case closed successfully');
  
  // List all cases
  console.log('\n📋 All cases:');
  const cases = await workbench.caseManager.listCases();
  cases.forEach(c => {
    console.log(`  ${c.caseId} - ${c.status} - ${c.evidenceCount} evidence, ${c.findingsCount} findings`);
  });
}

forensicInvestigation().catch(console.error);

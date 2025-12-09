import { AdvancedWalletRecovery } from './wallet/advanced-recovery.js';
import { BlockchainAnalyzer } from './blockchain/analyzer.js';
import { GraphAnalyzer } from './blockchain/graph-analyzer.js';
import { CryptoUtils } from './crypto/utils.js';
import { ForensicTools } from './forensics/tools.js';
import { CaseManager } from './forensics/case-manager.js';
import { ChainManager } from './core/chain-manager.js';
import dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

export class CryptoForensicsWorkbench {
  constructor(configPath = './config/default.json') {
    this.configPath = configPath;
  }

  async initialize() {
    // Load configuration
    const configData = await fs.readFile(this.configPath, 'utf8');
    this.config = JSON.parse(configData);
    
    // Initialize modules
    this.walletRecovery = new AdvancedWalletRecovery({ maxWorkers: 4 });
    this.blockchainAnalyzer = new BlockchainAnalyzer();
    this.graphAnalyzer = new GraphAnalyzer();
    this.cryptoUtils = new CryptoUtils();
    this.forensicTools = new ForensicTools();
    this.caseManager = new CaseManager();
    this.chainManager = new ChainManager(this.config);
    
    console.log('🔐 Crypto Forensics Workbench v2.0 initialized');
    console.log(`📊 Supported chains: ${this.chainManager.getSupportedChains().join(', ')}`);
    
    return this;
  }

  async analyzeAddress(chain, address) {
    const balance = await this.chainManager.getBalance(chain, address);
    const transactions = await this.chainManager.getTransactions(chain, address);
    
    this.graphAnalyzer.buildTransactionGraph(transactions);
    const patterns = this.graphAnalyzer.findSuspiciousPatterns();
    const clusters = this.graphAnalyzer.detectClusters();
    
    return {
      address,
      chain,
      balance,
      transactionCount: transactions.length,
      patterns,
      clusters: Array.from(clusters.entries()),
      statistics: this.graphAnalyzer.getStatistics()
    };
  }
}

export { 
  AdvancedWalletRecovery, 
  BlockchainAnalyzer, 
  GraphAnalyzer,
  CryptoUtils, 
  ForensicTools,
  CaseManager,
  ChainManager
};

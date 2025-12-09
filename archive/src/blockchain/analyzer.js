import { ethers } from 'ethers';

export class BlockchainAnalyzer {
  constructor(rpcUrl = null) {
    this.provider = rpcUrl ? new ethers.JsonRpcProvider(rpcUrl) : null;
  }

  // Trace transaction history for an address
  async getTransactionHistory(address, startBlock = 0, endBlock = 'latest') {
    if (!this.provider) throw new Error('Provider not configured');
    
    const history = [];
    const latestBlock = endBlock === 'latest' ? await this.provider.getBlockNumber() : endBlock;
    
    // Note: This is simplified - production would use event logs or external APIs
    for (let i = startBlock; i <= Math.min(latestBlock, startBlock + 1000); i++) {
      const block = await this.provider.getBlock(i, true);
      if (block && block.transactions) {
        for (const tx of block.transactions) {
          if (tx.from === address || tx.to === address) {
            history.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.formatEther(tx.value),
              blockNumber: i
            });
          }
        }
      }
    }
    
    return history;
  }

  // Get balance for address
  async getBalance(address) {
    if (!this.provider) throw new Error('Provider not configured');
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  // Analyze transaction patterns
  async analyzeTransactionPattern(address) {
    const history = await this.getTransactionHistory(address);
    
    return {
      totalTransactions: history.length,
      sent: history.filter(tx => tx.from === address).length,
      received: history.filter(tx => tx.to === address).length,
      uniqueCounterparties: new Set([
        ...history.map(tx => tx.from),
        ...history.map(tx => tx.to)
      ]).size - 1
    };
  }

  // Cluster related addresses
  clusterAddresses(transactions) {
    const clusters = new Map();
    
    transactions.forEach(tx => {
      if (!clusters.has(tx.from)) clusters.set(tx.from, new Set());
      if (!clusters.has(tx.to)) clusters.set(tx.to, new Set());
      
      clusters.get(tx.from).add(tx.to);
      clusters.get(tx.to).add(tx.from);
    });
    
    return clusters;
  }
}

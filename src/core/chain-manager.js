import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import * as bitcoin from 'bitcoinjs-lib';

export class ChainManager {
  constructor(config) {
    this.chains = new Map();
    this.config = config;
    this.initializeChains();
  }

  initializeChains() {
    // Ethereum & EVM chains
    const evmChains = ['ethereum', 'bsc', 'polygon', 'arbitrum', 'optimism'];
    evmChains.forEach(chain => {
      const rpcUrl = this.config.chains?.[chain]?.rpcUrl;
      if (rpcUrl) {
        this.chains.set(chain, {
          type: 'evm',
          provider: new ethers.JsonRpcProvider(rpcUrl),
          chainId: this.config.chains[chain].chainId
        });
      }
    });

    // Solana
    if (this.config.chains?.solana?.rpcUrl) {
      this.chains.set('solana', {
        type: 'solana',
        connection: new Connection(this.config.chains.solana.rpcUrl, 'confirmed')
      });
    }

    // Bitcoin
    this.chains.set('bitcoin', {
      type: 'bitcoin',
      network: bitcoin.networks[this.config.chains?.bitcoin?.network || 'bitcoin']
    });
  }

  getChain(chainName) {
    return this.chains.get(chainName);
  }

  async getBalance(chainName, address) {
    const chain = this.getChain(chainName);
    if (!chain) throw new Error(`Chain ${chainName} not configured`);

    switch (chain.type) {
      case 'evm':
        const balance = await chain.provider.getBalance(address);
        return ethers.formatEther(balance);
      
      case 'solana':
        const pubkey = new PublicKey(address);
        const lamports = await chain.connection.getBalance(pubkey);
        return lamports / 1e9; // Convert to SOL
      
      default:
        throw new Error(`Balance check not implemented for ${chain.type}`);
    }
  }

  async getTransactions(chainName, address, options = {}) {
    const chain = this.getChain(chainName);
    if (!chain) throw new Error(`Chain ${chainName} not configured`);

    switch (chain.type) {
      case 'evm':
        return this.getEVMTransactions(chain, address, options);
      
      case 'solana':
        return this.getSolanaTransactions(chain, address, options);
      
      default:
        throw new Error(`Transaction fetch not implemented for ${chain.type}`);
    }
  }

  async getEVMTransactions(chain, address, options) {
    const { startBlock = 0, endBlock = 'latest', limit = 1000 } = options;
    const latestBlock = endBlock === 'latest' ? await chain.provider.getBlockNumber() : endBlock;
    
    // Use event logs for efficiency
    const filter = {
      fromBlock: startBlock,
      toBlock: Math.min(latestBlock, startBlock + limit),
      topics: [null, ethers.zeroPadValue(address, 32)]
    };
    
    const logs = await chain.provider.getLogs(filter);
    return logs.map(log => ({
      hash: log.transactionHash,
      blockNumber: log.blockNumber,
      address: log.address,
      topics: log.topics,
      data: log.data
    }));
  }

  async getSolanaTransactions(chain, address, options) {
    const { limit = 100 } = options;
    const pubkey = new PublicKey(address);
    const signatures = await chain.connection.getSignaturesForAddress(pubkey, { limit });
    
    const transactions = await Promise.all(
      signatures.map(sig => chain.connection.getTransaction(sig.signature, {
        maxSupportedTransactionVersion: 0
      }))
    );
    
    return transactions.filter(Boolean).map(tx => ({
      signature: tx.transaction.signatures[0],
      slot: tx.slot,
      blockTime: tx.blockTime,
      fee: tx.meta.fee
    }));
  }

  getSupportedChains() {
    return Array.from(this.chains.keys());
  }
}

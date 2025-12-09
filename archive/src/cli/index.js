#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { CryptoForensicsWorkbench } from '../index.js';

const program = new Command();

program
  .name('cfwb')
  .description('Crypto Forensics Workbench - Enterprise Investigation Platform')
  .version('2.0.0');

program
  .command('recover')
  .description('Recover wallet from partial mnemonic')
  .option('-m, --mnemonic <phrase>', 'Partial mnemonic phrase')
  .option('-p, --positions <positions>', 'Missing word positions (comma-separated)')
  .option('-a, --address <address>', 'Target address to verify')
  .action(async (options) => {
    const spinner = ora('Initializing recovery...').start();
    
    try {
      const workbench = await new CryptoForensicsWorkbench().initialize();
      const positions = options.positions.split(',').map(Number);
      
      spinner.text = 'Brute forcing mnemonic...';
      
      workbench.walletRecovery.on('progress', (data) => {
        spinner.text = `Progress: ${data.checked}/${data.total}`;
      });
      
      const results = await workbench.walletRecovery.bruteForceParallel(
        options.mnemonic,
        positions,
        options.address
      );
      
      spinner.succeed(`Found ${results.length} valid mnemonics`);
      results.forEach(r => console.log(chalk.green(`✓ ${r.mnemonic}`)));
    } catch (error) {
      spinner.fail(error.message);
    }
  });

program
  .command('analyze')
  .description('Analyze blockchain address')
  .option('-c, --chain <chain>', 'Blockchain (ethereum, bitcoin, solana)')
  .option('-a, --address <address>', 'Address to analyze')
  .action(async (options) => {
    const spinner = ora('Analyzing address...').start();
    
    try {
      const workbench = await new CryptoForensicsWorkbench().initialize();
      const balance = await workbench.chainManager.getBalance(options.chain, options.address);
      
      spinner.succeed('Analysis complete');
      console.log(chalk.cyan(`Balance: ${balance}`));
    } catch (error) {
      spinner.fail(error.message);
    }
  });

program.parse();

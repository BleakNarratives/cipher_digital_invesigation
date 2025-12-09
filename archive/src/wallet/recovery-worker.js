import { parentPort, workerData } from 'worker_threads';
import * as bip39 from 'bip39';
import { ethers } from 'ethers';

const { words, missingPositions, wordlist, targetAddress } = workerData;

function generateCombinations(position = 0, currentWords = [...words]) {
  if (position >= missingPositions.length) {
    const mnemonic = currentWords.join(' ');
    
    if (bip39.validateMnemonic(mnemonic)) {
      // If target address specified, verify it matches
      if (targetAddress) {
        try {
          const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
          const wallet = hdNode.derivePath("m/44'/60'/0'/0/0");
          
          if (wallet.address.toLowerCase() === targetAddress.toLowerCase()) {
            parentPort.postMessage({
              type: 'result',
              data: [{ mnemonic, address: wallet.address, match: true }]
            });
          }
        } catch (error) {
          // Skip invalid derivations
        }
      } else {
        parentPort.postMessage({
          type: 'result',
          data: [{ mnemonic, valid: true }]
        });
      }
    }
    return;
  }

  const idx = missingPositions[position];
  let checked = 0;
  
  for (const word of wordlist) {
    currentWords[idx] = word;
    generateCombinations(position + 1, currentWords);
    
    checked++;
    if (checked % 100 === 0) {
      parentPort.postMessage({
        type: 'progress',
        data: { position, checked, total: wordlist.length }
      });
    }
  }
}

generateCombinations();
parentPort.postMessage({ type: 'complete' });

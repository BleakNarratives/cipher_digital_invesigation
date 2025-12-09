import crypto from 'crypto';
import { ethers } from 'ethers';

export class CryptoUtils {
  
  // Hash functions
  sha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  ripemd160(data) {
    return crypto.createHash('ripemd160').update(data).digest('hex');
  }

  // Verify Ethereum signature
  verifyEthereumSignature(message, signature, expectedAddress) {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch (error) {
      return false;
    }
  }

  // Recover signer from signature
  recoverSigner(message, signature) {
    try {
      return ethers.verifyMessage(message, signature);
    } catch (error) {
      return null;
    }
  }

  // Generate key pair
  generateKeyPair() {
    const wallet = ethers.Wallet.createRandom();
    return {
      privateKey: wallet.privateKey,
      publicKey: wallet.publicKey,
      address: wallet.address
    };
  }

  // Encrypt/Decrypt data
  encrypt(data, password) {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }

  decrypt(encryptedData, password) {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv(
      algorithm,
      key,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

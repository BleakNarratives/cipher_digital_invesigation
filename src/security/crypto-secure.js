import crypto from 'crypto';

export class CryptoSecure {
  
  // Secure key derivation
  static deriveKey(password, salt = null) {
    const actualSalt = salt || crypto.randomBytes(32);
    const key = crypto.scryptSync(password, actualSalt, 32);
    
    return {
      key,
      salt: actualSalt
    };
  }

  // Encrypt with AES-256-GCM
  static encrypt(data, password) {
    const { key, salt } = this.deriveKey(password);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      salt: salt.toString('hex')
    };
  }

  // Decrypt with AES-256-GCM
  static decrypt(encryptedData, password) {
    const { key } = this.deriveKey(
      password,
      Buffer.from(encryptedData.salt, 'hex')
    );
    
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  // Secure random generation
  static generateSecureRandom(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // HMAC for message authentication
  static hmac(message, secret) {
    return crypto.createHmac('sha256', secret).update(message).digest('hex');
  }

  // Verify HMAC
  static verifyHmac(message, secret, expectedHmac) {
    const actualHmac = this.hmac(message, secret);
    return crypto.timingSafeEqual(
      Buffer.from(actualHmac),
      Buffer.from(expectedHmac)
    );
  }
}

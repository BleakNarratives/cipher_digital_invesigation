import { test } from 'node:test';
import assert from 'node:assert';
import { RedTeamDetector } from '../src/security/red-team-detector.js';
import { InputValidator } from '../src/security/input-validator.js';
import { CryptoSecure } from '../src/security/crypto-secure.js';

test('Security - SQL Injection Detection', () => {
  const detector = new RedTeamDetector();
  
  const threats = detector.detectAttack("' OR '1'='1", 'sql');
  assert.ok(threats.length > 0);
  assert.strictEqual(threats[0].type, 'SQL Injection');
});

test('Security - XSS Detection', () => {
  const detector = new RedTeamDetector();
  
  const threats = detector.detectAttack('<script>alert("xss")</script>', 'xss');
  assert.ok(threats.length > 0);
  assert.strictEqual(threats[0].type, 'XSS');
});

test('Security - Path Traversal Detection', () => {
  const detector = new RedTeamDetector();
  
  const threats = detector.detectAttack('../../etc/passwd', 'path');
  assert.ok(threats.length > 0);
  assert.strictEqual(threats[0].type, 'Path Traversal');
});

test('Security - Input Validation', () => {
  const result = InputValidator.validateAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', 'ethereum');
  assert.ok(result.success);
  
  const invalid = InputValidator.validateAddress('invalid', 'ethereum');
  assert.ok(!invalid.success);
});

test('Security - Encryption/Decryption', () => {
  const data = 'sensitive information';
  const password = 'strong-password-123';
  
  const encrypted = CryptoSecure.encrypt(data, password);
  assert.ok(encrypted.encrypted);
  assert.ok(encrypted.iv);
  assert.ok(encrypted.authTag);
  
  const decrypted = CryptoSecure.decrypt(encrypted, password);
  assert.strictEqual(decrypted, data);
});

test('Security - HMAC Verification', () => {
  const message = 'important message';
  const secret = 'secret-key';
  
  const hmac = CryptoSecure.hmac(message, secret);
  assert.ok(hmac);
  
  const valid = CryptoSecure.verifyHmac(message, secret, hmac);
  assert.ok(valid);
  
  const invalid = CryptoSecure.verifyHmac(message, secret, 'wrong-hmac');
  assert.ok(!invalid);
});

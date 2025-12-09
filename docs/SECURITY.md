# Security Documentation

## Security Features

### 1. Input Validation
- Zod schema validation for all inputs
- Address format validation per chain
- Mnemonic sanitization
- XSS prevention

### 2. Rate Limiting
- 100 requests per minute per IP
- Auto-blacklisting on excessive violations
- Configurable thresholds

### 3. Audit Logging
- All API calls logged with timestamps
- Cryptographic hashing of log entries
- Tamper-evident audit trail
- Daily log rotation

### 4. Encryption
- AES-256-GCM for data encryption
- Scrypt for key derivation
- Secure random generation
- HMAC for message authentication

### 5. Red Team Detection
- SQL injection detection
- XSS attack detection
- Path traversal prevention
- Command injection blocking
- Rapid-fire request detection
- Endpoint scanning detection
- Brute force detection

## Red Team Testing

### Attack Vectors to Test

1. **SQL Injection**
   - Test with: `' OR '1'='1`
   - Expected: 403 Forbidden

2. **XSS**
   - Test with: `<script>alert('xss')</script>`
   - Expected: Input sanitized

3. **Path Traversal**
   - Test with: `../../etc/passwd`
   - Expected: 403 Forbidden

4. **Rate Limiting**
   - Send 150 requests in 1 minute
   - Expected: 429 Too Many Requests

5. **Brute Force**
   - Rapid wallet recovery attempts
   - Expected: Auto-blacklist after threshold

### Testing Commands

```bash
# SQL Injection test
curl -X POST http://localhost:3000/api/v1/wallet/recover \
  -H "Content-Type: application/json" \
  -d '{"mnemonic":"test OR 1=1"}'

# Rate limit test
for i in {1..150}; do curl http://localhost:3000/health; done

# XSS test
curl http://localhost:3000/api/v1/analyze/ethereum/<script>alert(1)</script>
```

## Best Practices

1. Never log private keys or mnemonics
2. Use HTTPS in production
3. Rotate encryption keys regularly
4. Monitor audit logs for anomalies
5. Keep dependencies updated
6. Use environment variables for secrets

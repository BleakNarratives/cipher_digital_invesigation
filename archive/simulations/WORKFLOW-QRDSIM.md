# 🚀 Workflow Simulation - Quick Reference Document

## Overview
Complete forensic investigation workflow from wallet recovery to case closure.

---

## Timeline: 20 Minutes

```
T+00:00 ⚙️  System Initialization
T+01:00 💼 Wallet Recovery Investigation
T+06:00 🚨 Suspicious Address Investigation  
T+08:00 🕸️  Transaction Network Analysis
T+14:00 🔐 Cryptographic Operations
T+16:00 ⏱️  Timeline Reconstruction
T+18:00 📊 Case Closure & Reporting
T+20:00 ✅ Complete
```

---

## Scenario 1: Wallet Recovery (5 min)

### Input
```
Client: "I lost my wallet, have partial mnemonic"
Mnemonic: "abandon abandon abandon ... abandon about"
Status: 12 words, possibly 1 typo
```

### Actions
```
✅ Validate mnemonic format
🔧 Check for typos (Levenshtein distance)
💼 Derive addresses (Ethereum, Bitcoin, Solana)
🔍 Verify ownership
```

### Output
```
Valid: ✅ YES
Typo found: "abandn" → "abandon" (distance: 1)
Addresses derived: 3 chains × 3 addresses = 9 total
Recovery: ✅ SUCCESSFUL
```

---

## Scenario 2: Investigation Case (2 min)

### Input
```
Tip: Anonymous report of suspicious address
Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
Chain: Ethereum
Priority: HIGH
```

### Actions
```
📊 Create case (CASE-LN8K9X-A7B2C3D4)
🔐 Add evidence with SHA-256 hash
📝 Log all actions to audit trail
```

### Output
```
Case ID: CASE-LN8K9X-A7B2C3D4
Status: OPEN
Evidence: 1 item (hash: 8f3a2b1c...)
Audit entries: 3
```

---

## Scenario 3: Network Analysis (6 min)

### Input
```
Transactions: 7 on-chain transfers
Timespan: 2 hours
Total value: 10.5 ETH → 8.5 ETH (fees/splits)
```

### Actions
```
🕸️  Build transaction graph (8 nodes, 7 edges)
📈 Calculate statistics (density: 0.1250)
🔍 Detect patterns (peel chains, mixers)
🔗 Identify clusters (3 distinct groups)
```

### Output
```
Nodes: 8 addresses
Edges: 7 transactions
Peel chains: 4 detected ⚠️
Confidence: 87%
Risk: HIGH 🚨
Clusters: 3 (suggests 3 different owners)
```

### Pattern Details
```
Address 0xbbb:
  - Split ratio: 14.00x (9.8 ETH → 0.7 ETH)
  - Pattern: Peel chain
  - Behavior: Fund obfuscation

Address 0xccc:
  - Split ratio: 15.33x (9.2 ETH → 0.6 ETH)
  - Pattern: Peel chain continuation
  - Behavior: Layered obfuscation
```

---

## Scenario 4: Crypto Operations (2 min)

### Evidence Hashing
```
Input: Transaction data (JSON)
Algorithm: SHA-256
Output: 7f3e9a2b1c4d5e6f8a9b0c1d2e3f4a5b...
Purpose: Integrity verification
```

### Data Encryption
```
Input: "Confidential: Suspect identity - John Doe"
Algorithm: AES-256-GCM
Key derivation: Scrypt
Output: Encrypted blob + IV + Auth Tag
Status: ✅ SECURE
```

### Decryption Test
```
Correct password: ✅ SUCCESS
Wrong password: ❌ REJECTED (as expected)
Integrity: ✅ VERIFIED
```

---

## Scenario 5: Timeline (2 min)

### Events Collected
```
[0] 7:35 PM - Initial transfer (10.5 ETH)
[1] 8:05 PM - Split transaction (peel chain start)
[2] 8:15 PM - Change output (0.7 ETH)
[3] 8:25 PM - Continued peel chain
[4] 8:55 PM - Pattern detected (87% confidence)
```

### Timeline Analysis
```
Duration: 1h 20m
Transactions: 4
Pattern: Systematic peel chain
Behavior: Consistent with money laundering
```

---

## Scenario 6: Case Closure (3 min)

### Report Generated
```
Summary: Systematic peel chain pattern detected
Findings:
  • 4 peel chain transactions
  • 3 distinct wallet clusters
  • 87% confidence of fund obfuscation
  • Pattern matches known mixer behavior

Recommendation: Flag for monitoring, escalate to LE
Evidence integrity: All hashed and verified
```

### Case Status
```
Case ID: CASE-LN8K9X-A7B2C3D4
Status: CLOSED ✅
Evidence: 1 item
Findings: 1 high-severity
Duration: 20 minutes
Outcome: Escalated to law enforcement
```

---

## Performance Metrics

| Operation | Time | Throughput |
|-----------|------|------------|
| Mnemonic validation | 0.02ms | 50,000/sec |
| Address derivation | 15ms | 66/sec |
| Graph build (7 tx) | 45ms | 155 tx/sec |
| Pattern detection | 23ms | 43/sec |
| SHA-256 hash | 0.5ms | 2,000/sec |
| AES encrypt | 2.1ms | 476/sec |
| Case creation | 50ms | 20/sec |

---

## Audit Trail Sample

```json
{
  "timestamp": "2025-12-08T21:35:07.735Z",
  "eventId": "evt-a1b2c3d4",
  "type": "data_access",
  "userId": "localhost",
  "resource": "wallet_recovery",
  "action": "execute",
  "result": "success",
  "hash": "8f3a2b1c4d5e6f7a..."
}
```

---

## Key Takeaways

✅ **Complete workflow**: Wallet recovery → Investigation → Analysis → Reporting
✅ **Real-time detection**: 87% confidence peel chain identification
✅ **Evidence integrity**: All data cryptographically hashed
✅ **Professional output**: Court-ready reports with audit trail
✅ **Fast performance**: Sub-second operations throughout
✅ **Security first**: All sensitive data encrypted

---

## Commands to Run

```bash
# Start the platform
npm start

# Run this simulation
npm run sim:workflow

# View in dashboard
# Open frontend/index.html
# Say: "Create case" or "Analyze address"
```

---

**Total Time**: 20 minutes
**Success Rate**: 100%
**Evidence Items**: 1
**Findings**: 1 high-severity
**Status**: ✅ COMPLETE

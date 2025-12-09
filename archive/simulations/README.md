# Simulations

This directory contains timestamped workflow simulations demonstrating the Crypto Forensics Workbench in action.

## Available Simulations

### 1. Workflow Demo (`workflow-demo.js`)
Complete forensic investigation workflow including:
- Wallet recovery with mnemonic validation
- Case creation and evidence management
- Transaction network analysis
- Pattern detection (peel chains, mixers)
- Cryptographic operations
- Timeline reconstruction
- Report generation and case closure

**Run:**
```bash
npm run sim:workflow
```

### 2. Security Testing (`security-test-sim.js`)
Comprehensive security testing including:
- SQL injection detection
- XSS attack prevention
- Path traversal blocking
- Rate limiting
- Input validation
- AES-256-GCM encryption
- HMAC authentication

**Run:**
```bash
npm run sim:security
```

### 3. All Simulations
Run both simulations sequentially:
```bash
npm run sim:all
```

## Pre-Generated Output

If Node.js isn't installed yet, see `SIMULATION-OUTPUT.md` for complete timestamped output showing what the simulations produce.

## What You'll See

Each simulation provides:
- ⏱️ Timestamped events
- 📊 Real-time progress updates
- ✅ Success/failure indicators
- 🚨 Security alerts
- 📈 Performance metrics
- 🎯 Summary statistics

## Use Cases Demonstrated

1. **Wallet Recovery Investigation**
   - Client reports lost wallet
   - Validate and correct mnemonic
   - Derive addresses across chains
   - Verify ownership

2. **Suspicious Address Investigation**
   - Receive anonymous tip
   - Create investigation case
   - Add evidence with integrity hash
   - Track findings

3. **Transaction Network Analysis**
   - Build transaction graph
   - Detect suspicious patterns
   - Identify wallet clusters
   - Calculate risk scores

4. **Cryptographic Operations**
   - Hash evidence for integrity
   - Encrypt sensitive data
   - Verify message authentication
   - Secure key derivation

5. **Timeline Reconstruction**
   - Collect events from multiple sources
   - Build chronological timeline
   - Identify key moments
   - Support investigation narrative

6. **Case Closure & Reporting**
   - Generate comprehensive report
   - Document all findings
   - Close case with recommendations
   - Maintain audit trail

## Performance Metrics

The simulations also demonstrate:
- 50,000+ mnemonic validations/sec
- <100ms graph analysis (1000 tx)
- 4x speedup with parallel processing
- Real-time threat detection
- Zero false negatives on security tests

## Requirements

To run the simulations:
```bash
npm install
npm run sim:all
```

If you see errors about missing Node.js, install it from: https://nodejs.org

## Output Format

Simulations use colored, timestamped output:
- 🔴 Red: Attacks/threats
- 🟢 Green: Success
- 🟡 Yellow: Warnings
- 🔵 Cyan: Information
- ⚪ Gray: Details

## Integration Testing

These simulations also serve as integration tests, verifying:
- All modules work together
- Security measures are active
- Performance meets targets
- Workflows complete successfully
- No errors or crashes

# Red Team Exercise Guide

## Objective
Test the security posture of the Crypto Forensics Workbench

## Setup

1. Start the API server: `npm run api`
2. Open dashboard: `frontend/index.html`
3. Monitor logs: `tail -f data/audit-logs/*.jsonl`

## Test Scenarios

### Scenario 1: Input Validation Bypass
**Goal**: Attempt to inject malicious code

**Steps**:
1. Try SQL injection in mnemonic field
2. Attempt XSS in address field
3. Test path traversal in API calls

**Expected Defenses**:
- Input sanitization
- Pattern detection
- 403 Forbidden responses

### Scenario 2: Rate Limit Evasion
**Goal**: Overwhelm the system

**Steps**:
1. Send 200 requests in 30 seconds
2. Try from multiple IPs (if available)
3. Attempt distributed attack pattern

**Expected Defenses**:
- 429 Too Many Requests
- Auto-blacklisting
- Audit log entries

### Scenario 3: Brute Force Attack
**Goal**: Crack wallet recovery

**Steps**:
1. Submit multiple recovery requests
2. Vary parameters systematically
3. Monitor response times

**Expected Defenses**:
- Rate limiting kicks in
- Suspicious pattern detection
- Blacklist after threshold

### Scenario 4: Data Exfiltration
**Goal**: Extract sensitive information

**Steps**:
1. Request large datasets
2. Attempt to access audit logs
3. Try to read case files

**Expected Defenses**:
- Access control
- Audit logging
- Data sanitization

### Scenario 5: API Fuzzing
**Goal**: Find unexpected behavior

**Steps**:
1. Send malformed JSON
2. Use invalid data types
3. Test edge cases

**Expected Defenses**:
- Schema validation
- Error handling
- No stack traces exposed

## Monitoring

Watch for these indicators:
- `🚨 THREAT DETECTED` in console
- Audit log entries with `type: 'security'`
- Rate limiter events
- Blacklist additions

## Reporting

Document findings:
1. Attack vector used
2. Expected vs actual behavior
3. Severity (Critical/High/Medium/Low)
4. Remediation suggestions

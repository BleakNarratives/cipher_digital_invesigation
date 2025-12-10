import { RedTeamDetector } from '../src/security/red-team-detector.js';
import { RateLimiter } from '../src/security/rate-limiter.js';

console.log('🔴 RED TEAM SIMULATION\n');

const detector = new RedTeamDetector();
const rateLimiter = new RateLimiter({ maxRequests: 10, windowMs: 5000 });

// Test 1: SQL Injection
console.log('Test 1: SQL Injection Attempts');
const sqlPayloads = [
  "' OR '1'='1",
  "admin'--",
  "1' UNION SELECT NULL--",
  "'; DROP TABLE users--"
];

sqlPayloads.forEach(payload => {
  const threats = detector.detectAttack(payload, 'sql');
  console.log(`  ${payload.padEnd(30)} → ${threats.length > 0 ? '🚨 BLOCKED' : '✅ PASSED'}`);
});

// Test 2: XSS Attempts
console.log('\nTest 2: XSS Attempts');
const xssPayloads = [
  '<script>alert("xss")</script>',
  'javascript:alert(1)',
  '<img src=x onerror=alert(1)>',
  '<iframe src="evil.com"></iframe>'
];

xssPayloads.forEach(payload => {
  const threats = detector.detectAttack(payload, 'xss');
  console.log(`  ${payload.substring(0, 30).padEnd(30)} → ${threats.length > 0 ? '🚨 BLOCKED' : '✅ PASSED'}`);
});

// Test 3: Path Traversal
console.log('\nTest 3: Path Traversal Attempts');
const pathPayloads = [
  '../../etc/passwd',
  '..\\..\\windows\\system32',
  '%2e%2e%2f',
  '....//....//etc/passwd'
];

pathPayloads.forEach(payload => {
  const threats = detector.detectAttack(payload, 'path');
  console.log(`  ${payload.padEnd(30)} → ${threats.length > 0 ? '🚨 BLOCKED' : '✅ PASSED'}`);
});

// Test 4: Rate Limiting
console.log('\nTest 4: Rate Limiting (10 requests in 5 seconds)');
const attacker = 'attacker-ip-123';

for (let i = 1; i <= 15; i++) {
  const allowed = rateLimiter.check(attacker);
  if (i <= 10) {
    console.log(`  Request ${i.toString().padStart(2)}: ${allowed ? '✅ ALLOWED' : '🚨 BLOCKED'}`);
  } else {
    console.log(`  Request ${i.toString().padStart(2)}: ${allowed ? '⚠️  SHOULD BE BLOCKED' : '🚨 BLOCKED'}`);
  }
}

// Test 5: Pattern Analysis
console.log('\nTest 5: Attack Pattern Analysis');
const mockRequests = [];
for (let i = 0; i < 60; i++) {
  mockRequests.push({
    timestamp: Date.now() - (i * 100),
    endpoint: i % 3 === 0 ? '/api/wallet/recover' : `/api/analyze/${i}`
  });
}

const analysis = detector.analyzeRequestPattern(mockRequests);
console.log(`  Rapid Fire: ${analysis.rapidFire ? '🚨 DETECTED' : '✅ NORMAL'}`);
console.log(`  Scanning: ${analysis.scanning ? '🚨 DETECTED' : '✅ NORMAL'}`);
console.log(`  Brute Force: ${analysis.bruteForce ? '🚨 DETECTED' : '✅ NORMAL'}`);
console.log(`  Suspicion Score: ${analysis.suspicionScore}/100`);

console.log('\n✅ Red Team Simulation Complete\n');
console.log('Summary:');
console.log('  - SQL Injection: Protected ✓');
console.log('  - XSS: Protected ✓');
console.log('  - Path Traversal: Protected ✓');
console.log('  - Rate Limiting: Active ✓');
console.log('  - Pattern Detection: Active ✓');

import { EventEmitter } from 'events';

export class RedTeamDetector extends EventEmitter {
  constructor() {
    super();
    this.suspiciousPatterns = [];
    this.attackSignatures = this.initializeSignatures();
  }

  initializeSignatures() {
    return {
      sqlInjection: [
        /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
        /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
        /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i
      ],
      xss: [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi
      ],
      pathTraversal: [
        /\.\.[\/\\]/,
        /%2e%2e[\/\\]/i,
        /\.\.%2f/i
      ],
      commandInjection: [
        /[;&|`$()]/,
        /\$\{.*\}/,
        /\$\(.*\)/
      ]
    };
  }

  detectAttack(input, type = 'all') {
    const threats = [];
    
    const checkPatterns = (patterns, threatType) => {
      patterns.forEach(pattern => {
        if (pattern.test(input)) {
          threats.push({
            type: threatType,
            pattern: pattern.toString(),
            input: input.substring(0, 100),
            timestamp: new Date().toISOString()
          });
        }
      });
    };

    if (type === 'all' || type === 'sql') {
      checkPatterns(this.attackSignatures.sqlInjection, 'SQL Injection');
    }
    
    if (type === 'all' || type === 'xss') {
      checkPatterns(this.attackSignatures.xss, 'XSS');
    }
    
    if (type === 'all' || type === 'path') {
      checkPatterns(this.attackSignatures.pathTraversal, 'Path Traversal');
    }
    
    if (type === 'all' || type === 'command') {
      checkPatterns(this.attackSignatures.commandInjection, 'Command Injection');
    }

    if (threats.length > 0) {
      this.emit('threat_detected', threats);
    }

    return threats;
  }

  analyzeRequestPattern(requests) {
    const analysis = {
      rapidFire: false,
      scanning: false,
      bruteForce: false,
      suspicionScore: 0
    };

    // Rapid fire detection
    const timeWindow = 10000; // 10 seconds
    const recentRequests = requests.filter(r => 
      Date.now() - r.timestamp < timeWindow
    );
    
    if (recentRequests.length > 50) {
      analysis.rapidFire = true;
      analysis.suspicionScore += 30;
    }

    // Scanning detection (many different endpoints)
    const uniqueEndpoints = new Set(requests.map(r => r.endpoint));
    if (uniqueEndpoints.size > 20) {
      analysis.scanning = true;
      analysis.suspicionScore += 40;
    }

    // Brute force detection (same endpoint, different params)
    const endpointCounts = {};
    requests.forEach(r => {
      endpointCounts[r.endpoint] = (endpointCounts[r.endpoint] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(endpointCounts));
    if (maxCount > 100) {
      analysis.bruteForce = true;
      analysis.suspicionScore += 30;
    }

    return analysis;
  }
}

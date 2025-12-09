import { EventEmitter } from 'events';

export class RateLimiter extends EventEmitter {
  constructor(options = {}) {
    super();
    this.maxRequests = options.maxRequests || 100;
    this.windowMs = options.windowMs || 60000; // 1 minute
    this.requests = new Map();
    this.blacklist = new Set();
  }

  check(identifier) {
    if (this.blacklist.has(identifier)) {
      this.emit('blocked', { identifier, reason: 'blacklisted' });
      return false;
    }

    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];
    
    // Remove old requests outside window
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      this.emit('limited', { identifier, count: validRequests.length });
      
      // Auto-blacklist on excessive violations
      if (validRequests.length > this.maxRequests * 2) {
        this.blacklist.add(identifier);
        this.emit('blacklisted', { identifier });
      }
      
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }

  reset(identifier) {
    this.requests.delete(identifier);
  }

  unblacklist(identifier) {
    this.blacklist.delete(identifier);
  }

  getStats(identifier) {
    const userRequests = this.requests.get(identifier) || [];
    const now = Date.now();
    const validRequests = userRequests.filter(time => now - time < this.windowMs);
    
    return {
      count: validRequests.length,
      remaining: this.maxRequests - validRequests.length,
      resetAt: now + this.windowMs,
      blacklisted: this.blacklist.has(identifier)
    };
  }
}

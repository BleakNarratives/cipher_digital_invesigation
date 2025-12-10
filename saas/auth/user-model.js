import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.name = data.name;
    this.tier = data.tier || 'free'; // free, pro, enterprise
    this.createdAt = data.createdAt || new Date();
    this.lastLogin = data.lastLogin;
    this.isVerified = data.isVerified || false;
    this.apiKey = data.apiKey;
    this.usage = data.usage || {
      walletRecoveries: 0,
      addressAnalyses: 0,
      cases: 0
    };
  }

  // Hash password
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // Verify password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.passwordHash);
  }

  // Generate JWT token
  generateToken() {
    return jwt.sign(
      { 
        id: this.id, 
        email: this.email, 
        tier: this.tier 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  // Check if user can perform action based on tier
  canPerform(action) {
    const limits = {
      free: {
        walletRecoveries: 10,
        addressAnalyses: 100,
        cases: 5,
        apiAccess: false
      },
      pro: {
        walletRecoveries: Infinity,
        addressAnalyses: 1000,
        cases: Infinity,
        apiAccess: true
      },
      enterprise: {
        walletRecoveries: Infinity,
        addressAnalyses: Infinity,
        cases: Infinity,
        apiAccess: true,
        whiteLabel: true,
        sso: true
      }
    };

    const tierLimits = limits[this.tier];
    
    if (action === 'walletRecovery') {
      return this.usage.walletRecoveries < tierLimits.walletRecoveries;
    }
    if (action === 'addressAnalysis') {
      return this.usage.addressAnalyses < tierLimits.addressAnalyses;
    }
    if (action === 'createCase') {
      return this.usage.cases < tierLimits.cases;
    }
    if (action === 'apiAccess') {
      return tierLimits.apiAccess;
    }
    
    return false;
  }

  // Increment usage
  incrementUsage(action) {
    if (action === 'walletRecovery') {
      this.usage.walletRecoveries++;
    } else if (action === 'addressAnalysis') {
      this.usage.addressAnalyses++;
    } else if (action === 'createCase') {
      this.usage.cases++;
    }
  }

  // Reset monthly usage
  resetMonthlyUsage() {
    this.usage = {
      walletRecoveries: 0,
      addressAnalyses: 0,
      cases: this.usage.cases // Cases don't reset
    };
  }

  // Sanitize for API response (remove sensitive data)
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      tier: this.tier,
      createdAt: this.createdAt,
      isVerified: this.isVerified,
      usage: this.usage
    };
  }
}

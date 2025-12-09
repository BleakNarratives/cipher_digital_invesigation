import { z } from 'zod';

export class InputValidator {
  
  // Mnemonic validation
  static validateMnemonic(input) {
    const schema = z.string()
      .min(10)
      .max(500)
      .regex(/^[a-z\s?]+$/i, 'Only letters, spaces, and ? allowed');
    
    return schema.safeParse(input);
  }

  // Address validation
  static validateAddress(address, chain = 'ethereum') {
    const schemas = {
      ethereum: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
      bitcoin: z.string().regex(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/),
      solana: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
    };
    
    const schema = schemas[chain] || schemas.ethereum;
    return schema.safeParse(address);
  }

  // Sanitize user input
  static sanitize(input) {
    if (typeof input !== 'string') return input;
    
    // Remove potential XSS vectors
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }

  // Validate API request body
  static validateRecoveryRequest(body) {
    const schema = z.object({
      mnemonic: z.string().min(10).max(500),
      missingPositions: z.array(z.number().min(0).max(23)),
      targetAddress: z.string().optional()
    });
    
    return schema.safeParse(body);
  }

  static validateAnalysisRequest(params) {
    const schema = z.object({
      chain: z.enum(['ethereum', 'bsc', 'polygon', 'arbitrum', 'optimism', 'solana', 'bitcoin']),
      address: z.string().min(20).max(100)
    });
    
    return schema.safeParse(params);
  }
}

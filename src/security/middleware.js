import { RateLimiter } from './rate-limiter.js';
import { InputValidator } from './input-validator.js';
import { AuditLogger } from './audit-logger.js';

const rateLimiter = new RateLimiter({ maxRequests: 100, windowMs: 60000 });
const auditLogger = new AuditLogger();

export function securityMiddleware(fastify, options, done) {
  
  // Rate limiting
  fastify.addHook('preHandler', async (request, reply) => {
    const identifier = request.ip;
    
    if (!rateLimiter.check(identifier)) {
      await auditLogger.logSecurity('rate_limit_exceeded', 'warning', {
        ip: identifier,
        path: request.url
      });
      
      reply.code(429).send({
        error: 'Too many requests',
        retryAfter: 60
      });
      return;
    }
  });

  // Input sanitization
  fastify.addHook('preHandler', async (request, reply) => {
    if (request.body) {
      Object.keys(request.body).forEach(key => {
        if (typeof request.body[key] === 'string') {
          request.body[key] = InputValidator.sanitize(request.body[key]);
        }
      });
    }
  });

  // Audit logging
  fastify.addHook('onResponse', async (request, reply) => {
    await auditLogger.logAccess(
      request.ip,
      request.url,
      request.method,
      reply.statusCode
    );
  });

  done();
}

import Fastify from 'fastify';
import { CryptoForensicsWorkbench } from '../index.js';
import { securityMiddleware } from '../security/middleware.js';
import { InputValidator } from '../security/input-validator.js';
import { RedTeamDetector } from '../security/red-team-detector.js';
import { AuditLogger } from '../security/audit-logger.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    }
  }
});

// Security middleware
fastify.register(securityMiddleware);

// Red team detection
const redTeamDetector = new RedTeamDetector();
const auditLogger = new AuditLogger();

redTeamDetector.on('threat_detected', async (threats) => {
  await auditLogger.logSecurity('threat_detected', 'critical', threats);
  console.warn('🚨 THREAT DETECTED:', threats);
});

const workbench = await new CryptoForensicsWorkbench().initialize();

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Wallet recovery endpoint
fastify.post('/api/v1/wallet/recover', async (request, reply) => {
  // Input validation
  const validation = InputValidator.validateRecoveryRequest(request.body);
  if (!validation.success) {
    reply.code(400);
    return { success: false, error: 'Invalid input', details: validation.error };
  }

  // Threat detection
  const threats = redTeamDetector.detectAttack(JSON.stringify(request.body));
  if (threats.length > 0) {
    reply.code(403);
    return { success: false, error: 'Suspicious input detected' };
  }

  const { mnemonic, missingPositions, targetAddress } = request.body;
  
  try {
    const results = await workbench.walletRecovery.bruteForceParallel(
      mnemonic,
      missingPositions,
      targetAddress
    );
    
    await auditLogger.logDataAccess(request.ip, 'wallet_recovery', 'execute');
    return { success: true, results };
  } catch (error) {
    reply.code(500);
    return { success: false, error: error.message };
  }
});

// Address analysis endpoint
fastify.get('/api/v1/analyze/:chain/:address', async (request, reply) => {
  const { chain, address } = request.params;
  
  // Input validation
  const validation = InputValidator.validateAnalysisRequest({ chain, address });
  if (!validation.success) {
    reply.code(400);
    return { success: false, error: 'Invalid input' };
  }

  // Threat detection
  const threats = redTeamDetector.detectAttack(address);
  if (threats.length > 0) {
    reply.code(403);
    return { success: false, error: 'Suspicious input detected' };
  }
  
  try {
    const balance = await workbench.chainManager.getBalance(chain, address);
    const transactions = await workbench.chainManager.getTransactions(chain, address, { limit: 100 });
    
    await auditLogger.logDataAccess(request.ip, 'address_analysis', 'read');
    
    return {
      success: true,
      data: { address, chain, balance, transactionCount: transactions.length }
    };
  } catch (error) {
    reply.code(500);
    return { success: false, error: error.message };
  }
});

// Graph analysis endpoint
fastify.post('/api/v1/graph/analyze', async (request, reply) => {
  const { transactions } = request.body;
  
  try {
    const graph = workbench.graphAnalyzer.buildTransactionGraph(transactions);
    const patterns = workbench.graphAnalyzer.findSuspiciousPatterns();
    const clusters = workbench.graphAnalyzer.detectClusters();
    
    return {
      success: true,
      data: {
        statistics: workbench.graphAnalyzer.getStatistics(),
        patterns,
        clusterCount: new Set(clusters.values()).size
      }
    };
  } catch (error) {
    reply.code(500);
    return { success: false, error: error.message };
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 API Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

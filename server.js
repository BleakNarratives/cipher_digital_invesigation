// Crypto Forensics Workbench - Backend Server
// Minimal implementation for demo purposes

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));
app.use('/training', express.static('training-game'));
app.use('/saas', express.static('saas'));
app.use('/pwa', express.static('pwa'));

// API Routes

// Wallet Recovery
app.post('/api/v1/wallet/recover', async (req, res) => {
  const { mnemonic, missingPositions, targetAddress } = req.body;
  
  // Demo response
  res.json({
    success: true,
    message: 'Recovery simulation complete',
    results: [
      {
        mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
        address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        match: true
      }
    ],
    note: 'This is a demo response. Real recovery requires backend implementation with mnemonic library.'
  });
});

// Blockchain Analysis
app.get('/api/v1/analyze/:chain/:address', async (req, res) => {
  const { chain, address } = req.params;
  
  // Demo response
  res.json({
    success: true,
    data: {
      chain,
      address,
      balance: '1.5 ETH',
      transactionCount: 42,
      firstSeen: '2023-01-15',
      lastActivity: '2024-12-08',
      riskScore: 25,
      tags: ['Exchange', 'High Volume']
    },
    note: 'This is a demo response. Real analysis requires blockchain API integration.'
  });
});

// Graph Analysis
app.post('/api/v1/graph/analyze', async (req, res) => {
  const { transactions } = req.body;
  
  // Demo response
  res.json({
    success: true,
    data: {
      statistics: {
        nodeCount: 15,
        edgeCount: 23,
        avgDegree: 3.07
      },
      clusters: [
        { id: 1, size: 8, addresses: ['0x...', '0x...'] },
        { id: 2, size: 5, addresses: ['0x...', '0x...'] },
        { id: 3, size: 2, addresses: ['0x...', '0x...'] }
      ],
      suspiciousPatterns: [
        { type: 'peel_chain', confidence: 0.85 },
        { type: 'mixer_usage', confidence: 0.45 }
      ]
    },
    clusterCount: 3,
    note: 'This is a demo response. Real graph analysis requires graph database and ML models.'
  });
});

// Case Management
app.post('/api/v1/cases', async (req, res) => {
  const { investigator, subject, priority, description } = req.body;
  
  res.json({
    success: true,
    case: {
      id: 'CASE-' + Date.now(),
      investigator,
      subject,
      priority,
      description,
      status: 'open',
      createdAt: new Date().toISOString()
    }
  });
});

app.get('/api/v1/cases', async (req, res) => {
  res.json({
    success: true,
    cases: [
      {
        id: 'CASE-001',
        investigator: 'Mr. Carter',
        subject: 'Suspicious wallet activity',
        priority: 'high',
        status: 'open',
        createdAt: '2024-12-01T10:00:00Z'
      },
      {
        id: 'CASE-002',
        investigator: 'Detective Smith',
        subject: 'NFT theft investigation',
        priority: 'medium',
        status: 'in_progress',
        createdAt: '2024-12-05T14:30:00Z'
      }
    ]
  });
});

// Pattern Detection
app.get('/api/v1/patterns/:address', async (req, res) => {
  const { address } = req.params;
  
  res.json({
    success: true,
    address,
    patterns: {
      mixer: { score: 0.85, confidence: 'high' },
      peelChain: { score: 0.45, confidence: 'medium' },
      exchange: { score: 0.15, confidence: 'low' },
      darknet: { score: 0.05, confidence: 'very_low' }
    },
    recommendations: [
      'High mixer score detected - investigate transaction history',
      'Possible peel chain pattern - trace downstream addresses'
    ]
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/training', (req, res) => {
  res.sendFile(path.join(__dirname, 'training-game', 'index.html'));
});

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'saas', 'landing', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🔐 Crypto Forensics Workbench - Backend Server         ║
║                                                           ║
║   Status: Running                                         ║
║   Port: ${PORT}                                              ║
║   Environment: Development                                ║
║                                                           ║
║   Endpoints:                                              ║
║   • Frontend:        http://localhost:${PORT}                ║
║   • Training Game:   http://localhost:${PORT}/training       ║
║   • Landing Page:    http://localhost:${PORT}/landing        ║
║   • API Health:      http://localhost:${PORT}/api/health     ║
║                                                           ║
║   API Routes:                                             ║
║   • POST /api/v1/wallet/recover                           ║
║   • GET  /api/v1/analyze/:chain/:address                  ║
║   • POST /api/v1/graph/analyze                            ║
║   • POST /api/v1/cases                                    ║
║   • GET  /api/v1/cases                                    ║
║   • GET  /api/v1/patterns/:address                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;

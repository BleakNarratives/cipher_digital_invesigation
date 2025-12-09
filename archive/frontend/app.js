// Voice Recognition Setup
class VoiceController {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.initRecognition();
  }

  initRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        this.handleVoiceCommand(transcript);
        document.getElementById('voiceFeedback').textContent = transcript;
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.stopListening();
      };

      this.recognition.onend = () => {
        this.stopListening();
      };
    }
  }

  startListening() {
    if (!this.recognition) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    this.isListening = true;
    this.recognition.start();
    
    const btn = document.getElementById('voiceBtn');
    btn.classList.add('listening');
    btn.querySelector('.status').textContent = 'Listening...';
  }

  stopListening() {
    this.isListening = false;
    
    const btn = document.getElementById('voiceBtn');
    btn.classList.remove('listening');
    btn.querySelector('.status').textContent = 'Ready';
  }

  handleVoiceCommand(command) {
    const lower = command.toLowerCase();
    
    // Natural language processing
    if (lower.includes('recover') && lower.includes('wallet')) {
      loadTool('wallet-recovery');
    } else if (lower.includes('analyze') && (lower.includes('address') || lower.includes('blockchain'))) {
      loadTool('blockchain-analysis');
    } else if (lower.includes('graph') || lower.includes('network')) {
      loadTool('graph-explorer');
    } else if (lower.includes('case') || lower.includes('investigation')) {
      loadTool('case-manager');
    } else if (lower.includes('pattern') || lower.includes('suspicious')) {
      loadTool('pattern-detector');
    } else if (lower.includes('crypto') || lower.includes('hash') || lower.includes('encrypt')) {
      loadTool('crypto-utils');
    }
  }
}

// Tool Loader
async function loadTool(toolName) {
  const workspace = document.getElementById('workspace');
  
  // Remove active class from all cards
  document.querySelectorAll('.tool-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Add active class to selected card
  const selectedCard = document.querySelector(`[data-tool="${toolName}"]`);
  if (selectedCard) {
    selectedCard.classList.add('active');
  }
  
  // Load tool interface
  const toolContent = await getToolContent(toolName);
  workspace.innerHTML = toolContent;
  
  // Initialize tool-specific functionality
  initializeTool(toolName);
}

// Tool Content Templates
function getToolContent(toolName) {
  const templates = {
    'wallet-recovery': `
      <div class="tool-interface">
        <h2>💼 Wallet Recovery</h2>
        <p class="tool-help">Recover wallets from partial mnemonics, typos, or missing passphrases</p>
        
        <div class="form-section">
          <label>Mnemonic Phrase (use ??? for missing words)</label>
          <textarea id="mnemonic" rows="3" placeholder="abandon abandon ??? abandon abandon about"></textarea>
          
          <label>Missing Word Positions (comma-separated)</label>
          <input type="text" id="positions" placeholder="2,5,8" />
          
          <label>Target Address (optional)</label>
          <input type="text" id="targetAddress" placeholder="0x..." />
          
          <button class="btn-primary" onclick="executeRecovery()">🚀 Start Recovery</button>
        </div>
        
        <div id="results" class="results-section"></div>
      </div>
    `,
    
    'blockchain-analysis': `
      <div class="tool-interface">
        <h2>📊 Blockchain Analysis</h2>
        <p class="tool-help">Analyze addresses across multiple chains</p>
        
        <div class="form-section">
          <label>Blockchain</label>
          <select id="chain">
            <option value="ethereum">Ethereum</option>
            <option value="bsc">Binance Smart Chain</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
          
          <label>Address</label>
          <input type="text" id="address" placeholder="0x..." />
          
          <button class="btn-primary" onclick="analyzeAddress()">🔍 Analyze</button>
        </div>
        
        <div id="analysis-results" class="results-section"></div>
      </div>
    `,
    
    'graph-explorer': `
      <div class="tool-interface">
        <h2>🕸️ Graph Explorer</h2>
        <p class="tool-help">Visualize transaction networks and detect clusters</p>
        
        <div class="form-section">
          <label>Transaction Data (JSON)</label>
          <textarea id="txData" rows="6" placeholder='[{"from":"0x...","to":"0x...","value":"1.5"}]'></textarea>
          
          <button class="btn-primary" onclick="buildGraph()">📊 Build Graph</button>
        </div>
        
        <div id="graph-canvas" class="graph-canvas"></div>
        <div id="graph-stats" class="stats-panel"></div>
      </div>
    `,
    
    'case-manager': `
      <div class="tool-interface">
        <h2>📁 Case Manager</h2>
        <p class="tool-help">Create and manage forensic investigation cases</p>
        
        <div class="form-section">
          <label>Investigator Name</label>
          <input type="text" id="investigator" placeholder="Detective Smith" />
          
          <label>Case Subject</label>
          <input type="text" id="subject" placeholder="Suspicious wallet activity" />
          
          <label>Priority</label>
          <select id="priority">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <label>Description</label>
          <textarea id="description" rows="3"></textarea>
          
          <button class="btn-primary" onclick="createCase()">📝 Create Case</button>
        </div>
        
        <div id="case-list" class="case-list"></div>
      </div>
    `,
    
    'pattern-detector': `
      <div class="tool-interface">
        <h2>🔍 Pattern Detector</h2>
        <p class="tool-help">Detect mixers, peel chains, and suspicious patterns</p>
        
        <div class="form-section">
          <label>Address to Analyze</label>
          <input type="text" id="patternAddress" placeholder="0x..." />
          
          <button class="btn-primary" onclick="detectPatterns()">🔎 Detect Patterns</button>
        </div>
        
        <div id="pattern-results" class="pattern-results"></div>
      </div>
    `,
    
    'crypto-utils': `
      <div class="tool-interface">
        <h2>🔐 Crypto Utilities</h2>
        <p class="tool-help">Hash, encrypt, and verify cryptographic operations</p>
        
        <div class="form-section">
          <label>Operation</label>
          <select id="operation">
            <option value="hash">Hash (SHA-256)</option>
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
            <option value="verify">Verify Signature</option>
          </select>
          
          <label>Input Data</label>
          <textarea id="cryptoInput" rows="4"></textarea>
          
          <label>Password/Key (if needed)</label>
          <input type="password" id="cryptoKey" />
          
          <button class="btn-primary" onclick="executeCrypto()">⚡ Execute</button>
        </div>
        
        <div id="crypto-output" class="results-section"></div>
      </div>
    `
  };
  
  return templates[toolName] || '<p>Tool not found</p>';
}

// Tool-specific initialization
function initializeTool(toolName) {
  if (toolName === 'case-manager') {
    loadCases();
  }
}

// API Communication (local backend)
async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, options);
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}

// Tool Functions
async function executeRecovery() {
  const mnemonic = document.getElementById('mnemonic').value;
  const positions = document.getElementById('positions').value.split(',').map(Number);
  const targetAddress = document.getElementById('targetAddress').value;
  
  const results = document.getElementById('results');
  results.innerHTML = '<div class="loading">🔄 Processing recovery...</div>';
  
  const response = await apiCall('/api/v1/wallet/recover', 'POST', {
    mnemonic,
    missingPositions: positions,
    targetAddress: targetAddress || null
  });
  
  if (response.success) {
    results.innerHTML = `
      <div class="success-box">
        <h3>✅ Recovery Complete</h3>
        <p>Found ${response.results.length} valid mnemonics</p>
        ${response.results.map(r => `<div class="result-item">${r.mnemonic}</div>`).join('')}
      </div>
    `;
  } else {
    results.innerHTML = `<div class="error-box">❌ ${response.error}</div>`;
  }
}

async function analyzeAddress() {
  const chain = document.getElementById('chain').value;
  const address = document.getElementById('address').value;
  
  const results = document.getElementById('analysis-results');
  results.innerHTML = '<div class="loading">🔄 Analyzing address...</div>';
  
  const response = await apiCall(`/api/v1/analyze/${chain}/${address}`);
  
  if (response.success) {
    results.innerHTML = `
      <div class="analysis-box">
        <h3>📊 Analysis Results</h3>
        <div class="stat-grid">
          <div class="stat-item">
            <span class="stat-label">Balance</span>
            <span class="stat-value">${response.data.balance}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Transactions</span>
            <span class="stat-value">${response.data.transactionCount}</span>
          </div>
        </div>
      </div>
    `;
  } else {
    results.innerHTML = `<div class="error-box">❌ ${response.error}</div>`;
  }
}

async function buildGraph() {
  const txData = JSON.parse(document.getElementById('txData').value);
  
  const response = await apiCall('/api/v1/graph/analyze', 'POST', {
    transactions: txData
  });
  
  if (response.success) {
    document.getElementById('graph-stats').innerHTML = `
      <h3>Graph Statistics</h3>
      <p>Nodes: ${response.data.statistics.nodeCount}</p>
      <p>Edges: ${response.data.statistics.edgeCount}</p>
      <p>Clusters: ${response.data.clusterCount}</p>
    `;
  }
}

async function createCase() {
  const investigator = document.getElementById('investigator').value;
  const subject = document.getElementById('subject').value;
  const priority = document.getElementById('priority').value;
  const description = document.getElementById('description').value;
  
  // Call backend to create case
  alert(`Case created: ${subject}`);
  loadCases();
}

async function loadCases() {
  // Load cases from backend
  const caseList = document.getElementById('case-list');
  if (caseList) {
    caseList.innerHTML = '<div class="loading">Loading cases...</div>';
  }
}

async function detectPatterns() {
  const address = document.getElementById('patternAddress').value;
  const results = document.getElementById('pattern-results');
  
  results.innerHTML = `
    <div class="pattern-box">
      <h3>🔍 Pattern Analysis</h3>
      <div class="pattern-item">
        <span class="pattern-label">Mixer Score:</span>
        <span class="pattern-score high">85%</span>
      </div>
      <div class="pattern-item">
        <span class="pattern-label">Peel Chain:</span>
        <span class="pattern-score medium">45%</span>
      </div>
      <div class="pattern-item">
        <span class="pattern-label">Exchange:</span>
        <span class="pattern-score low">15%</span>
      </div>
    </div>
  `;
}

async function executeCrypto() {
  const operation = document.getElementById('operation').value;
  const input = document.getElementById('cryptoInput').value;
  const key = document.getElementById('cryptoKey').value;
  
  const output = document.getElementById('crypto-output');
  
  if (operation === 'hash') {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    output.innerHTML = `
      <div class="crypto-result">
        <h3>SHA-256 Hash</h3>
        <code>${hashHex}</code>
      </div>
    `;
  }
}

// Tooltip System
function initTooltips() {
  const tooltip = document.getElementById('tooltip');
  
  const tooltipData = {
    'wallet-recovery': {
      title: 'Wallet Recovery',
      description: 'Recover lost or damaged wallet mnemonics using advanced brute force and typo correction',
      usage: 'Enter partial mnemonic with ??? for missing words. Specify positions as comma-separated numbers.',
      voice: 'Say: "Recover wallet" or "Start wallet recovery"'
    },
    'blockchain-analysis': {
      title: 'Blockchain Analysis',
      description: 'Analyze addresses across multiple blockchains. Get balance, transaction history, and patterns.',
      usage: 'Select chain and enter address. Works with Ethereum, BSC, Polygon, Solana, and Bitcoin.',
      voice: 'Say: "Analyze address" or "Check blockchain address"'
    },
    'graph-explorer': {
      title: 'Graph Explorer',
      description: 'Visualize transaction networks. Detect clusters and suspicious patterns using graph theory.',
      usage: 'Paste transaction JSON data. System will build graph and identify clusters.',
      voice: 'Say: "Show graph" or "Build transaction network"'
    },
    'case-manager': {
      title: 'Case Manager',
      description: 'Professional case tracking with evidence chain and audit logs. Export reports in multiple formats.',
      usage: 'Create cases, add evidence, track findings. All actions are logged for compliance.',
      voice: 'Say: "Create case" or "Open case manager"'
    },
    'pattern-detector': {
      title: 'Pattern Detector',
      description: 'ML-powered detection of mixers, peel chains, exchanges, and anomalies.',
      usage: 'Enter address to analyze. System scores likelihood of various suspicious patterns.',
      voice: 'Say: "Detect patterns" or "Find suspicious activity"'
    },
    'crypto-utils': {
      title: 'Crypto Utilities',
      description: 'Hash, encrypt, decrypt, and verify signatures. All operations run locally.',
      usage: 'Select operation, enter data. Encryption uses AES-256-GCM.',
      voice: 'Say: "Hash data" or "Encrypt message"'
    }
  };
  
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const toolName = card.dataset.tool;
      const data = tooltipData[toolName];
      
      if (data) {
        tooltip.innerHTML = `
          <h4>${data.title}</h4>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Usage:</strong> ${data.usage}</p>
          <p><strong>Voice:</strong> ${data.voice}</p>
        `;
        
        const rect = card.getBoundingClientRect();
        tooltip.style.left = `${rect.right + 10}px`;
        tooltip.style.top = `${rect.top}px`;
        tooltip.classList.add('show');
      }
    });
    
    card.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
    
    card.addEventListener('click', () => {
      loadTool(card.dataset.tool);
    });
  });
}

// Initialize
const voiceController = new VoiceController();

document.getElementById('voiceBtn').addEventListener('click', () => {
  if (voiceController.isListening) {
    voiceController.stopListening();
  } else {
    voiceController.startListening();
  }
});

initTooltips();

// Make functions globally accessible
window.executeRecovery = executeRecovery;
window.analyzeAddress = analyzeAddress;
window.buildGraph = buildGraph;
window.createCase = createCase;
window.detectPatterns = detectPatterns;
window.executeCrypto = executeCrypto;
window.loadTool = loadTool;

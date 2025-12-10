// CIPHER - Standalone PWA Version
// No backend required - everything runs in browser

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
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.handleVoiceCommand(transcript);
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
      alert('Voice recognition not supported. Try Chrome or Edge.');
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
    
    if (lower.includes('recover') || lower.includes('wallet')) {
      loadTool('wallet-recovery');
    } else if (lower.includes('hash')) {
      loadTool('crypto-hash');
    } else if (lower.includes('validate') || lower.includes('address') || lower.includes('check')) {
      loadTool('address-check');
    }
  }
}

// Tool Loader
function loadTool(toolName) {
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
  workspace.innerHTML = getToolContent(toolName);
}

// Tool Content Templates
function getToolContent(toolName) {
  const templates = {
    'wallet-recovery': `
      <div class="tool-interface">
        <h2>💼 Wallet Recovery (Demo)</h2>
        <p style="color: #9CA3AF; margin-bottom: 2rem;">
          This is a demo version. Enter a 12-word mnemonic with ??? for missing words.
        </p>
        
        <div class="form-section">
          <label>Mnemonic Phrase (use ??? for missing words)</label>
          <textarea id="mnemonic" rows="3" placeholder="abandon abandon ??? abandon abandon about abandon abandon abandon abandon abandon about"></textarea>
          
          <button class="btn-primary" onclick="executeRecovery()">🚀 Start Recovery (Demo)</button>
        </div>
        
        <div id="results" class="results-section"></div>
      </div>
    `,
    
    'crypto-hash': `
      <div class="tool-interface">
        <h2>🔐 SHA-256 Hash</h2>
        <p style="color: #9CA3AF; margin-bottom: 2rem;">
          Hash any text using SHA-256. All processing happens locally in your browser.
        </p>
        
        <div class="form-section">
          <label>Input Data</label>
          <textarea id="hashInput" rows="4" placeholder="Enter text to hash..."></textarea>
          
          <button class="btn-primary" onclick="executeHash()">⚡ Generate Hash</button>
        </div>
        
        <div id="hash-output" class="results-section"></div>
      </div>
    `,
    
    'address-check': `
      <div class="tool-interface">
        <h2>✅ Address Validator</h2>
        <p style="color: #9CA3AF; margin-bottom: 2rem;">
          Validate Ethereum and Bitcoin addresses.
        </p>
        
        <div class="form-section">
          <label>Blockchain</label>
          <select id="chain">
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin">Bitcoin</option>
          </select>
          
          <label>Address</label>
          <input type="text" id="address" placeholder="0x... or bc1..." />
          
          <button class="btn-primary" onclick="validateAddress()">🔍 Validate</button>
        </div>
        
        <div id="validation-results" class="results-section"></div>
      </div>
    `
  };
  
  return templates[toolName] || '<p>Tool not found</p>';
}

// Tool Functions
async function executeRecovery() {
  const mnemonic = document.getElementById('mnemonic').value.trim();
  const results = document.getElementById('results');
  
  if (!mnemonic) {
    results.innerHTML = '<div class="error-box">❌ Please enter a mnemonic phrase</div>';
    return;
  }
  
  results.innerHTML = '<div class="loading">🔄 Processing recovery...</div>';
  
  // Simulate processing
  setTimeout(() => {
    const words = mnemonic.split(' ');
    const missingCount = words.filter(w => w === '???').length;
    
    results.innerHTML = `
      <div class="success-box">
        <h3>✅ Analysis Complete</h3>
        <p><strong>Total words:</strong> ${words.length}</p>
        <p><strong>Missing words:</strong> ${missingCount}</p>
        <p><strong>Possible combinations:</strong> ${Math.pow(2048, missingCount).toLocaleString()}</p>
        <p style="margin-top: 1rem; color: #9CA3AF;">
          This is a demo. Full version will brute-force all combinations.
        </p>
        <div class="result-item" style="margin-top: 1rem;">
          <strong>Example result:</strong><br>
          ${mnemonic.replace(/\?\?\?/g, 'example')}
        </div>
      </div>
    `;
  }, 1500);
}

async function executeHash() {
  const input = document.getElementById('hashInput').value;
  const output = document.getElementById('hash-output');
  
  if (!input) {
    output.innerHTML = '<div class="error-box">❌ Please enter some text</div>';
    return;
  }
  
  output.innerHTML = '<div class="loading">🔄 Hashing...</div>';
  
  try {
    const msgBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    output.innerHTML = `
      <div class="success-box">
        <h3>✅ SHA-256 Hash</h3>
        <div class="result-item">
          ${hashHex}
        </div>
        <button class="btn-primary" style="margin-top: 1rem;" onclick="copyToClipboard('${hashHex}')">
          📋 Copy to Clipboard
        </button>
      </div>
    `;
  } catch (error) {
    output.innerHTML = `<div class="error-box">❌ Error: ${error.message}</div>`;
  }
}

function validateAddress() {
  const chain = document.getElementById('chain').value;
  const address = document.getElementById('address').value.trim();
  const results = document.getElementById('validation-results');
  
  if (!address) {
    results.innerHTML = '<div class="error-box">❌ Please enter an address</div>';
    return;
  }
  
  let isValid = false;
  let message = '';
  
  if (chain === 'ethereum') {
    // Basic Ethereum address validation
    isValid = /^0x[a-fA-F0-9]{40}$/.test(address);
    message = isValid ? 'Valid Ethereum address format' : 'Invalid Ethereum address format (should be 0x + 40 hex chars)';
  } else if (chain === 'bitcoin') {
    // Basic Bitcoin address validation
    isValid = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(address);
    message = isValid ? 'Valid Bitcoin address format' : 'Invalid Bitcoin address format';
  }
  
  results.innerHTML = `
    <div class="${isValid ? 'success-box' : 'error-box'}">
      <h3>${isValid ? '✅' : '❌'} ${message}</h3>
      <div class="result-item" style="margin-top: 1rem;">
        <strong>Address:</strong><br>${address}
      </div>
      <p style="margin-top: 1rem; color: #9CA3AF;">
        ${isValid ? 'Format is valid. Full version checks balance and transaction history.' : 'Please check the address format.'}
      </p>
    </div>
  `;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ Copied to clipboard!');
  }).catch(err => {
    alert('❌ Failed to copy: ' + err);
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

// Tool card click handlers
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', () => {
    loadTool(card.dataset.tool);
  });
});

// Make functions globally accessible
window.executeRecovery = executeRecovery;
window.executeHash = executeHash;
window.validateAddress = validateAddress;
window.copyToClipboard = copyToClipboard;
window.loadTool = loadTool;

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('✅ Service Worker registered'))
      .catch(err => console.log('❌ Service Worker registration failed:', err));
  });
}

#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Crypto Forensics Workbench...\n');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('⚠️  No .env file found. Creating from template...');
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ Created .env file. Edit it with your RPC URLs if needed.\n');
}

// Start API server
console.log('🔧 Starting API server on http://localhost:3000...');
const apiProcess = spawn('node', ['src/api/server.js'], {
  stdio: 'inherit',
  shell: true
});

apiProcess.on('error', (error) => {
  console.error('❌ Failed to start API server:', error);
  process.exit(1);
});

// Wait a bit then open dashboard
setTimeout(() => {
  console.log('\n✅ API server running!');
  console.log('📊 Open frontend/index.html in your browser');
  console.log('🎤 Click the microphone to use voice commands\n');
  console.log('Try saying:');
  console.log('  - "Recover wallet"');
  console.log('  - "Analyze address"');
  console.log('  - "Create case"\n');
  console.log('Press Ctrl+C to stop\n');
}, 2000);

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down...');
  apiProcess.kill();
  process.exit(0);
});

# Quick Start Guide

## Installation (30 seconds)

```bash
# Clone or download the project
npm install

# Start everything
npm start
```

That's it! The system will:
1. Create `.env` file if needed
2. Start API server on port 3000
3. Tell you to open `frontend/index.html`

## Using the Dashboard

### 1. Open the Dashboard
- Open `frontend/index.html` in your browser
- You'll see the welcome screen with tool cards on the left

### 2. Voice Control
- Click the 🎤 microphone button
- Say one of these commands:
  - "Recover wallet"
  - "Analyze address"
  - "Create case"
  - "Show graph"
  - "Detect patterns"

### 3. Manual Navigation
- Hover over any tool card to see detailed info
- Click a tool card to open it
- Fill in the forms and click the action button

## Example Workflows

### Recover a Wallet
1. Say "Recover wallet" or click the Wallet Recovery card
2. Enter partial mnemonic: `abandon abandon ??? abandon abandon about`
3. Enter missing positions: `2`
4. Click "Start Recovery"

### Analyze an Address
1. Say "Analyze address" or click Blockchain Analysis
2. Select chain: Ethereum
3. Enter address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
4. Click "Analyze"

### Create Investigation Case
1. Say "Create case" or click Case Manager
2. Fill in investigator name, subject, priority
3. Click "Create Case"
4. Add evidence and findings as you investigate

## Free OSINT Endpoints

All blockchain queries use free public endpoints:
- No API keys needed
- No cost
- Works out of the box

## Security Features

The system automatically:
- ✅ Blocks SQL injection attempts
- ✅ Prevents XSS attacks
- ✅ Rate limits requests (100/min)
- ✅ Logs all actions for audit
- ✅ Detects suspicious patterns

## Testing Security

Run the red team simulation:
```bash
npm run red-team
```

This tests all security features and shows you what's protected.

## Need Help?

- Hover over any tool for detailed instructions
- Check `docs/` folder for full documentation
- Run `npm test` to verify everything works

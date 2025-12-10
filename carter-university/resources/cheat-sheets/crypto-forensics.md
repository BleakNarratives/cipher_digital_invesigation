# Crypto Forensics Cheat Sheet

## Quick Reference for Investigations

### Blockchain Explorers

| Blockchain | Explorer | URL |
|------------|----------|-----|
| Bitcoin | Blockchain.com | blockchain.com |
| Ethereum | Etherscan | etherscan.io |
| BSC | BscScan | bscscan.com |
| Polygon | PolygonScan | polygonscan.com |
| Solana | Solscan | solscan.io |

### Common Address Formats

```
Bitcoin (Legacy):    1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
Bitcoin (SegWit):    3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy
Bitcoin (Bech32):    bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
Ethereum:            0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
Solana:              7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK
```

### Investigation Checklist

- [ ] Identify victim and suspect addresses
- [ ] Document transaction hashes
- [ ] Screenshot all evidence
- [ ] Check for mixer usage
- [ ] Look for exchange deposits
- [ ] Search OSINT sources
- [ ] Create transaction timeline
- [ ] Identify patterns
- [ ] Document chain of custody
- [ ] Prepare report

### Red Flags

🚩 **Mixer Usage**: Tornado Cash, Wasabi, CoinJoin  
🚩 **Peel Chains**: Systematic splitting of funds  
🚩 **Multiple Hops**: 5+ transactions in quick succession  
🚩 **Round Numbers**: Exactly 1.0, 10.0, 100.0 ETH  
🚩 **New Addresses**: Created right before suspicious activity  
🚩 **Privacy Coins**: Monero, Zcash (harder to trace)  

### Python Quick Scripts

#### Check if Address is Valid
```python
from web3 import Web3

def is_valid_eth_address(address):
    return Web3.isAddress(address)

print(is_valid_eth_address("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"))
```

#### Get Transaction Details
```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://eth.llamarpc.com'))
tx = w3.eth.get_transaction('0x...')
print(f"From: {tx['from']}")
print(f"To: {tx['to']}")
print(f"Value: {w3.fromWei(tx['value'], 'ether')} ETH")
```

#### Check Address Balance
```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://eth.llamarpc.com'))
address = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
balance = w3.eth.get_balance(address)
print(f"Balance: {w3.fromWei(balance, 'ether')} ETH")
```

### Common Scams

| Scam Type | Description | Red Flags |
|-----------|-------------|-----------|
| Fake ICO | Fake token sale | No whitepaper, anonymous team |
| Rug Pull | Devs drain liquidity | New token, locked liquidity claims |
| Phishing | Fake websites | Misspelled URLs, urgent messages |
| Ponzi | Pay old investors with new money | Guaranteed returns, referral bonuses |
| Impersonation | Fake celebrity/company | Giveaway scams, "send 1 get 2 back" |

### OSINT Resources

- **Twitter**: Search addresses, look for mentions
- **Etherscan Comments**: Users sometimes label addresses
- **ENS Lookup**: Check if address has a name
- **GitHub**: Search for addresses in code
- **Reddit**: r/CryptoScams, r/Bitcoin
- **Discord**: Crypto investigation communities

### Transaction Analysis

#### Normal Transaction
```
User A → User B (single transfer)
```

#### Peel Chain (Suspicious)
```
Hacker → Address1 (90%) + Address2 (10%)
Address1 → Address3 (90%) + Address4 (10%)
Address3 → Address5 (90%) + Address6 (10%)
```

#### Mixer Pattern
```
100 addresses → Mixer → 100 different addresses
(Hard to trace which input matches which output)
```

### Legal Considerations

✅ **Legal**:
- Analyzing public blockchain data
- Using public OSINT sources
- Reporting crimes to authorities
- Assisting victims

❌ **Illegal**:
- Hacking wallets or exchanges
- Accessing private data without authorization
- Impersonating law enforcement
- Tampering with evidence

### Report Template

```markdown
# Investigation Report

## Case Information
- Case ID: [ID]
- Date: [Date]
- Investigator: [Name]
- Subject: [Brief description]

## Summary
[2-3 sentence overview]

## Evidence
- Victim Address: 0x...
- Suspect Address: 0x...
- Transaction Hash: 0x...
- Amount: X ETH
- Date/Time: [timestamp]

## Analysis
[Detailed findings]

## Conclusion
[What happened and recommendations]

## Appendix
[Screenshots, transaction logs, etc.]
```

### Quick Commands

#### Using curl to query Etherscan API
```bash
# Get transaction list
curl "https://api.etherscan.io/api?module=account&action=txlist&address=0x...&apikey=YourApiKey"

# Get balance
curl "https://api.etherscan.io/api?module=account&action=balance&address=0x...&apikey=YourApiKey"
```

#### Using Web3 CLI
```bash
# Install
npm install -g web3-cli

# Check balance
web3 eth getBalance 0x...

# Get transaction
web3 eth getTransaction 0x...
```

### Conversion Reference

| Unit | Wei | Gwei | Ether |
|------|-----|------|-------|
| 1 Wei | 1 | 0.000000001 | 0.000000000000000001 |
| 1 Gwei | 1,000,000,000 | 1 | 0.000000001 |
| 1 Ether | 1,000,000,000,000,000,000 | 1,000,000,000 | 1 |

### Time-Saving Tips

1. **Bookmark explorers** for quick access
2. **Save common addresses** (exchanges, mixers)
3. **Use browser extensions** (MetaMask for quick checks)
4. **Create templates** for reports
5. **Automate repetitive tasks** with Python scripts
6. **Join communities** for shared intelligence
7. **Keep a case log** for all investigations

### Emergency Contacts

- **FBI IC3**: ic3.gov (US cybercrime)
- **Chainalysis**: For serious cases
- **Local law enforcement**: Cyber crime unit
- **Exchange support**: For frozen funds

### Tools Quick Install

```bash
# Python libraries
pip install web3 mnemonic bip32utils bitcoinlib

# Node.js tools
npm install -g web3-cli ethers

# Optional: BTCRecover
git clone https://github.com/gurnec/btcrecover.git
```

---

**Remember**: Always document everything, maintain chain of custody, and stay within legal boundaries!

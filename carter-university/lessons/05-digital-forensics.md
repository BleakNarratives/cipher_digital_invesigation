# Lesson 5: Digital Forensics for Crypto Investigations

## What is Digital Forensics?

Digital forensics is the process of collecting, analyzing, and preserving digital evidence for investigations. In crypto, this means tracking transactions, identifying wallet owners, and building cases.

## The Investigation Process

### 1. Identification
**Goal:** Determine what happened and what evidence exists

**Questions to ask:**
- What type of crime? (Theft, scam, money laundering)
- What blockchain(s) are involved?
- What addresses are suspicious?
- What's the timeline?

**Tools:**
- Blockchain explorers (Etherscan, Blockchain.com)
- Transaction databases
- Wallet tracking software

### 2. Preservation
**Goal:** Secure evidence before it disappears

**Actions:**
- Screenshot everything
- Save transaction hashes
- Archive wallet addresses
- Document timestamps
- Record blockchain state

**Why it matters:** Blockchains are permanent, but websites, exchanges, and social media can delete content.

### 3. Analysis
**Goal:** Understand what the evidence tells you

**Techniques:**
- Transaction tracing
- Cluster analysis
- Pattern recognition
- Timeline reconstruction

### 4. Documentation
**Goal:** Create a clear, defensible report

**Include:**
- Chain of custody
- Methodology
- Findings
- Evidence
- Conclusions

### 5. Presentation
**Goal:** Explain findings to non-technical people (lawyers, judges, clients)

**Tips:**
- Use visual aids
- Avoid jargon
- Tell a story
- Show clear evidence

## Transaction Tracing

### Basic Tracing
Follow the money from address to address.

**Example:**
```
Victim Wallet → Hacker Wallet → Mixer → Exchange → Cash Out
```

### Tools:
- **Etherscan:** Ethereum transactions
- **Blockchain.com:** Bitcoin transactions
- **Chainalysis:** Professional tool (expensive)
- **Crystal Blockchain:** Another pro tool

### What to Look For:
- Large transfers
- Splitting transactions (peel chains)
- Mixer usage
- Exchange deposits
- Known scam addresses

## Identifying Patterns

### Peel Chains
Hacker sends small amounts to many addresses to confuse tracking.

```
100 ETH → 90 ETH + 10 ETH
90 ETH → 80 ETH + 10 ETH
80 ETH → 70 ETH + 10 ETH
...
```

**Red flag:** Consistent pattern of splitting

### Mixers/Tumblers
Services that mix your crypto with others to hide the trail.

**Common mixers:**
- Tornado Cash (Ethereum)
- Wasabi Wallet (Bitcoin)
- CoinJoin services

**Detection:** Multiple inputs, multiple outputs, equal amounts

### Exchange Deposits
When funds hit an exchange, they often stop being traceable (exchange uses internal ledger).

**What you can do:**
- Identify which exchange
- Contact exchange with legal request
- Get KYC info (if you're law enforcement)

## OSINT (Open Source Intelligence)

### Finding Wallet Owners

**Sources:**
1. **Social Media:** People post their addresses for donations
2. **Forums:** Bitcointalk, Reddit, Discord
3. **GitHub:** Developers put addresses in code
4. **ENS/Domain Names:** Ethereum Name Service links names to addresses
5. **NFT Profiles:** OpenSea, Rarible show wallet activity

**Example:**
```
Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
→ Check ENS: vitalik.eth
→ Google the address
→ Check Twitter for mentions
→ Look at NFT purchases (might reveal identity)
```

### Clustering
Group addresses that likely belong to the same person.

**Indicators:**
- Addresses that transact together frequently
- Addresses funded from the same source
- Similar transaction patterns
- Same timing/behavior

## Case Study: Tracking a Scam

**Scenario:** Fake ICO steals $500K

### Step 1: Identify
- Scam website collected ETH
- Deposit address: 0xSCAM...
- 200 victims sent funds
- Total: 300 ETH (~$500K)

### Step 2: Preserve
- Screenshot website (before it goes down)
- Save all transaction hashes
- Archive social media posts
- Document victim reports

### Step 3: Trace
```
Victim wallets → 0xSCAM (collection address)
0xSCAM → 0xLAUNDER (intermediate)
0xLAUNDER → Tornado Cash (mixer)
Tornado Cash → 0xEXCHANGE
0xEXCHANGE → Binance (identified via deposit pattern)
```

### Step 4: Investigate
- 0xSCAM created 2 days before scam
- Funded with 0.1 ETH from 0xFUNDER
- 0xFUNDER has ENS name: scammer.eth
- scammer.eth linked to Twitter: @cryptoscammer
- Twitter profile has Telegram: @scammer123

### Step 5: Report
- Contact Binance with evidence
- File police report
- Notify victims
- Document everything for potential lawsuit

## Tools of the Trade

### Free Tools:
- **Etherscan/Blockchain.com:** Basic exploration
- **Wallet Explorer:** Bitcoin clustering
- **OXT.me:** Bitcoin analysis
- **Breadcrumbs.app:** Free transaction tracing

### Paid Tools:
- **Chainalysis:** Industry standard ($$$)
- **Elliptic:** Compliance focused
- **CipherTrace:** AML/CTF tool
- **Crystal Blockchain:** Investigation platform

### DIY Tools:
- **Python + Web3:** Custom scripts
- **Graph databases:** Neo4j for network analysis
- **Jupyter notebooks:** Document analysis

## Legal Considerations

### What You Can Do:
✅ Analyze public blockchain data  
✅ Use public OSINT sources  
✅ Report crimes to authorities  
✅ Assist victims in recovery  

### What You Can't Do:
❌ Hack wallets or exchanges  
❌ Impersonate law enforcement  
❌ Violate privacy laws  
❌ Tamper with evidence  

### Chain of Custody
Document every step:
1. When evidence was collected
2. Who collected it
3. How it was stored
4. Who accessed it
5. Any changes made

## Practice Exercise

**Scenario:** You're investigating a wallet theft.

**Given:**
- Victim address: 0xVICTIM
- Stolen amount: 50 ETH
- Theft occurred: Block 15000000
- Funds moved to: 0xTHIEF

**Tasks:**
1. What's your first step?
2. What information do you need to gather?
3. How would you trace the funds?
4. What patterns would you look for?

**Sample Answer:**
1. First step: Verify the theft transaction on Etherscan
2. Gather: Transaction hash, timestamp, victim statement, any known info about thief
3. Trace: Follow 0xTHIEF transactions, look for exchange deposits or mixer usage
4. Patterns: Peel chains, mixer usage, multiple hops, exchange deposits

## Red Team vs Blue Team

### Red Team (Attackers)
- Try to hide their tracks
- Use mixers and privacy coins
- Create complex transaction chains
- Use multiple wallets

### Blue Team (Investigators)
- Follow the money
- Identify patterns
- Use clustering
- Leverage OSINT

**Your job:** Think like both to be effective

## Next Steps

- Practice with real blockchain data
- Learn Python for automation
- Study real cases (Mt. Gox, Bitfinex hack, etc.)
- Join forensics communities

## Resources

- [Chainalysis Blog](https://blog.chainalysis.com)
- [Elliptic Resources](https://www.elliptic.co/resources)
- [OSINT Framework](https://osintframework.com)
- [Blockchain Analysis Course](https://www.udemy.com/topic/blockchain/)

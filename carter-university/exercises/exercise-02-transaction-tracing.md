# Exercise 2: Transaction Tracing

## Objective
Learn to trace cryptocurrency transactions and identify suspicious patterns.

## Scenario
You're investigating a suspected theft. The victim's wallet (0xVICTIM) had 10 ETH stolen. You need to trace where the funds went.

## Given Information
- **Victim Address**: `0x1234567890123456789012345678901234567890`
- **Theft Transaction**: `0xabcdef...` (Block 15000000)
- **Amount Stolen**: 10 ETH
- **Suspect Address**: `0x9876543210987654321098765432109876543210`

## Tasks

### Task 1: Manual Tracing
Using Etherscan (or testnet explorer), trace the following transaction path:

```
Address A → Address B → Address C → Exchange
```

Document:
1. Transaction hashes
2. Amounts transferred
3. Timestamps
4. Gas fees paid

### Task 2: Identify Patterns
Look at this transaction sequence and identify the pattern:

```
Tx1: 0xHACKER → 0xADDR1 (9 ETH) + 0xADDR2 (1 ETH)
Tx2: 0xADDR1 → 0xADDR3 (8 ETH) + 0xADDR4 (1 ETH)
Tx3: 0xADDR3 → 0xADDR5 (7 ETH) + 0xADDR6 (1 ETH)
```

**Question**: What pattern is this? Why would someone do this?

### Task 3: Python Tracing Script
Write a script that:
1. Takes a transaction hash
2. Gets the transaction details
3. Identifies the sender and receiver
4. Checks if the receiver has made any outgoing transactions
5. Traces 3 levels deep

```python
from web3 import Web3

def trace_transaction(tx_hash, depth=3):
    # Your code here
    pass

# Test with a real transaction
trace_transaction("0x...")
```

### Task 4: Mixer Detection
Given these characteristics, determine if a mixer was used:

- 100 different addresses sent funds to Address X
- Address X sent funds to 100 different addresses
- All amounts were similar (0.1 ETH)
- All transactions happened within 1 hour

**Question**: Is this a mixer? What are the red flags?

## Solutions

### Task 2 Answer:
This is a **peel chain**. The hacker is systematically splitting funds to make tracing harder. They keep most of the funds (90%) and send small amounts (10%) to different addresses. This creates a complex web of transactions.

**Why do this?**
- Makes manual tracing tedious
- Confuses automated tools
- Prepares funds for mixing or cashing out

### Task 3 Solution:
```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://eth.llamarpc.com'))

def trace_transaction(tx_hash, depth=3, current_depth=0):
    if current_depth >= depth:
        return
    
    # Get transaction
    tx = w3.eth.get_transaction(tx_hash)
    
    print(f"{'  ' * current_depth}Level {current_depth}:")
    print(f"{'  ' * current_depth}From: {tx['from']}")
    print(f"{'  ' * current_depth}To: {tx['to']}")
    print(f"{'  ' * current_depth}Value: {w3.fromWei(tx['value'], 'ether')} ETH")
    print(f"{'  ' * current_depth}Block: {tx['blockNumber']}")
    
    # Get block to find timestamp
    block = w3.eth.get_block(tx['blockNumber'])
    print(f"{'  ' * current_depth}Time: {block['timestamp']}")
    
    # Get transactions from the 'to' address
    # Note: This requires an API or indexer in practice
    # For demo purposes, we'll stop here
    
    print()

# Example usage
trace_transaction("0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060")
```

### Task 4 Answer:
**Yes, this is likely a mixer.**

Red flags:
- Many inputs, many outputs (classic mixer pattern)
- Similar amounts (mixers often use standard denominations)
- Short time window (batch processing)
- No clear 1-to-1 relationship between inputs and outputs

## Real-World Example

The **Bitfinex Hack (2016)**:
- 120,000 BTC stolen (~$72M at the time)
- Hackers used complex transaction chains
- Took 5+ years to trace and arrest suspects
- Used mixers, peel chains, and multiple exchanges

## Bonus Challenge

Research a real crypto theft (Mt. Gox, Bitfinex, Poly Network) and:
1. Find the theft transaction
2. Trace where funds went
3. Identify techniques used to hide the trail
4. Document your findings

## What You Learned

- How to manually trace transactions
- Identifying peel chains
- Recognizing mixer patterns
- Using Python to automate tracing
- Real-world investigation techniques

## Next Steps

- Practice with testnet transactions
- Learn about graph analysis tools
- Study more complex laundering techniques
- Join crypto investigation communities

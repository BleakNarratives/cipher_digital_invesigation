# Exercise 1: Wallet Address Validation

## Objective
Learn to identify and validate different cryptocurrency wallet addresses.

## Background
Different blockchains use different address formats. Being able to quickly identify which blockchain an address belongs to is crucial for investigations.

## Tasks

### Task 1: Identify the Blockchain
For each address below, identify which blockchain it belongs to:

1. `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`
2. `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
3. `bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq`
4. `3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy`
5. `7EqQdEULxWcraVx3mXKFjc84LhCkMGZCkRuDpvcMwJeK`

### Task 2: Validate Addresses
Write a Python script to validate if these addresses are properly formatted:

```python
# Your code here
addresses = [
    "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "0xINVALID",
    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "not_an_address"
]

# Validate each address
```

### Task 3: Check Balance
Using Web3.py, check the balance of this Ethereum address:
`0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

### Task 4: Transaction Lookup
Find the first transaction ever made on Ethereum (hint: check block 0 or 1 on Etherscan).

## Solutions

### Task 1 Answers:
1. Bitcoin (Legacy format, starts with '1')
2. Ethereum (starts with '0x', 40 hex characters)
3. Bitcoin (Bech32/Native SegWit, starts with 'bc1')
4. Bitcoin (SegWit, starts with '3')
5. Solana (Base58 encoded, ~44 characters)

### Task 2 Solution:
```python
from web3 import Web3

def validate_eth_address(address):
    return Web3.isAddress(address)

addresses = [
    "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "0xINVALID",
    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "not_an_address"
]

for addr in addresses:
    is_valid = validate_eth_address(addr)
    print(f"{addr}: {'✅ Valid' if is_valid else '❌ Invalid'}")
```

### Task 3 Solution:
```python
from web3 import Web3

# Connect to Ethereum node
w3 = Web3(Web3.HTTPProvider('https://eth.llamarpc.com'))

# Check balance
address = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
balance_wei = w3.eth.get_balance(address)
balance_eth = w3.fromWei(balance_wei, 'ether')

print(f"Balance: {balance_eth} ETH")
```

### Task 4 Answer:
The first transaction on Ethereum was in block 46147 (genesis block had no transactions). You can find it on Etherscan by searching for block 46147.

## Bonus Challenge

Create a script that:
1. Takes any address as input
2. Automatically detects which blockchain it belongs to
3. Validates the format
4. Checks the balance (if possible)

## What You Learned

- Different blockchain address formats
- How to validate addresses programmatically
- Using Web3.py to interact with Ethereum
- Using blockchain explorers for research

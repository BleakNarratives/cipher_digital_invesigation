# Lesson 4: Wallet Recovery Fundamentals

## Understanding Seed Phrases

A seed phrase (also called mnemonic phrase or recovery phrase) is a list of 12-24 words that can restore your entire wallet.

### Example Seed Phrase:
```
witch collapse practice feed shame open despair creek road again ice least
```

**CRITICAL:** This phrase = complete access to your crypto. Lose it = lose your money forever.

## How Seed Phrases Work

### BIP39 Standard
Most wallets use BIP39 (Bitcoin Improvement Proposal 39), which:
- Uses a list of 2048 possible words
- Generates 12, 15, 18, 21, or 24 word phrases
- Each word represents 11 bits of entropy
- Last word contains a checksum

### From Seed to Wallet
```
Seed Phrase → Seed (512 bits) → Master Key → Private Keys → Public Keys → Addresses
```

## Common Recovery Scenarios

### 1. Missing Words
You have most of the phrase but some words are missing or illegible.

**Example:**
```
abandon abandon ??? abandon abandon about abandon abandon abandon abandon abandon about
```

**Solution:** Brute force the missing positions using the BIP39 wordlist (2048 possibilities per word).

### 2. Wrong Order
You have all the words but don't know the correct order.

**Difficulty:**
- 12 words = 479 million combinations
- 24 words = astronomical (don't even try)

**Solution:** If you know some positions, dramatically reduces possibilities.

### 3. Typos
You wrote down words incorrectly or they're hard to read.

**Example:**
```
"abandun" instead of "abandon"
"abuot" instead of "about"
```

**Solution:** Check for similar words in BIP39 list, try common misspellings.

### 4. Wrong Passphrase
Some wallets add an optional 25th word (passphrase) for extra security.

**Problem:** Forgot the passphrase  
**Solution:** Try common passwords, variations, or brute force if you have hints

## Recovery Tools

### 1. BTCRecover
Open-source tool for recovering Bitcoin wallets.

**Features:**
- Seed phrase recovery
- Password recovery
- Typo correction
- GPU acceleration

### 2. Hashcat
Password cracking tool that can help with wallet passwords.

### 3. Custom Scripts
For specific scenarios, write Python scripts using:
- `mnemonic` library (BIP39)
- `bip32utils` (key derivation)
- `web3` (Ethereum)
- `bitcoinlib` (Bitcoin)

## Recovery Process

### Step 1: Gather Information
- What words do you have?
- What positions are missing?
- What blockchain? (Bitcoin, Ethereum, etc.)
- Do you have any addresses from the wallet?

### Step 2: Estimate Difficulty
- 1 missing word = Easy (2048 tries)
- 2 missing words = Medium (4 million tries)
- 3+ missing words = Hard (billions of tries)

### Step 3: Set Up Recovery
```python
# Example: Check if seed phrase is valid
from mnemonic import Mnemonic

mnemo = Mnemonic("english")
seed_phrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Validate
is_valid = mnemo.check(seed_phrase)
print(f"Valid: {is_valid}")

# Generate seed
seed = mnemo.to_seed(seed_phrase)
print(f"Seed: {seed.hex()}")
```

### Step 4: Verify Recovery
Once you find a valid phrase, verify it generates the correct address:

```python
from bip32utils import BIP32Key
from mnemonic import Mnemonic

# Generate seed from phrase
mnemo = Mnemonic("english")
seed = mnemo.to_seed(seed_phrase)

# Derive Bitcoin address
key = BIP32Key.fromEntropy(seed)
address = key.Address()
print(f"Address: {address}")

# Compare with known address
if address == target_address:
    print("✅ MATCH! Wallet recovered!")
```

## Security Considerations

### During Recovery:
⚠️ **NEVER** enter your real seed phrase into online tools  
⚠️ Use offline/air-gapped computers for sensitive recovery  
⚠️ Verify tool source code before running  
⚠️ Move funds immediately after recovery  

### After Recovery:
✅ Generate a NEW wallet  
✅ Transfer all funds to new wallet  
✅ Destroy old compromised seed phrase  
✅ Securely store new seed phrase  

## Real-World Example

**Scenario:** Client has 11 out of 12 words, missing word #7

**Known phrase:**
```
abandon abandon abandon abandon abandon abandon ??? abandon abandon abandon abandon about
```

**Recovery approach:**
1. Try all 2048 BIP39 words in position 7
2. For each attempt, generate the wallet
3. Check if it matches the known address
4. Estimated time: Minutes to hours

**Success rate:** Very high if you have the correct 11 words

## Practice Exercise

Given this partial seed phrase:
```
witch collapse practice feed shame open ??? creek road again ice least
```

1. How many possibilities for the missing word?
2. What information would help narrow it down?
3. What's the first step in recovery?

**Answers:**
1. 2048 (all BIP39 words)
2. A known address from the wallet
3. Verify the other 11 words are valid BIP39 words

## Advanced Topics

- **Derivation Paths:** Different paths create different addresses
- **Passphrase Recovery:** 25th word brute forcing
- **Hardware Wallet Recovery:** Special considerations
- **Multi-sig Recovery:** Requires multiple keys

## Next Lesson

Lesson 5: Digital Forensics Basics - Investigating crypto crimes

## Tools to Install

```bash
# Python libraries
pip install mnemonic
pip install bip32utils
pip install web3
pip install bitcoinlib

# BTCRecover
git clone https://github.com/gurnec/btcrecover.git
```

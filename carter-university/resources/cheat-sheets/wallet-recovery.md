# Wallet Recovery Cheat Sheet

## BIP39 Word List Info

- **Total words**: 2048
- **Common phrase lengths**: 12, 15, 18, 21, 24 words
- **Language**: English (most common)
- **Checksum**: Last word contains checksum bits

## Recovery Difficulty

| Missing Words | Combinations | Difficulty | Time Estimate |
|---------------|--------------|------------|---------------|
| 1 word | 2,048 | Easy | Minutes |
| 2 words | 4,194,304 | Medium | Hours |
| 3 words | 8,589,934,592 | Hard | Days |
| 4+ words | Astronomical | Nearly Impossible | Years+ |

## Common Scenarios

### 1. Missing Words
```
Known: abandon abandon ??? abandon abandon about
Unknown: Position 3
Approach: Try all 2048 BIP39 words in position 3
```

### 2. Typos
```
Written: "abandun abuot"
Correct: "abandon about"
Approach: Check for similar-looking words in BIP39 list
```

### 3. Wrong Order
```
Have: All 12 words but scrambled
Approach: If you know ANY positions, reduces combinations dramatically
```

### 4. Missing Passphrase
```
Have: Valid 12-word phrase
Problem: Optional 25th word (passphrase) forgotten
Approach: Try common passwords, variations
```

## Python Recovery Script Template

```python
from mnemonic import Mnemonic
from bip32utils import BIP32Key

# Initialize
mnemo = Mnemonic("english")
wordlist = mnemo.wordlist

# Your partial phrase (??? = missing)
partial_phrase = "abandon abandon ??? abandon abandon about abandon abandon abandon abandon abandon about"
missing_position = 2  # 0-indexed

# Target address (if known)
target_address = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"

# Try all words
for word in wordlist:
    # Build test phrase
    words = partial_phrase.split()
    words[missing_position] = word
    test_phrase = " ".join(words)
    
    # Check if valid
    if not mnemo.check(test_phrase):
        continue
    
    # Generate wallet
    seed = mnemo.to_seed(test_phrase)
    key = BIP32Key.fromEntropy(seed)
    address = key.Address()
    
    # Check match
    if address == target_address:
        print(f"✅ FOUND: {test_phrase}")
        break
    else:
        print(f"Trying: {word}... (Address: {address})")
```

## Ethereum Recovery Script

```python
from mnemonic import Mnemonic
from eth_account import Account

mnemo = Mnemonic("english")
wordlist = mnemo.wordlist

partial_phrase = "witch collapse practice feed shame open ??? creek road again ice least"
missing_position = 6
target_address = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

for word in wordlist:
    words = partial_phrase.split()
    words[missing_position] = word
    test_phrase = " ".join(words)
    
    if not mnemo.check(test_phrase):
        continue
    
    # Enable HD wallet features
    Account.enable_unaudited_hdwallet_features()
    account = Account.from_mnemonic(test_phrase)
    
    if account.address.lower() == target_address.lower():
        print(f"✅ FOUND: {test_phrase}")
        print(f"Address: {account.address}")
        break
```

## Derivation Paths

Different paths create different addresses from the same seed!

| Blockchain | Standard Path | Example |
|------------|---------------|---------|
| Bitcoin | m/44'/0'/0'/0/0 | BIP44 |
| Ethereum | m/44'/60'/0'/0/0 | BIP44 |
| Bitcoin (Legacy) | m/44'/0'/0'/0 | Old wallets |
| Bitcoin (SegWit) | m/49'/0'/0'/0/0 | P2SH-P2WPKH |
| Bitcoin (Native SegWit) | m/84'/0'/0'/0/0 | Bech32 |

### Try Multiple Paths

```python
paths = [
    "m/44'/0'/0'/0/0",   # Bitcoin BIP44
    "m/44'/60'/0'/0/0",  # Ethereum
    "m/49'/0'/0'/0/0",   # Bitcoin SegWit
    "m/84'/0'/0'/0/0",   # Bitcoin Native SegWit
]

for path in paths:
    # Derive key using path
    # Check if matches target address
```

## Common Mistakes

### ❌ Wrong:
- Storing seed phrase in cloud
- Taking photos of seed phrase
- Entering seed into random websites
- Sharing seed with "support" staff

### ✅ Right:
- Write on paper, store in safe
- Use metal backup (fireproof)
- Only enter into trusted wallets
- Never share with anyone

## Validation Checklist

Before attempting recovery:

- [ ] Verify all known words are in BIP39 wordlist
- [ ] Confirm which blockchain (Bitcoin, Ethereum, etc.)
- [ ] Have at least one known address from wallet
- [ ] Understand derivation path used
- [ ] Estimate difficulty (how many missing words?)
- [ ] Set up offline/air-gapped computer for sensitive recovery
- [ ] Have backup plan if recovery fails

## BIP39 Word List (First 20)

```
abandon, ability, able, about, above, absent, absorb, abstract,
absurd, abuse, access, accident, account, accuse, achieve, acid,
acoustic, acquire, across, act...
```

[Full list: 2048 words total]

## Checksum Validation

The last word contains checksum bits. If your phrase doesn't validate, the checksum might be wrong.

```python
from mnemonic import Mnemonic

mnemo = Mnemonic("english")
phrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Check validity
is_valid = mnemo.check(phrase)
print(f"Valid: {is_valid}")

# If invalid, last word might be wrong
# Try variations of last word
```

## Passphrase (25th Word)

Some wallets support an optional passphrase for extra security.

```python
from mnemonic import Mnemonic

mnemo = Mnemonic("english")
phrase = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"

# Without passphrase
seed1 = mnemo.to_seed(phrase)

# With passphrase
seed2 = mnemo.to_seed(phrase, passphrase="my_secret_password")

# These create DIFFERENT wallets!
```

## Recovery Tools

### BTCRecover
```bash
git clone https://github.com/gurnec/btcrecover.git
cd btcrecover
python btcrecover.py --wallet wallet.dat --tokenlist tokens.txt
```

### Hashcat (for wallet passwords)
```bash
hashcat -m 11300 -a 0 wallet.hash wordlist.txt
```

### Custom Python Script
Best for specific scenarios with known constraints.

## Security During Recovery

### DO:
✅ Use air-gapped computer (no internet)  
✅ Verify all software before running  
✅ Move funds immediately after recovery  
✅ Generate new wallet and transfer  
✅ Destroy old compromised seed  

### DON'T:
❌ Use online recovery services  
❌ Enter seed into websites  
❌ Trust "recovery experts" asking for your seed  
❌ Keep recovered wallet (it's compromised)  

## Success Rate Factors

**High Success (90%+)**:
- 1 missing word + known address
- Typo in known word
- Wrong order with some known positions

**Medium Success (50-70%)**:
- 2 missing words + known address
- Forgotten passphrase with hints
- Multiple typos

**Low Success (<30%)**:
- 3+ missing words
- No known addresses
- Completely scrambled order
- No hints for passphrase

## Emergency Recovery Steps

1. **Don't Panic**: Take your time
2. **Gather Info**: What do you know for certain?
3. **Estimate Difficulty**: How many unknowns?
4. **Set Up Safely**: Offline computer if possible
5. **Start Simple**: Try obvious solutions first
6. **Document**: Keep notes of what you've tried
7. **Seek Help**: Communities can advise (never share seed!)

## Resources

- **BIP39 Spec**: github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
- **BTCRecover**: github.com/gurnec/btcrecover
- **Mnemonic Library**: pypi.org/project/mnemonic/
- **Reddit**: r/BitcoinBeginners, r/CryptoCurrency

## Quick Reference Commands

```bash
# Install Python libraries
pip install mnemonic bip32utils eth-account web3

# Check if phrase is valid (Python)
python -c "from mnemonic import Mnemonic; m=Mnemonic('english'); print(m.check('your phrase here'))"

# Generate seed from phrase
python -c "from mnemonic import Mnemonic; m=Mnemonic('english'); print(m.to_seed('your phrase here').hex())"
```

---

**Remember**: Recovery is possible but requires patience, the right tools, and proper security practices!

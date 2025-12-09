# 🚀 Quick Start for Calvin

## Hey Calvin! 👋

I built you a wallet recovery tool. Here's how to use it in 60 seconds.

---

## Step 1: Open the Tool (5 seconds)

Find this file in the folder:
```
crypto-forensics-mvp.html
```

**Double-click it.** That's it. It opens in your browser.

---

## Step 2: Enter Your Mnemonic (10 seconds)

In the text box, type your mnemonic phrase.

**For missing words, use:** `???`

### Example:
```
abandon abandon ??? abandon abandon about
```

This means you know all words except the 3rd one.

---

## Step 3: Click "Start Recovery" (5 seconds)

Big blue button. Can't miss it.

The tool will search for all valid combinations.

---

## Step 4: Get Results (30 seconds)

You'll see a list of valid mnemonics.

Each one has a **Copy** button.

Click it to copy to clipboard.

---

## Step 5: Test Each One (10 seconds per mnemonic)

Paste each mnemonic into your wallet app.

The right one will show your balance.

---

## That's It! 🎉

Total time: ~60 seconds + testing time

---

## Voice Control (Optional)

### Click the microphone button and say:

1. **"recover wallet"** - Jumps to input
2. **"show history"** - See past attempts
3. **"help"** - Shows commands

**Note:** Voice only works in Chrome or Edge.

---

## Tips

### If You Have Multiple Missing Words

```
abandon ??? abandon ??? abandon about
```

This works! Up to 3 missing words.

**More missing words = longer search time:**
- 1 missing: ~5 seconds
- 2 missing: ~30 seconds
- 3 missing: ~2 minutes

---

### If You Get No Results

**Check these:**
1. Are the known words spelled correctly?
2. Is the mnemonic the right length? (12, 15, 18, 21, or 24 words)
3. Are you using `???` for missing words?

**Common mistake:**
```
❌ abandon abandon abandon abandon abandon about
   (no missing words marked)

✅ abandon abandon ??? abandon abandon about
   (missing word marked with ???)
```

---

### If You Want to Save Your Work

**Good news:** It's automatic!

Every recovery is saved in "History".

To see it:
- Click microphone → say "show history"
- Or scroll down to History section

---

## Troubleshooting

### "Voice control doesn't work"
- Use Chrome or Edge browser
- Click "Allow" when it asks for microphone
- Or just use keyboard (voice is optional)

### "It's taking too long"
- More missing words = more time
- 3 missing words can take 2 minutes
- Be patient, it's working!

### "I found multiple valid mnemonics"
- This is normal!
- Test each one in your wallet
- The right one will show your balance

### "None of the mnemonics work"
- Double-check your known words
- One wrong word = no correct results
- Try different positions for ???

---

## Privacy & Security

### Is this safe?
**Yes!** Everything runs in your browser.

- ✅ No data sent to any server
- ✅ No internet required (after first load)
- ✅ History saved on YOUR computer only
- ✅ Nobody can see your mnemonics

### Can I use this offline?
**Yes!** After the first time you open it, it works offline.

---

## Examples

### Example 1: One Missing Word
```
Input:
abandon abandon ??? abandon abandon about

Result:
✅ Found 2048 valid mnemonics
(Shows list with Copy buttons)
```

### Example 2: Two Missing Words
```
Input:
abandon ??? abandon ??? abandon about

Result:
✅ Found 156 valid mnemonics
(Shows list with Copy buttons)
```

### Example 3: With Target Address
```
Input:
Mnemonic: abandon abandon ??? abandon abandon about
Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

Result:
✅ Found 1 matching mnemonic
(The one that generates that address)
```

---

## What to Do After Recovery

### If You Found Your Wallet
1. ✅ Copy the correct mnemonic
2. ✅ Write it down on paper
3. ✅ Store it somewhere safe
4. ✅ Consider moving funds to a new wallet
5. ✅ Never share your mnemonic with anyone

### If You Didn't Find It
1. Double-check your known words
2. Try different positions for missing words
3. Make sure you're using the right mnemonic length
4. Consider if you might have more than 3 missing words

---

## Need Help?

### Check These First
1. Read the help text in the tool (it's detailed)
2. Try the example: `abandon abandon ??? abandon abandon about`
3. Make sure you're using ??? for missing words

### Still Stuck?
- Check the error message (it tells you what's wrong)
- Try with fewer missing words first
- Make sure your browser is up to date

---

## Advanced: If You Want to Share This

### Send to a Friend
1. Just send them the `crypto-forensics-mvp.html` file
2. Tell them to double-click it
3. That's it!

### Put It Online
See `DEPLOY-MVP.md` for instructions.

You can get a URL like:
```
https://your-tool.vercel.app
```

Then anyone can use it without downloading.

---

## Remember

### This Tool Is For:
- ✅ Recovering YOUR OWN wallets
- ✅ Finding missing words in YOUR mnemonics
- ✅ Helping YOU access YOUR funds

### This Tool Is NOT For:
- ❌ Accessing other people's wallets
- ❌ Hacking or stealing
- ❌ Anything illegal

**Use responsibly!**

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│  CRYPTO FORENSICS WORKBENCH - CHEAT SHEET  │
├─────────────────────────────────────────┤
│                                         │
│  1. Open: crypto-forensics-mvp.html    │
│  2. Enter: your mnemonic with ???      │
│  3. Click: Start Recovery              │
│  4. Copy: the right mnemonic           │
│  5. Test: in your wallet app           │
│                                         │
│  Voice Commands:                        │
│  • "recover wallet"                    │
│  • "show history"                      │
│  • "help"                              │
│                                         │
│  Missing Words:                         │
│  • 1 word: ~5 seconds                  │
│  • 2 words: ~30 seconds                │
│  • 3 words: ~2 minutes                 │
│                                         │
│  Privacy: 100% local, no servers       │
│  Offline: Works after first load       │
│  History: Auto-saved locally           │
│                                         │
└─────────────────────────────────────────┘
```

---

## That's Everything!

You're ready to recover your wallet.

**Good luck!** 🍀

If you recover your funds, that's awesome! 🎉

If you have feedback, let me know what worked and what didn't.

---

**Now go get your crypto back!** 💰

# 🚀 Crypto Forensics Workbench - MVP Edition

## What This Is

A **single-file, zero-dependency** wallet recovery tool that Calvin can use **right now** without installing anything.

## How to Use (60 Seconds)

### Option 1: Double-Click (Easiest)
1. Find `crypto-forensics-mvp.html` in this folder
2. Double-click it
3. It opens in your browser
4. Start recovering wallets

### Option 2: Deploy Online (Share with Others)
```bash
# If you have Git installed
cd calvin_arsenal_v2
git init
git add crypto-forensics-mvp.html
git commit -m "MVP"
gh repo create crypto-forensics-mvp --public --source=. --push

# Then enable GitHub Pages in repo settings
# You'll get a URL like: https://yourusername.github.io/crypto-forensics-mvp/
```

## What It Does

### Core Feature: Wallet Recovery
- Enter a mnemonic phrase with `???` for missing words
- Example: `abandon abandon ??? abandon abandon about`
- Click "Start Recovery"
- Get all valid mnemonics
- Copy to clipboard

### Voice Control (3 Commands)
1. **"recover wallet"** - Focus on recovery input
2. **"show history"** - View past recoveries  
3. **"help"** - Show voice commands

### History
- Automatically saves your recovery attempts
- Stored locally (never leaves your computer)
- Click any history item to reload it

## Technical Details

### What's Inside
- **Pure HTML/CSS/JavaScript** - No build step
- **BIP39 from CDN** - Loads from jsdelivr.net
- **LocalStorage** - Saves history locally
- **Web Speech API** - Voice control (Chrome/Edge)
- **Zero backend** - Everything runs in browser

### Browser Support
- ✅ Chrome/Edge (full features including voice)
- ✅ Firefox (no voice control)
- ✅ Safari (no voice control)
- ✅ Any modern browser

### Privacy
- **Nothing is sent to any server**
- All processing happens in your browser
- History stored locally on your computer
- Works offline after first load

## Why This Approach?

Based on feedback in `mikeybiffedithere.md`, this MVP:

1. ✅ **Works immediately** - No Node.js, npm, or setup
2. ✅ **Single file** - Easy to share and deploy
3. ✅ **Focused** - One feature done well
4. ✅ **User-friendly** - Clear errors and help text
5. ✅ **Stateful** - Saves history with LocalStorage
6. ✅ **Voice control** - But simplified to 3 commands
7. ✅ **Deployable** - Can be hosted anywhere
8. ✅ **Private** - No backend, no data collection

## Next Steps

### To Deploy to Vercel (Free)
```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Deploy
cd calvin_arsenal_v2
vercel --prod

# You'll get a URL like: https://crypto-forensics-mvp.vercel.app
```

### To Deploy to Netlify (Free)
1. Drag `crypto-forensics-mvp.html` to https://app.netlify.com/drop
2. Done! You get a URL instantly

### To Share with Calvin
1. Send him the HTML file
2. Tell him to double-click it
3. That's it!

## Limitations (By Design)

- **Max 3 missing words** - More would take too long
- **Max 100 results** - Prevents browser freeze
- **English wordlist only** - BIP39 standard
- **No address derivation** - Coming in v2

## Future Enhancements (After Validation)

Only add these if users actually need them:

1. **Address derivation** - Generate addresses to verify recovery
2. **Multiple chains** - Bitcoin, Ethereum, etc.
3. **Export results** - CSV/JSON download
4. **Typo correction** - Fix common misspellings
5. **Batch processing** - Multiple recoveries at once

## Comparison: Old vs New

### Old Version (calvin_arsenal_v2)
- 60+ files
- Requires Node.js, npm, PostgreSQL, Redis
- 30+ minute setup
- 12 documentation files
- 150+ features
- **Calvin can't use it** ❌

### New Version (MVP)
- 1 file
- Requires: double-click
- 0 minute setup
- This README
- 1 feature (done well)
- **Calvin can use it right now** ✅

## Support

### Common Issues

**Q: Voice control doesn't work**
- A: Use Chrome or Edge. Firefox/Safari don't support Web Speech API.

**Q: Recovery is slow**
- A: More missing words = more combinations. 3 missing words can take a minute.

**Q: No results found**
- A: Double-check your known words. One wrong word = no results.

**Q: Can I use this offline?**
- A: Yes! After first load, it works offline (BIP39 library is cached).

### Need Help?

1. Check the help text in the tool (it's detailed)
2. Try the voice command "help"
3. Look at the example: `abandon abandon ??? abandon abandon about`

## License

MIT - Do whatever you want with it

## Credits

Built based on brutal honest feedback from `mikeybiffedithere.md`

**Key lesson:** Ship fast, validate early, iterate based on real usage.

---

**Remember:** This is an MVP. It does ONE thing well. Add features only after people actually use it and ask for them.

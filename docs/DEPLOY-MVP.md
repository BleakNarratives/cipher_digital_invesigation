# 🚀 Deploy the MVP (Choose Your Path)

## Path 1: Send to Calvin (Easiest - 30 seconds)

```bash
# Just send him the file
# He double-clicks it
# Done!
```

**Email template:**
```
Hey Calvin,

I built you a wallet recovery tool. 

1. Download the attached crypto-forensics-mvp.html
2. Double-click it
3. Enter your mnemonic with ??? for missing words
4. Click "Start Recovery"

That's it. No installation needed.

Let me know if you recover anything!
```

---

## Path 2: GitHub Pages (Free, 2 minutes)

### Step 1: Create Repo
```bash
cd calvin_arsenal_v2

# Initialize git if not already
git init

# Add the MVP file
git add crypto-forensics-mvp.html MVP-README.md

# Commit
git commit -m "MVP: Single-file wallet recovery tool"

# Create GitHub repo (requires GitHub CLI)
gh repo create crypto-forensics-mvp --public --source=. --push
```

### Step 2: Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: Deploy from branch
4. Branch: main, folder: / (root)
5. Save

### Step 3: Access
Your tool is now live at:
```
https://YOUR-USERNAME.github.io/crypto-forensics-mvp/crypto-forensics-mvp.html
```

**Share this URL with anyone!**

---

## Path 3: Vercel (Free, 1 minute)

### One-Time Setup
```bash
npm install -g vercel
```

### Deploy
```bash
cd calvin_arsenal_v2
vercel --prod
```

Follow prompts:
- Set up and deploy? **Y**
- Which scope? (your account)
- Link to existing project? **N**
- Project name? **crypto-forensics-mvp**
- Directory? **./crypto-forensics-mvp.html**
- Override settings? **N**

**Done!** You get a URL like:
```
https://crypto-forensics-mvp.vercel.app
```

---

## Path 4: Netlify Drop (Free, 30 seconds)

1. Go to https://app.netlify.com/drop
2. Drag `crypto-forensics-mvp.html` onto the page
3. Done!

You get a URL like:
```
https://random-name-123.netlify.app
```

---

## Path 5: Local Server (Testing)

### Python (if installed)
```bash
cd calvin_arsenal_v2
python -m http.server 8000
```

Open: http://localhost:8000/crypto-forensics-mvp.html

### Node.js (if installed)
```bash
cd calvin_arsenal_v2
npx serve
```

Open: http://localhost:3000/crypto-forensics-mvp.html

---

## Which Path Should You Choose?

### For Calvin (Private Use)
→ **Path 1: Send File** (easiest, most private)

### For Public Tool (Share with World)
→ **Path 2: GitHub Pages** (free, permanent, professional)

### For Quick Testing
→ **Path 4: Netlify Drop** (instant, no setup)

### For Production App
→ **Path 3: Vercel** (custom domain, analytics, fast)

---

## After Deployment

### Test It
1. Open the URL
2. Try example: `abandon abandon ??? abandon abandon about`
3. Should find valid mnemonics
4. Test voice commands (Chrome/Edge only)
5. Check history saves

### Share It
```
🔐 Crypto Forensics Workbench
Recover lost wallet mnemonics

Try it: [YOUR-URL]

Features:
✅ No installation required
✅ Works in browser
✅ Voice control
✅ Saves history locally
✅ 100% private (no backend)

Perfect for recovering wallets with 1-3 missing words!
```

### Monitor Usage (Optional)

If you want to see if people use it:

**Add Google Analytics** (optional):
```html
<!-- Add before </head> in crypto-forensics-mvp.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Add Plausible** (privacy-friendly):
```html
<!-- Add before </head> -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Custom Domain (Optional)

### Vercel
```bash
vercel domains add yourdomain.com
```

### Netlify
1. Site settings → Domain management
2. Add custom domain
3. Follow DNS instructions

### GitHub Pages
1. Add CNAME file with your domain
2. Update DNS records
3. Enable HTTPS in settings

---

## Troubleshooting

### "BIP39 not loading"
- Check internet connection (first load only)
- CDN might be blocked (use VPN)
- Try different browser

### "Voice not working"
- Use Chrome or Edge
- Allow microphone permission
- Check browser console for errors

### "Deployment failed"
- Check file name is correct
- Ensure HTML file is valid
- Try different deployment method

---

## Next Steps After Deployment

1. **Send to Calvin** - Get first user feedback
2. **Share on Twitter** - "Built a wallet recovery tool in 1 HTML file"
3. **Post on Reddit** - r/crypto, r/bitcoin (be helpful, not spammy)
4. **Wait for feedback** - Don't add features until people ask
5. **Iterate** - Fix pain points, add most-requested feature

---

## Success Metrics

### Week 1
- [ ] Calvin can open and use it
- [ ] Calvin recovers a wallet (or tries)
- [ ] Calvin gives feedback

### Week 2
- [ ] 10 people try it
- [ ] 3 people recover wallets
- [ ] 1 person asks for a feature

### Month 1
- [ ] 100 users
- [ ] 10 successful recoveries
- [ ] Clear feature requests
- [ ] Consider monetization

---

## Remember

**Don't add features until:**
1. People actually use it
2. People actually ask for it
3. People actually need it

**The goal:** Validate the problem before building more solutions.

---

**Now go deploy it and get real users!** 🚀

# 🔧 Manual Install Guide (If Script Fails)

## Install Git (5 minutes)

### Step 1: Download
Go to: https://git-scm.com/download/win

Click: **"64-bit Git for Windows Setup"**

### Step 2: Install
1. Run the downloaded `.exe` file
2. Click **Next** through all the screens (defaults are fine)
3. Click **Install**
4. Click **Finish**

### Step 3: Verify
Close and reopen PowerShell, then:
```powershell
git --version
```

Should show: `git version 2.43.0` (or similar)

---

## Install Node.js (5 minutes)

### Step 1: Download
Go to: https://nodejs.org

Click: **"LTS"** (left button - recommended)

### Step 2: Install
1. Run the downloaded `.msi` file
2. Click **Next** through all screens
3. ✅ Check "Automatically install necessary tools"
4. Click **Install**
5. Click **Finish**

### Step 3: Verify
Close and reopen PowerShell, then:
```powershell
node --version
npm --version
```

Should show versions like `v20.10.0` and `10.2.3`

---

## Deploy with Vercel (2 minutes)

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Deploy
```powershell
cd pwa
vercel --prod
```

### Step 3: Follow Prompts
- Login with GitHub/Email
- Confirm project settings
- Wait for deployment
- Get URL!

---

## Deploy with Git + GitHub Pages (10 minutes)

### Step 1: Create GitHub Account
Go to: https://github.com/signup

### Step 2: Create Repository
1. Go to: https://github.com/new
2. Name: `cipher`
3. Public
4. Don't initialize with README
5. Click **Create repository**

### Step 3: Push Code
```powershell
# In your project folder
git init
git add .
git commit -m "Initial commit: CIPHER v1.0"
git remote add origin https://github.com/YOUR_USERNAME/cipher.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings**
3. Click **Pages** (left sidebar)
4. Source: **main** branch
5. Folder: **/pwa**
6. Click **Save**
7. Wait 2 minutes
8. Your site: `https://YOUR_USERNAME.github.io/cipher/`

---

## Troubleshooting

### "git not found" after install
**Solution:** Close and reopen PowerShell

### "npm not found" after install
**Solution:** Close and reopen PowerShell

### "Permission denied" errors
**Solution:** Run PowerShell as Administrator
- Right-click PowerShell
- Click "Run as Administrator"

### Vercel login issues
**Solution:** Use GitHub login (easiest)

### GitHub push fails
**Solution:** 
```powershell
# Set up credentials
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Try again
git push -u origin main
```

---

## Still Having Issues?

### Option 1: Use Netlify Drop (No Installation!)
1. Go to: https://app.netlify.com/drop
2. Drag `pwa` folder
3. Done!

### Option 2: Use Vercel Web UI (No CLI!)
1. Go to: https://vercel.com/new
2. Upload `pwa` folder
3. Done!

### Option 3: Use GitHub Web UI (No Git!)
1. Create repo on GitHub
2. Click "uploading an existing file"
3. Drag files from `pwa` folder
4. Enable Pages in Settings
5. Done!

---

## The Easiest Way

**Seriously, just use Netlify Drop:**

1. https://app.netlify.com/drop
2. Drag folder
3. Get URL
4. Send to Calvin

**No installation. No terminal. No bullshit.**

Takes 2 minutes. Looks professional. Works perfectly.

**Stop fighting with installers and just deploy it!** 🚀

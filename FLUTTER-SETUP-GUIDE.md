# 📱 Flutter + FastAPI Setup Guide

## When to Use This

**ONLY after you:**
1. ✅ Deployed the PWA
2. ✅ Got 10+ users
3. ✅ Collected feedback
4. ✅ Validated people actually want this

**Don't build this if:**
- ❌ Nobody is using the PWA
- ❌ You haven't gotten feedback
- ❌ You're just chasing shiny tech

---

## Why Flutter + FastAPI?

### Flutter (Mobile App)
- Single codebase → Android + iOS + Web
- Native performance
- Beautiful UI
- Great for crypto (native libraries)
- Works in Termux

### FastAPI (Backend)
- Fast (async Python)
- Easy to learn
- Great for crypto operations
- Auto-generated docs
- Easy deployment

---

## Prerequisites

### For Flutter:
- Windows 10/11 (you have this ✅)
- 10GB free disk space
- Android Studio OR VS Code
- 2-3 hours for setup

### For FastAPI:
- Python 3.8+ (check: `python --version`)
- pip (comes with Python)
- 30 minutes for setup

---

## Part 1: Flutter Setup (Windows)

### Step 1: Install Flutter (30 minutes)

```powershell
# Download Flutter
# Go to: https://docs.flutter.dev/get-started/install/windows
# Download the ZIP file

# Extract to C:\src\flutter
# (Create C:\src folder first)

# Add to PATH
# Search Windows for "Environment Variables"
# Edit "Path" variable
# Add: C:\src\flutter\bin

# Restart PowerShell

# Verify
flutter doctor
```

### Step 2: Install Android Studio (30 minutes)

```powershell
# Download from: https://developer.android.com/studio
# Install with default settings
# Open Android Studio
# Go to: More Actions > SDK Manager
# Install: Android SDK, Android SDK Platform-Tools
```

### Step 3: Accept Licenses

```powershell
flutter doctor --android-licenses
# Type 'y' for all prompts
```

### Step 4: Create First App

```powershell
flutter create cipher_app
cd cipher_app
flutter run
```

If you see an app running, you're good!

---

## Part 2: FastAPI Setup (15 minutes)

### Step 1: Install Python

```powershell
# Download from: https://www.python.org/downloads/
# Run installer
# ✅ CHECK "Add Python to PATH"
# Click Install

# Verify
python --version
pip --version
```

### Step 2: Create FastAPI Project

```powershell
# Create folder
mkdir cipher-api
cd cipher-api

# Create virtual environment
python -m venv venv

# Activate it
.\venv\Scripts\activate

# Install FastAPI
pip install fastapi uvicorn web3 bip39 python-multipart

# Create main.py
```

### Step 3: Create main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CIPHER API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "CIPHER API v1.0", "status": "online"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Step 4: Run It

```powershell
python main.py
```

Open: http://localhost:8000
You should see: `{"message": "CIPHER API v1.0", "status": "online"}`

---

## Part 3: Build CIPHER Flutter App

### Step 1: Create Project Structure

```powershell
flutter create cipher_app
cd cipher_app
```

### Step 2: Add Dependencies

Edit `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  shared_preferences: ^2.2.2
  speech_to_text: ^6.5.1
  bip39: ^1.0.6
```

Then:
```powershell
flutter pub get
```

### Step 3: Create Main App

Edit `lib/main.dart`:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(CipherApp());
}

class CipherApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CIPHER',
      theme: ThemeData(
        primaryColor: Color(0xFF00D4FF),
        scaffoldBackgroundColor: Color(0xFF0A0E27),
        brightness: Brightness.dark,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('🔐 CIPHER'),
        backgroundColor: Color(0xFF00D4FF),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.lock,
              size: 100,
              color: Color(0xFF00D4FF),
            ),
            SizedBox(height: 20),
            Text(
              'Crypto Forensics Workbench',
              style: TextStyle(fontSize: 24, color: Colors.white),
            ),
            SizedBox(height: 40),
            ElevatedButton(
              onPressed: () {
                // Navigate to wallet recovery
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF00D4FF),
                padding: EdgeInsets.symmetric(horizontal: 40, vertical: 15),
              ),
              child: Text(
                'Recover Wallet',
                style: TextStyle(fontSize: 18, color: Colors.black),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Step 4: Run It

```powershell
flutter run
```

---

## Part 4: Connect Flutter to FastAPI

### In Flutter (lib/services/api_service.dart):

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://localhost:8000';
  
  static Future<Map<String, dynamic>> recoverWallet({
    required String mnemonic,
    required List<int> positions,
  }) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/v1/wallet/recover'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'mnemonic': mnemonic,
        'positions': positions,
      }),
    );
    
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to recover wallet');
    }
  }
}
```

### In FastAPI (add to main.py):

```python
from pydantic import BaseModel
from typing import List

class RecoveryRequest(BaseModel):
    mnemonic: str
    positions: List[int]

@app.post("/api/v1/wallet/recover")
async def recover_wallet(request: RecoveryRequest):
    # Your recovery logic here
    return {
        "success": True,
        "results": ["example mnemonic 1", "example mnemonic 2"]
    }
```

---

## Part 5: Build APK for Android

```powershell
flutter build apk --release
```

APK will be at: `build/app/outputs/flutter-apk/app-release.apk`

Copy to your phone and install!

---

## Part 6: Deploy FastAPI

### Option 1: Railway (Free)

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
```

### Option 2: Fly.io (Free)

```powershell
# Install Fly CLI
# Download from: https://fly.io/docs/hands-on/install-flyctl/

# Login
fly auth login

# Deploy
fly launch
```

---

## Termux Setup (Android)

### Install Termux
Download from F-Droid: https://f-droid.org/en/packages/com.termux/

### Install Flutter in Termux

```bash
pkg update
pkg install git wget curl unzip

# Install Flutter
git clone https://github.com/flutter/flutter.git
export PATH="$PATH:$HOME/flutter/bin"

# Build APK
flutter build apk --release
```

---

## Timeline

### Week 1: Setup
- Day 1-2: Install Flutter + Android Studio
- Day 3-4: Install FastAPI + Python
- Day 5: Create basic Flutter app
- Day 6-7: Create basic FastAPI backend

### Week 2: Build Core Features
- Day 1-2: Wallet recovery UI
- Day 3-4: Connect to FastAPI
- Day 5: Test on Android
- Day 6-7: Polish UI

### Week 3: Advanced Features
- Day 1-2: Voice control
- Day 3-4: Offline support
- Day 5: Add more tools
- Day 6-7: Testing

### Week 4: Deploy
- Day 1-2: Build APK
- Day 3-4: Deploy FastAPI
- Day 5: Test everything
- Day 6-7: Launch!

---

## Cost Breakdown

### Development:
- Flutter: FREE
- Android Studio: FREE
- Python: FREE
- FastAPI: FREE
- VS Code: FREE

### Deployment:
- Railway: FREE (500 hours/month)
- Fly.io: FREE (3 apps)
- Vercel: FREE (hobby tier)

### App Store:
- Google Play: $25 one-time
- Apple App Store: $99/year (if you want iOS)

**Total: $25-$124 first year**

---

## When to Actually Do This

### Do it if:
- ✅ 100+ people using PWA
- ✅ People asking for mobile app
- ✅ You have 3-4 weeks to dedicate
- ✅ You validated the concept

### Don't do it if:
- ❌ PWA has <10 users
- ❌ Nobody asked for mobile
- ❌ You haven't gotten feedback
- ❌ You're just bored

---

## My Honest Recommendation

**Don't do this yet.**

Here's why:
1. Your PWA works great
2. It's already mobile-friendly
3. You haven't validated demand
4. This is 3-4 weeks of work
5. You could spend that time getting users instead

**Do this instead:**
1. Deploy PWA (today)
2. Get 100 users (this month)
3. Collect feedback (ongoing)
4. See if people actually want a native app
5. THEN build Flutter version

**Remember the brutal feedback:**
> "You built 7 products when you needed 1 MVP"

Don't make the same mistake twice!

---

## But If You Insist...

If you really want to build it anyway:

1. Start with FastAPI backend (easier)
2. Get it working with PWA first
3. Then add Flutter frontend
4. Test on your phone
5. Share with Calvin
6. Get feedback
7. Iterate

**Timeline: 2-3 weeks**
**Cost: $0-25**
**Result: Native mobile app**

---

**Bottom line: Ship the PWA first. Build Flutter later if needed.** 🚀

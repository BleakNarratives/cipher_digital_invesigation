# Quick Install Script for Git and Node.js
# Run this in PowerShell as Administrator

Write-Host "🚀 Installing Git and Node.js..." -ForegroundColor Cyan

# Install Git
Write-Host "`n📦 Installing Git..." -ForegroundColor Yellow
try {
    winget install --id Git.Git --source winget --silent --accept-package-agreements --accept-source-agreements
    Write-Host "✅ Git installed!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Git install failed. Trying alternative method..." -ForegroundColor Yellow
    
    # Download Git installer
    $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe"
    $gitInstaller = "$env:TEMP\GitInstaller.exe"
    
    Write-Host "Downloading Git..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $gitUrl -OutFile $gitInstaller
    
    Write-Host "Installing Git..." -ForegroundColor Yellow
    Start-Process -FilePath $gitInstaller -Args "/VERYSILENT /NORESTART" -Wait
    
    Write-Host "✅ Git installed!" -ForegroundColor Green
}

# Install Node.js
Write-Host "`n📦 Installing Node.js..." -ForegroundColor Yellow
try {
    winget install --id OpenJS.NodeJS.LTS --source winget --silent --accept-package-agreements --accept-source-agreements
    Write-Host "✅ Node.js installed!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Node.js install failed. Trying alternative method..." -ForegroundColor Yellow
    
    # Download Node.js installer
    $nodeUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $nodeInstaller = "$env:TEMP\NodeInstaller.msi"
    
    Write-Host "Downloading Node.js..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller
    
    Write-Host "Installing Node.js..." -ForegroundColor Yellow
    Start-Process -FilePath "msiexec.exe" -Args "/i $nodeInstaller /quiet /norestart" -Wait
    
    Write-Host "✅ Node.js installed!" -ForegroundColor Green
}

Write-Host "`n🎉 Installation complete!" -ForegroundColor Green
Write-Host "`n⚠️ IMPORTANT: Close and reopen PowerShell for changes to take effect!" -ForegroundColor Yellow
Write-Host "`nThen run:" -ForegroundColor Cyan
Write-Host "  git --version" -ForegroundColor White
Write-Host "  node --version" -ForegroundColor White
Write-Host "`nTo verify installation." -ForegroundColor Cyan

Read-Host "`nPress Enter to exit"

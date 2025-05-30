# Resume Builder - Automated Fix and Run Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Resume Builder - Auto Fix & Run" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup and switch package.json
Write-Host "Step 1: Switching to stable package.json..." -ForegroundColor Yellow
try {
    Copy-Item package.json package-backup.json -ErrorAction Stop
    Copy-Item package-alternative.json package.json -ErrorAction Stop
    Write-Host "✅ Package.json switched to stable version" -ForegroundColor Green
} catch {
    Write-Host "❌ Error switching package.json: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Clean installation
Write-Host ""
Write-Host "Step 2: Cleaning old installations..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force server/node_modules -ErrorAction SilentlyContinue
Remove-Item server/package-lock.json -ErrorAction SilentlyContinue
Write-Host "✅ Old installations cleaned" -ForegroundColor Green

# Step 3: Clear npm cache
Write-Host ""
Write-Host "Step 3: Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✅ npm cache cleared" -ForegroundColor Green

# Step 4: Install frontend dependencies
Write-Host ""
Write-Host "Step 4: Installing frontend dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps --force
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    exit 1
}

# Step 5: Install backend dependencies
Write-Host ""
Write-Host "Step 5: Installing backend dependencies..." -ForegroundColor Yellow
Set-Location server
npm install --legacy-peer-deps --force
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Step 6: Verify installations
Write-Host ""
Write-Host "Step 6: Verifying installations..." -ForegroundColor Yellow
$frontendPackages = npm list react --depth=0 2>$null
$backendPackages = Set-Location server; npm list express --depth=0 2>$null; Set-Location ..

if ($frontendPackages -match "react") {
    Write-Host "✅ Frontend packages verified" -ForegroundColor Green
} else {
    Write-Host "⚠️  Frontend packages may have issues" -ForegroundColor Yellow
}

# Step 7: Start the application
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Starting Resume Builder App" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Frontend will start on: http://localhost:3000" -ForegroundColor Green
Write-Host "🚀 Backend will start on: http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host ""

# Start the application
npm run dev

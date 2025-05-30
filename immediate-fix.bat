@echo off
echo ========================================
echo    Immediate Fix - Use React Scripts 4.0.3
echo ========================================

echo Backend is working perfectly!
echo Switching to stable React Scripts version...

echo.
echo Step 1: Backup current package.json
copy package.json package-backup.json

echo.
echo Step 2: Use working package.json (React Scripts 4.0.3)
copy package-alternative.json package.json

echo.
echo Step 3: Clean install
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm cache clean --force

echo.
echo Step 4: Install with stable versions
npm install --legacy-peer-deps --force

echo.
echo Step 5: Start the application
echo Backend: http://localhost:5000 (Already working!)
echo Frontend: http://localhost:3000 (Starting now...)
echo.

npm run dev

pause

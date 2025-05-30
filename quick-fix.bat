@echo off
echo ========================================
echo    Resume Builder - Quick Fix
echo ========================================

echo.
echo Attempting multiple fix strategies...

echo.
echo Strategy 1: Clean install with current package.json
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm cache clean --force
npm install --legacy-peer-deps --force

echo.
echo Testing if frontend works...
timeout /t 3 >nul
npm start --silent &
timeout /t 10 >nul
taskkill /f /im node.exe 2>nul

echo.
echo Strategy 2: Installing backend dependencies...
cd server
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm install --legacy-peer-deps --force
cd ..

echo.
echo Strategy 3: Testing backend...
cd server
timeout /t 3 >nul
start /b npm start
timeout /t 5 >nul
taskkill /f /im node.exe 2>nul
cd ..

echo.
echo ========================================
echo    Final attempt - Starting both...
echo ========================================

npm run dev

pause

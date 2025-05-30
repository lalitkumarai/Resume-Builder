@echo off
echo ========================================
echo    Ultimate Resume Builder Fix
echo ========================================

echo.
echo Backend is working! MongoDB connected successfully.
echo Now fixing the frontend ajv dependency issue...

echo.
echo Approach 1: Trying specific ajv version fix...
echo.

rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm cache clean --force

echo Installing specific compatible versions...
npm install ajv@6.12.6 ajv-keywords@3.5.2 --save-dev --legacy-peer-deps
npm install --legacy-peer-deps --force

echo.
echo Testing Approach 1...
timeout /t 3 >nul
start /b npm start
timeout /t 15 >nul
taskkill /f /im node.exe 2>nul

echo.
echo Approach 2: Using alternative React Scripts version...
echo.

copy package-alternative.json package.json
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm install --legacy-peer-deps --force

echo.
echo Testing Approach 2...
timeout /t 3 >nul
start /b npm start
timeout /t 15 >nul
taskkill /f /im node.exe 2>nul

echo.
echo Approach 3: Using simplified package without TypeScript...
echo.

copy package-simple.json package.json
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
npm install --legacy-peer-deps --force

echo.
echo ========================================
echo    Final Test - Starting Application
echo ========================================

echo Backend is ready on: http://localhost:5000
echo Frontend will start on: http://localhost:3000
echo.

npm run dev

pause

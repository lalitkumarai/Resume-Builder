@echo off
echo ========================================
echo    Resume Builder - Complete Fix
echo ========================================

echo.
echo Step 1: Cleaning old installations...
if exist node_modules (
    echo Removing frontend node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing frontend package-lock.json...
    del package-lock.json
)
if exist server\node_modules (
    echo Removing backend node_modules...
    rmdir /s /q server\node_modules
)
if exist server\package-lock.json (
    echo Removing backend package-lock.json...
    del server\package-lock.json
)

echo.
echo Step 2: Clearing npm cache...
npm cache clean --force

echo.
echo Step 3: Installing frontend dependencies...
npm install --legacy-peer-deps --force

echo.
echo Step 4: Installing backend dependencies...
cd server
npm install --legacy-peer-deps --force
cd ..

echo.
echo Step 5: Verifying installations...
echo Frontend packages:
npm list --depth=0 2>nul | findstr "react"
echo.
echo Backend packages:
cd server
npm list --depth=0 2>nul | findstr "express"
cd ..

echo.
echo ========================================
echo    Starting the application...
echo ========================================
echo Frontend will start on: http://localhost:3000
echo Backend will start on: http://localhost:5000
echo.

npm run dev

pause

@echo off
title Resume Builder - Auto Start
color 0A

echo.
echo  ██████╗ ███████╗███████╗██╗   ██╗███╗   ███╗███████╗
echo  ██╔══██╗██╔════╝██╔════╝██║   ██║████╗ ████║██╔════╝
echo  ██████╔╝█████╗  ███████╗██║   ██║██╔████╔██║█████╗  
echo  ██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  
echo  ██║  ██║███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗
echo  ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
echo.
echo  ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗ 
echo  ██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗
echo  ██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝
echo  ██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗
echo  ██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║
echo  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝
echo.
echo ========================================
echo    Automated Setup and Launch
echo ========================================
echo.

echo [1/7] Backing up current configuration...
copy package.json package-backup.json >nul 2>&1

echo [2/7] Switching to stable package configuration...
copy package-alternative.json package.json >nul 2>&1

echo [3/7] Cleaning previous installations...
rmdir /s /q node_modules >nul 2>&1
del package-lock.json >nul 2>&1
rmdir /s /q server\node_modules >nul 2>&1
del server\package-lock.json >nul 2>&1

echo [4/7] Clearing npm cache...
npm cache clean --force >nul 2>&1

echo [5/7] Installing frontend dependencies...
npm install --legacy-peer-deps --force

echo [6/7] Installing backend dependencies...
cd server
npm install --legacy-peer-deps --force
cd ..

echo [7/7] Starting Resume Builder...
echo.
echo ========================================
echo    Application Starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop the application
echo.

npm run dev

pause

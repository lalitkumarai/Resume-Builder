@echo off
echo ========================================
echo    Fixing ajv-keywords Function Issue
echo ========================================

echo.
echo Step 1: Removing conflicting packages...
npm uninstall ajv ajv-keywords schema-utils webpack-dev-server 2>nul

echo.
echo Step 2: Clearing npm cache...
npm cache clean --force

echo.
echo Step 3: Installing exact compatible versions...
npm install ajv@6.12.6 --save-dev --legacy-peer-deps
npm install ajv-keywords@3.5.2 --save-dev --legacy-peer-deps
npm install schema-utils@2.7.1 --save-dev --legacy-peer-deps

echo.
echo Step 4: Reinstalling react-scripts with fixed dependencies...
npm install react-scripts@5.0.1 --legacy-peer-deps --force

echo.
echo Step 5: Installing remaining dependencies...
npm install --legacy-peer-deps --force

echo.
echo Step 6: Testing frontend...
echo Starting React development server...
npm start

pause

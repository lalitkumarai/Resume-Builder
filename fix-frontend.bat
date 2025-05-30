@echo off
echo ========================================
echo    Fixing Frontend ajv Issue
echo ========================================

echo.
echo Step 1: Removing problematic packages...
npm uninstall ajv ajv-keywords schema-utils 2>nul

echo.
echo Step 2: Clearing npm cache...
npm cache clean --force

echo.
echo Step 3: Installing specific ajv version...
npm install ajv@6.12.6 --legacy-peer-deps --save-dev

echo.
echo Step 4: Installing ajv-keywords compatible version...
npm install ajv-keywords@3.5.2 --legacy-peer-deps --save-dev

echo.
echo Step 5: Reinstalling react-scripts...
npm install react-scripts@5.0.1 --legacy-peer-deps --force

echo.
echo Step 6: Testing frontend start...
echo Starting React development server...
npm start

pause

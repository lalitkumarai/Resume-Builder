@echo off
echo ========================================
echo    Resume Builder - Auto Start
echo ========================================
echo.
echo Starting automated fix and run process...
echo.

powershell -ExecutionPolicy Bypass -File "auto-fix-and-run.ps1"

pause

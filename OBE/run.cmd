@echo off
cd /d "%~dp0"
echo Starting the furniture site dev server...
echo It will be available at http://127.0.0.1:5173
echo Press Ctrl+C to stop.
echo.
call npm run dev
pause

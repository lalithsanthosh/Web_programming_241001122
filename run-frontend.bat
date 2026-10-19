@echo off
title Starting Simple Portfolio Frontend...
echo ========================================================
echo  Starting React Portfolio Frontend...
echo ========================================================
echo.
cd /d "%~dp0frontend"
start http://localhost:5173
npm run dev
pause

@echo off
title Free Port 3306 for XAMPP
echo ==========================================================
echo  Freeing Port 3306 by Stopping Background MySQL80 Service
echo ==========================================================
echo.

:: Check for administrative rights
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrator privileges to stop MySQL80...
    powershell -Command "Start-Process cmd -ArgumentList '/c net stop MySQL80 & echo. & echo ============================================= & echo  SUCCESS! Port 3306 is now free for XAMPP! & echo ============================================= & echo. & pause' -Verb RunAs"
    exit /b
)

net stop MySQL80
echo.
echo =============================================
echo  SUCCESS! Port 3306 is now free for XAMPP!
echo =============================================
echo.
pause

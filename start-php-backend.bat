@echo off
title Starting PHP Backend...
echo ========================================================
echo  Starting PHP Backend Server on http://localhost:8000...
echo ========================================================
echo.
cd /d "%~dp0"

if exist "C:\xampp\php\php.exe" (
    echo Using XAMPP PHP...
    "C:\xampp\php\php.exe" -S localhost:8000 -t backend
) else (
    echo Using system PHP...
    php -S localhost:8000 -t backend
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] PHP was not found!
    echo Please make sure XAMPP is installed in C:\xampp or PHP is installed.
)
pause

@echo off
cd /d "%~dp0"
start "" cmd.exe /k "npm.cmd run dev -- --host 127.0.0.1 --port 5173"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:5173/personal-website/"

@echo off
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" node_modules\next\dist\bin\next dev -p 3000 > dev.stdout.log 2> dev.stderr.log

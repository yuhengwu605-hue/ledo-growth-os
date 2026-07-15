$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
& "C:\Program Files\nodejs\node.exe" "node_modules\next\dist\bin\next" dev -p 3000 *> (Join-Path $PSScriptRoot "dev.combined.log")

# pwsh-copilot

GitHub Copilot CLI compatibility shim for Windows PowerShell 5.1.

## Install

```bash
npm i -g pwsh-copilot
```

## Important

Don't install PowerShell 7 alongside this. The shim creates `pwsh.exe` and whichever comes first in PATH will be used.

## Verify

```bash
pwsh --version             # PowerShell 7.5.4
$PSVersionTable.PSVersion  # 5.1.x
```

## Uninstall

```bash
npm rm -g pwsh-copilot
Remove-Item "$env:APPDATA\npm\pwsh.exe" -ErrorAction SilentlyContinue # Remove leftover shim
```

## How it works

- Fakes `pwsh --version` → returns `PowerShell 7.5.4`
- Forwards everything else to PowerShell 5.1

MIT License © 2025 Mathias Lund-Hansen

# pwsh-copilot

Use GitHub Copilot CLI in PowerShell 5.1 on Windows.

## Install

```bash
npm i -g pwsh-copilot
```

## Verify

```bash
pwsh --version             # PowerShell 7.5.4 (shim output)
$PSVersionTable.PSVersion  # Actual PowerShell version
```

## Uninstall

```bash
npm rm -g pwsh-copilot
Remove-Item "$env:APPDATA\npm\pwsh.exe" -ErrorAction SilentlyContinue # Remove leftover shim
```

## How it works

* Installs GitHub Copilot CLI (`@github/copilot`)
* Fakes `pwsh --version` → prints `PowerShell 7.5.4`
* Forwards all other arguments to the system’s `powershell.exe`

MIT License © 2025 Mathias Lund-Hansen

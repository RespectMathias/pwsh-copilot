# pwsh-copilot

A simple compatibility tool that lets **GitHub Copilot CLI** run on **Windows PowerShell 5.1**.

---

## ⚠️ Important

Do **not** have PowerShell 7 installed at the same time.  
This shim adds its own `pwsh.exe`, and whichever comes first in your PATH will be used.

---

## 📦 Install

```bash
npm i pwsh-copilot
```

---

## ✅ Verify

```bash
pwsh --version
# PowerShell 7.5.4

pwsh -NoProfile -Command "$PSVersionTable.PSVersion"
# shows 5.1.x
```

If that works, Copilot CLI will run normally.

---

## 🧰 Uninstall

```bash
npm rm pwsh-copilot
```

---

## 🧩 What it does

* Fakes `pwsh --version` → returns `PowerShell 7.5.4`
* Forwards everything else to the real PowerShell 5.1

No system changes.
No dependencies.
Just works.

---

MIT License © 2025 Your Name

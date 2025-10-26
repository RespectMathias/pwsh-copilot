const { execSync } = require("child_process");
const { copyFileSync, mkdirSync, existsSync } = require("fs");
const { join } = require("path");

if (process.platform !== "win32") {
    console.log("[pwsh-copilot] Windows only; skipping.");
    process.exit(0);
}

function npmGlobalDir() {
    const prefix = process.env.npm_config_prefix;
    if (prefix) return prefix;

    try {
        return execSync("npm config get prefix", { encoding: "utf8" }).trim();
    } catch {
        return null;
    }
}

const npmDir = npmGlobalDir();
if (!npmDir) {
    console.error("[pwsh-copilot] Could not locate npm global directory.");
    process.exit(1);
}

const src = join(__dirname, "pwsh.exe");
const dst = join(npmDir, "pwsh.exe");

try {
    const existing = execSync("where pwsh.exe", { stdio: ["pipe", "pipe", "ignore"] })
        .toString()
        .split(/\r?\n/)[0]
        .trim();

    if (existsSync(existing) && !existing.startsWith(npmDir)) {
        console.log("[pwsh-copilot] Real PowerShell 7+ detected. Skipping shim installation.");
        process.exit(0);
    }
} catch {

}

try {
    if (!existsSync(src)) throw new Error("Bundled pwsh.exe missing");
    mkdirSync(npmDir, { recursive: true });
    copyFileSync(src, dst);
    console.log(`[pwsh-copilot] Installed pwsh.exe to ${dst}`);
} catch (e) {
    console.error("[pwsh-copilot] Installation failed:", e.message);
    process.exit(1);
}

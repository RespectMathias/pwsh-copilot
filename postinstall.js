const { execSync } = require("child_process");
const { copyFileSync, mkdirSync, existsSync } = require("fs");
const { join } = require("path");

if (process.platform !== "win32") {
    console.log("[pwsh-copilot] Windows only; skipping.");
    process.exit(0);
}

try {
    execSync("pwsh.exe --version", { stdio: "ignore" });
    console.log("[pwsh-copilot] Existing PowerShell 6+/7+ detected. Skipping shim installation.");
    process.exit(0);
} catch {

}

function npmBin() {
    try {
        return execSync("npm bin -g", { stdio: ["ignore", "pipe", "ignore"] })
            .toString()
            .trim();
    } catch {
        return null;
    }
}

const binDir = npmBin();
if (!binDir) {
    console.error("[pwsh-copilot] Could not locate npm global bin directory.");
    process.exit(1);
}

const src = join(__dirname, "pwsh.exe");
const dst = join(binDir, "pwsh.exe");

try {
    if (!existsSync(src)) throw new Error("Bundled pwsh.exe missing");
    mkdirSync(binDir, { recursive: true });
    copyFileSync(src, dst);
    console.log(`[pwsh-copilot] Installed in ${dst}`);
} catch (e) {
    console.error("[pwsh-copilot] Installation failed:", e.message);
    process.exit(1);
}

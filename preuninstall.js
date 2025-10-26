const { execSync } = require("child_process");
const { unlinkSync, existsSync } = require("fs");
const { join } = require("path");

if (process.platform !== "win32") {
    console.log("[pwsh-copilot] Windows only; skipping cleanup.");
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

const pwshExe = join(npmDir, "pwsh.exe");

try {
    if (existsSync(pwshExe)) {
        unlinkSync(pwshExe);
        console.log(`[pwsh-copilot] Removed pwsh.exe from ${npmDir}`);
    }
} catch (e) {
    console.error("[pwsh-copilot] Cleanup failed:", e.message);
}

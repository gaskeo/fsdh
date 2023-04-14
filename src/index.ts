import * as fs from "fs";
import {init} from "./commands/index.js";

async function version() {
    const packagePath = process.argv[1].replaceAll("\\", "/")
            .replaceAll("entry.js", "")
            .replaceAll("index.ts", "")
        + "/../package.json";
    const packageRaw = fs.readFileSync(packagePath).toString();
    const packageJson = JSON.parse(packageRaw);
    console.log(`version: ${packageJson["version"]}`);
}

async function main() {
    const args = process.argv;
    if (args.length <= 2) {
        return;
    }

    const command = args[2];

    if (["v", "V", "version", "Version", "--version", "-v", "-V"].includes(command)) return version();
    if (command === "init") return init();
}

main().catch((reason) => {
    console.log(`\nexit: ${reason?.message}`);
}).then(() => process.exit(0));

process.on('SIGINT', function () {
    process.exit();
});
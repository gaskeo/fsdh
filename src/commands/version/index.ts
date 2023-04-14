import fs from "fs";

async function version() {
    const packagePath = process.argv[1].replaceAll("\\", "/")
            .replaceAll("entry.js", "")
            .replaceAll("index.ts", "")
        + "/../package.json";
    const packageRaw = fs.readFileSync(packagePath).toString();
    const packageJson = JSON.parse(packageRaw);
    console.log(`version: ${packageJson["version"]}`);
}

export {version};
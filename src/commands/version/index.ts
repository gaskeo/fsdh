import fs from "fs";
import {getPath} from "../../utils/index.js";

async function version() {
    const packagePath = getPath() + "/package.json";
    const packageRaw = fs.readFileSync(packagePath).toString();
    const packageJson = JSON.parse(packageRaw);
    console.log(`version: ${packageJson["version"]}`);
}

export {version};
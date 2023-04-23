import fs from "fs";
import {getPath} from "../../utils/index";
import process from "process";

async function version() {
    const packagePath = getPath(process.argv[1]) + "/package.json";
    const packageRaw = fs.readFileSync(packagePath).toString();
    const packageJson = JSON.parse(packageRaw);
    console.log(`version: ${packageJson["version"]}`);
}

export {version};
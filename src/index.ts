import {checkbox} from "./ui/index.js";
import {vectorToValues} from "./utils/index.js";
import * as fs from "fs";
import {createDirs, dirs, selectDir} from "./files/index.js";

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




async function init() {
    const dir = await selectDir();
    console.log(`✅  Directory selected: ${dir}\n`);
    const selectedDirs = await checkbox({
        items: dirs,
        ctrlCErrorMessage: ":(",
        defaultSelected: true,
        title: "➕  Select necessary directories"
    });
    const statuses = await createDirs(
        {
            dirs: vectorToValues({
                    vector: selectedDirs, data: dirs
                }
            ).map(folder => `${dir}/${folder}`)
        }
    );
    const createdDirs = statuses.filter(status => status.created);
    console.log(`✅  Directory created:\n ${createdDirs.map(d => "\t" + d.dir).join("\n")}\n`);

}

main().catch((reason) => {
    console.log(`\nexit: ${reason?.message}`);
}).then(() => process.exit(0));

process.on('SIGINT', function () {
    process.exit();
});
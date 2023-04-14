import {checkbox, vectorToValues} from "./ui/checkbox.js";
import * as readline from "readline";

const dirs = [
    "pages",
    "layouts",
    "widgets",
    "features",
    "entities",
    "shared"
];

async function main() {
    const args = process.argv;
    if (args.length <= 2) {
        return;
    }

    const command = args[2];
    if (command === "init") {
        return init();
    }
}

async function selectDir() {
    return new Promise((resolve, reject) => {
        function handleDir(dir: string) {
            if (dir.trim() === "") {

                resolve(".");
            }
            resolve(dir);
        }

        const path = process.cwd().replaceAll("\\", "/");
        const dir = path.split("/")[path.split("/").length - 1];
        const handle = readline.createInterface({input: process.stdin, output: process.stdout});
        handle.question(`📁 Select directory (${dir}): `, answer => {
            handleDir(answer);
        });
        // prepare();
    });
}

async function init() {
    const dir = await selectDir();
    console.log(`\n✅  Directory selected: ${dir}\n`);
    const selectedDirs = await checkbox({
        items: dirs,
        ctrlCErrorMessage: ":(",
        defaultSelected: true,
        title: "➕  Select necessary directories"
    });
    console.log(vectorToValues({vector: selectedDirs, data: dirs}));
}

main().catch((reason) => {
    console.log(`\nexit: ${reason?.message}`);
}).then(() => process.exit(0));

process.on('SIGINT', function () {
    process.exit();
});
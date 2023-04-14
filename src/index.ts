import {checkbox, vectorToValues} from "./ui/checkbox.js";
import * as readline from "readline";
import * as fs from "fs";

const dirs = [
    "pages",
    "layouts",
    "widgets",
    "features",
    "entities",
    "shared"
];


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
    console.log(args);
    if (args.length <= 2) {
        return;
    }

    const command = args[2];

    if (["v", "V", "version", "Version", "--version", "-v", "-V"].includes(command)) return version();
    if (command === "init") return init();
}

async function selectDir() {
    return new Promise<string>((resolve) => {
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

interface CreateDir {
    dir: string;
}

function createDir({dir}: CreateDir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
        return true;
    }
    return false;
}

interface CreateDirectories {
    dirs: string[];
}

async function createDirectories({dirs}: CreateDirectories) {
    return new Promise<{ dir: string, created: boolean }[]>((resolve) => {
            const data = dirs.map(dir => {
                return {
                    dir: dir, created: createDir({dir})
                };
            });
            resolve(data);
        }
    );
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
    const statuses = await createDirectories(
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
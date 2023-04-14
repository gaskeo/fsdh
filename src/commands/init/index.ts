import {createDirs, fsdFolders, selectDir} from "../../files/index.js";
import {checkbox} from "../../ui/index.js";
import {vectorToValues} from "../../utils/index.js";

async function getWorkingDir() {
    return new Promise<string>(function (resolve) {
        selectDir().then(dir => {
            console.log(`✅  Directory selected: ${dir}\n`);
            resolve(dir);
        });
    });
}

async function getDirs() {
    return new Promise<string[]>(function (resolve, reject) {
        checkbox({
            items: fsdFolders,
            ctrlCErrorMessage: ":(",
            defaultSelected: true,
            title: "➕  Select necessary directories"
        }).then(selectedDirsVector => {
            const selectedDirs = vectorToValues({
                vector: selectedDirsVector, data: fsdFolders
            });
            resolve(selectedDirs);
        }).catch(e => {
            return reject(e);
        });
    });
}

async function generateDirs(folders: string[], workingDir: string) {
    const statuses = await createDirs(
        {
            dirs: folders.map(folder => `${workingDir}/${folder}`)
        }
    );
    const createdDirs = statuses.filter(status => status.created);
    console.log(`✅  Directory created:\n ${createdDirs.map(d => "\t" + d.dir).join("\n")}\n`);
}

async function init() {
    const workingDir = await getWorkingDir();
    const selectedDirs = await getDirs();
    await generateDirs(selectedDirs, workingDir);
}

export {init};
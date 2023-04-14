import {copy, createDirs, examplePaths, fsdFolders, FsdFolders, selectDir} from "../../files/index.js";
import {checkbox, radio} from "../../ui/index.js";
import {getPath, vectorToValues} from "../../utils/index.js";

async function getWorkingDir() {
    return new Promise<string>(function (resolve) {
        selectDir().then(dir => {
            console.log(`✅  Directory selected: ${dir}\n`);
            resolve(dir);
        });
    });
}

async function getDirs() {
    return new Promise<FsdFolders[]>(function (resolve, reject) {
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
        }).catch(e => reject(e));
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

async function getNeedExamples() {
    return new Promise<boolean>((resolve, reject) => {
        radio({
            title: "🧮 Add example components?",
            items: ["Yes", "No"],
            ctrlCErrorMessage: ":("
        }).then(index => resolve(index === 0)).catch(e => reject(e));
    });
}


async function addExamples(folders: FsdFolders[], workingDir: string) {
    return new Promise((resolve) => {
        const packagePath = getPath();
        folders.map(folder => {
            if (examplePaths.next[folder] !== undefined) {
                copy({
                    src: `${packagePath}/${examplePaths.next[folder]}`,
                    dest: `${workingDir}/${folder}`,
                    recursive: true
                });
            }
        });
        console.log("✅  Examples added");
        resolve(null);
    });
}

async function init() {
    const workingDir = await getWorkingDir();
    const selectedDirs = await getDirs();
    await generateDirs(selectedDirs, workingDir);
    const needExamples = await getNeedExamples();
    if (needExamples) await addExamples(selectedDirs, workingDir);
}

export {init};
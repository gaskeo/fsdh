import {createDir} from "./createDir.js";

interface CreateDirs {
    dirs: string[];
}

async function createDirs({dirs}: CreateDirs) {
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

export {createDirs};
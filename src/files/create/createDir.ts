import fs from "fs";

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

export {createDir};
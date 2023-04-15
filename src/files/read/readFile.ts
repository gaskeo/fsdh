import fs from "fs";

function readFile({path}: {path: string}) {
    return fs.readFileSync(path).toString();
}

export {readFile};
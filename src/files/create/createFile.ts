import fs from "fs";
import {createDir} from "./createDir.js";

interface CreateFile {
    path: string
    content: string
}

function createFile({path, content}: CreateFile) {
    const dir = path.split("/").slice(0, path.split("/").length - 1).join("/");
    createDir({dir: dir});
    fs.writeFileSync(path, content);
}

export {createFile};
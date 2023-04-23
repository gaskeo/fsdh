import fs from "fs";
import {createDir} from "./createDir";

interface CreateFile {
    path: string
    content: string
}

function createFile({path, content}: CreateFile) {
    const formattedPath = path
        .split("/")
        .filter(p => p)
        .join("/");
    const dir = formattedPath
        .split("/")
        .slice(0, formattedPath.split("/").length - 1)
        .join("/");

    createDir({dir: dir});
    fs.writeFileSync(formattedPath, content);
}

export {createFile};
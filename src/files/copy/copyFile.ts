import * as fs from "fs";

interface Copy {
    src: string
    dest: string
    recursive: boolean
}
function copy({src, dest, recursive}: Copy) {
    fs.cpSync(src, dest, {recursive});
}

export {copy};
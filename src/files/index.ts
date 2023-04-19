import {fsdFolders, FsdFolders, examplePaths} from "./consts";
import {selectDir} from "./select/selectDir";
import {createDirs} from "./create/createDirs";
import {createDir} from "./create/createDir";
import {createFile} from "./create/createFile";
import {copy} from "./copy/copyFile";
import {readFile} from "./read/readFile";

export {
    fsdFolders,

    examplePaths,
    selectDir,
    createDirs,
    createDir,
    createFile,
    copy,
    readFile
};

export type {FsdFolders};
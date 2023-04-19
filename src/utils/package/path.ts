function getPath(execPath: string) {
    return execPath.replace(/\\/g, "/")
        .replace("/bin/entry.js", "")
        .replace("/src/index.ts", "")
        .replace("/bin/fsdh", "/lib/node_modules/fsdh");
}

export {getPath};
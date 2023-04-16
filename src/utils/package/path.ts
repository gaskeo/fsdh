function getPath() {
    return process.argv[1].replaceAll("\\", "/")
        .replaceAll("/bin/entry.js", "")
        .replaceAll("/src/index.ts", "")
        .replaceAll("/bin/fsdh", "/lib/node_modules/fsdh");
}

export {getPath};
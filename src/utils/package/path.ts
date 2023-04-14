function getPath() {
    return process.argv[1].replaceAll("\\", "/")
            .replaceAll("/bin/entry.js", "")
            .replaceAll("/src/index.ts", "");
}

export {getPath};
import readline from "readline";

async function selectDir() {
    return new Promise<string>((resolve) => {
        function handleDir(dir: string) {
            if (dir.trim() === "") {

                resolve(".");
            }
            resolve(dir);
        }

        const path = process.cwd().replaceAll("\\", "/");
        const dir = path.split("/")[path.split("/").length - 1];
        const handle = readline.createInterface({input: process.stdin, output: process.stdout});
        handle.question(`📁 Select directory (${dir}): `, answer => {
            handleDir(answer);
        });
        // prepare();
    });
}

export {selectDir};
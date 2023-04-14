import readline from "readline";

interface Input {
    title?: string

}

async function input({title}: Input) {
    return new Promise<string>((resolve) => {
        function handleDir(answer: string) {
            resolve(answer);
        }

        const handle = readline.createInterface({input: process.stdin, output: process.stdout});
        handle.question(`${title}: `, answer => {
            handleDir(answer);
        });
    });
}

export {input};
import readline from "readline";

interface Input {
    title?: string;
    ctrlCErrorMessage?: string
}

async function input({title, ctrlCErrorMessage}: Input) {
    return new Promise<string>((resolve, reject) => {
        function handleDir(answer: string) {
            resolve(answer);
        }

        const handle = readline.createInterface({input: process.stdin, output: process.stdout});
        handle.on("close", () => reject(new Error(ctrlCErrorMessage)));
        handle.question(`${title}: `, answer => {
            handleDir(answer);
        });
    });
}

export {input};
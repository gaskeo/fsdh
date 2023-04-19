import {input} from "../../ui/index";

async function selectDir() {
    return new Promise<string>((resolve) => {
        const path = process.cwd().replace(/\\/g, "/");
        const dir = path.split("/")[path.split("/").length - 1];

        input({title: `+ Select directory (${dir})`}).then(selectedDir => {
            if (selectedDir.trim() === "") {

                resolve(".");
            }
            resolve(selectedDir);
        });
    });
}

export {selectDir};
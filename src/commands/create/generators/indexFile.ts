import {createFile, readFile} from "../../../files/index";
import {getPath} from "../../../utils/index";
import * as process from "process";

async function generateIndex(path: string, name: string) {
    return new Promise((resolve) => {
        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);
        const fileContent = readFile({
            path: `${getPath(process.argv[1])}/assets/next/componentTemplate/index.example`
        });

        const content = fileContent
            .replace(/{componentTemplate}/g, name)
            .replace(/{ComponentTemplate}/g, nameCapitalize);

        createFile({
            path: `${path}/index.tsx`, content: content
        });
        resolve(null);
    });
}
export {generateIndex};
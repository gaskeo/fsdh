import {createFile, readFile} from "../../../files/index.js";
import {getPath} from "../../../utils/index.js";

async function generateIndex(path: string, name: string) {
    return new Promise((resolve) => {
        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);
        const fileContent = readFile({
            path: `${getPath()}/assets/next/componentTemplate/index.example`
        });

        const content = fileContent
            .replaceAll("{componentTemplate}", name)
            .replaceAll("{ComponentTemplate}", nameCapitalize);

        createFile({
            path: `${path}/index.tsx`, content: content
        });
        resolve(null);
    });
}
export {generateIndex};
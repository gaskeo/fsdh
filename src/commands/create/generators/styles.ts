import {createFile, readFile} from "../../../files/index.js";
import {getPath} from "../../../utils/index.js";
import {Option} from "../consts.js";

async function generateStyles(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        if (!options.includes("scss") && !options.includes("css")) return resolve(null);

        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);

        const fileContent = readFile({
            path: `${getPath()}/assets/next/componentTemplate/styles/componentTemplate.module.example`
        });
        const scss = options.includes("scss") && !options.includes("styled-components");
        const content = fileContent
            .replaceAll("{componentTemplate}", name)
            .replaceAll("{ComponentTemplate}", nameCapitalize);

        createFile({
            path: `${path}/styles/${name}.module.${scss ? "scss" : "css"}`, content: content
        });
        resolve(null);
    });
}
export {generateStyles};
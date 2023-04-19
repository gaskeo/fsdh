import {createFile, readFile} from "../../../files/index";
import {getPath} from "../../../utils/index";
import {Option} from "../consts";
import process from "process";

async function generateStyles(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        if ((!options.includes("scss") && !options.includes("css"))
            || options.includes("styled-components")) return resolve(null);

        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);

        const fileContent = readFile({
            path: `${getPath(process.argv[1])}/assets/next/componentTemplate/styles/componentTemplate.module.example`
        });
        const scss = options.includes("scss") && !options.includes("styled-components");
        const content = fileContent
            .replace(/{componentTemplate}/g, name)
            .replace(/{ComponentTemplate}/g, nameCapitalize);

        createFile({
            path: `${path}/styles/${name}.module.${scss ? "scss" : "css"}`, content: content
        });
        resolve(null);
    });
}
export {generateStyles};
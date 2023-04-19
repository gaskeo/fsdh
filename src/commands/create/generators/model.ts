import {createFile, readFile} from "../../../files/index.js";
import {getPath} from "../../../utils/index.js";
import {Option} from "../consts.js";

async function generateModel(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        if (!options.includes("model")) return resolve(null);

        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);

        const fileContent = readFile({
            path: `${getPath(process.argv[1])}/assets/next/componentTemplate/model/componentTemplate.example`
        });

        const content = fileContent
            .replaceAll("{componentTemplate}", name)
            .replaceAll("{ComponentTemplate}", nameCapitalize);

        createFile({
            path: `${path}/model/${name}.ts`, content: content
        });
        resolve(null);
    });
}
export {generateModel};
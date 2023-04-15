import {createFile} from "../../../files/index.js";

async function generateIndex(path: string, name: string) {
    return new Promise((resolve) => {
        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);

        const content =
            `import ${nameCapitalize} from "./ui/${name}";\n\n` +
            `export default ${nameCapitalize};`;

        createFile({
            path: `${path}/index.ts`, content: content
        });
        resolve(null);
    });
}
export {generateIndex};
import {createFile, readFile} from "../../../files/index.js";
import {getPath} from "../../../utils/index.js";
import {Option} from "../consts.js";

const lines = {
    // lines from assets/next/componentTemplate/ui/componentTemplate.example
    default: [5, 6, 7, 8, 9, 14, 18, 23, 24],
    css: [1, 19, 20],
    scss: [2, 19, 20],
    styled: [3, 10, 11, 12, 13, 21, 22],
    model: [4, 15, 16, 17]
};

async function generateUI(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);
        const fileContent = readFile({
            path: `${getPath()}/assets/next/componentTemplate/ui/componentTemplate.example`
        });
        const needLines = lines.default;
        const css = options.includes("css") && !options.includes("scss") && !options.includes("styled-components");
        const scss = options.includes("scss") && !options.includes("styled-components");
        const styled = options.includes("styled-components");
        const model = options.includes("model");

        css && needLines.push(...lines.css);
        scss && needLines.push(...lines.scss);
        styled && needLines.push(...lines.styled);
        model && needLines.push(...lines.model);

        const content = fileContent
            .split("\n")
            .filter((_, index) => needLines.includes(index + 1))
            .join("\n")
            .replaceAll("{componentTemplate}", name)
            .replaceAll("{ComponentTemplate}", nameCapitalize);

        createFile({
            path: `${path}/ui/${name}.tsx`, content: content
        });
        resolve(null);
    });
}

export {generateUI};

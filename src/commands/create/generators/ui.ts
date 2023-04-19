import {createFile, readFile} from "../../../files/index";
import {getPath} from "../../../utils/index";
import {Option} from "../consts";
import process from "process";

const lines = {
    // lines from assets/next/componentTemplate/ui/componentTemplate.example
    default: [6, 7, 8, 9, 14, 18, 25, 26],
    css: [1, 5, 19, 20],
    scss: [2, 5, 19, 20],
    styled: [3, 5, 10, 11, 12, 13, 21, 22],
    withoutStyles: [23, 24],
    model: [4, 5, 15, 16, 17]
};

async function generateUI(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        const nameCapitalize = name.charAt(0).toUpperCase() + name.substring(1);
        const fileContent = readFile({
            path: `${getPath(process.argv[1])}/assets/next/componentTemplate/ui/componentTemplate.example`
        });
        const needLines = lines.default;
        const css = options.includes("css") && !options.includes("scss") && !options.includes("styled-components");
        const scss = options.includes("scss") && !options.includes("styled-components");
        const styled = options.includes("styled-components");
        const model = options.includes("model");

        css && needLines.push(...lines.css);
        scss && needLines.push(...lines.scss);
        styled && needLines.push(...lines.styled);
        !css && !scss && !styled && needLines.push(...lines.withoutStyles);
        model && needLines.push(...lines.model);

        const content = fileContent
            .split("\n")
            .filter((_, index) => needLines.includes(index + 1))
            .join("\n")
            .replace(/{componentTemplate}/g, name)
            .replace(/{ComponentTemplate}/g, nameCapitalize);

        createFile({
            path: `${path}/ui/${name}.tsx`, content: content
        });
        resolve(null);
    });
}

export {generateUI};

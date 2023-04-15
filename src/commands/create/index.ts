import {checkbox, input} from "../../ui/index.js";
import {getPath, vectorToValues, whiteAndGreen} from "../../utils/index.js";
import {createFile, readFile} from "../../files/index.js";

async function getComponentPath() {
    return new Promise<{ fullPath: string, name: string }>(resolve => {
        input({
            title: "🖊️Select path (widgets/name, for example)"
        }).then(value => {
            const split = value.replaceAll("\\", "/").split("/");
            const name = split[split.length - 1];
            console.log(`✅  Component ${whiteAndGreen(name)} will be created in path ${whiteAndGreen(split.slice(0, split.length - 1).join("/") || ".")}\n`);
            resolve({fullPath: value, name: name});
        });
    });
}

type Option = "model" | "css" | "styled-components" | "scss"

async function getOptions() {
    return new Promise<Option[]>((resolve, reject) => {
        const items: Option[] = ["model", "css", "styled-components", "scss"];
        checkbox({
            title: "📚 Select necessary options:",
            items: items,
            defaultSelected: [1, 0, 0, 1, 0],
            ctrlCErrorMessage: ":("
        }).then(value => {
            const selectedOptions = vectorToValues({vector: value, data: items});
            resolve(selectedOptions);
        }).catch(e => reject(e));
    });
}

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
const lines = {
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

async function generateFiles(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        Promise.all([
            generateIndex(path, name),
            generateUI(path, name, options)
        ]).then(() => resolve(null));
    });
}

async function create() {
    const {name, fullPath} = await getComponentPath();
    const options = await getOptions();
    await generateFiles(fullPath, name, options);
}

export {create};

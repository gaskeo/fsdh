import {checkbox, input} from "../../ui/index.js";
import {vectorToValues, whiteAndGreen} from "../../utils/index.js";
import {Option, options} from "./consts.js";
import {generateIndex, generateModel, generateStyles, generateUI} from "./generators/index.js";

async function getComponentPath() {
    return new Promise<{ fullPath: string, name: string }>(resolve => {
        input({
            title: "📁 Select path (widgets/name, for example)"
        }).then(value => {
            const split = value.replaceAll("\\", "/").split("/");
            const name = split[split.length - 1];
            console.log(`✅  Component ${whiteAndGreen(name)} will be created in path ${whiteAndGreen(split.slice(0, split.length - 1).join("/") || ".")}\n`);
            resolve({fullPath: value, name: name});
        });
    });
}


async function getOptions() {
    return new Promise<Option[]>((resolve, reject) => {
        const items: Option[] = options;
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



async function generateFiles(path: string, name: string, options: Option[]) {
    return new Promise((resolve) => {
        Promise.all([
            generateIndex(path, name),
            generateUI(path, name, options),
            generateStyles(path, name, options),
            generateModel(path, name, options)
        ]).then(() => {
            console.log(`✅ component ${whiteAndGreen(name)} created`);
            resolve(null);
        });
    });
}

async function create() {
    const {name, fullPath} = await getComponentPath();
    const options = await getOptions();
    await generateFiles(fullPath, name, options);
}

export {create};

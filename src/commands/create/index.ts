import {checkbox, input} from "../../ui/index";
import {vectorToValues, whiteAndGreen} from "../../utils/index";
import {Option, options} from "./consts";
import {generateIndex, generateModel, generateStyles, generateUI} from "./generators/index";
import {getParams} from "./args";

async function getComponentPath() {
    return new Promise<{ fullPath: string, name: string }>(resolve => {
        input({
            title: "+ Select path (widgets/name, for example)"
        }).then(value => {
            const split = value.replace(/\\/g, "/").split("/");
            const name = split[split.length - 1];
            resolve({fullPath: value, name: name});
        });
    });
}


async function getOptions() {
    return new Promise<Option[]>((resolve, reject) => {
        const items: Option[] = options;
        checkbox({
            title: "+ Select necessary options:",
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
            console.log(`✓ Component ${whiteAndGreen(name)} created`);
            resolve(null);
        });
    });
}

async function create() {
    const params = getParams();
    let name, fullPath, options;

    if (params.nameProvided && params.name) {
        ({name, fullPath} = params.name);
    } else {
        ({name, fullPath} = await getComponentPath());
    }
    console.log(`✓ Component ${whiteAndGreen(name)} ` +
        "will be created in path " +
        `${whiteAndGreen(fullPath.split("/").slice(0, fullPath.split("/").length - 1).join("/") || ".")}\n`
    );

    if (params.optionsProvided && params.options) {
        options = params.options;
    } else {
        options = await getOptions();
    }
    await generateFiles(fullPath, name, options);
}

export {create};

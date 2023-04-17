import {Option} from "./consts.js";

interface NameArg {
    name: string;
    fullPath: string;
}

interface CreateArg {
    nameProvided: boolean;
    name?: NameArg;
    optionsProvided: boolean;
    options?: Option[];
}

export function getParams(): CreateArg {
    const args = process.argv;
    if (args.length <= 3) {
        return {nameProvided: false, optionsProvided: false};
    }

    if (args.length >= 4) {
        const split = args[3].replaceAll("\\", "/").split("/");
        const name = split[split.length - 1];
        if (args.length === 4) {
            return {
                nameProvided: true,
                name: {
                    name: name,
                    fullPath: args[3]
                },
                optionsProvided: false
            };
        } else {
            const options: Option[] = [];
            const optionsRaw = args[4];
            if (optionsRaw.includes("m")) {
                options.push("model");
            }
            if (optionsRaw.includes("sc")) options.push("styled-components");
            else {
                if (optionsRaw.includes("s")) options.push("scss");
                else if (optionsRaw.includes("c")) options.push("css");
            }

            return {
                nameProvided: true,
                name: {
                    name: name,
                    fullPath: args[3]
                },
                optionsProvided: true,
                options: options
            };
        }
    }
    return {nameProvided: false, optionsProvided: false};
}

import {describe, test, jest, afterEach, expect} from "@jest/globals";
import {create} from "../../../commands";
import {generateReadline} from "../../ui/inputs/readline.mock";
import readline from "readline";
import {buttons} from "../../../ui/inputs/shared";
import {generateStdin} from "../../ui/inputs/shared.mock";
import process from "process";
import fs from "fs";

jest.useFakeTimers();

describe("create", () => {
    let spyReadline: jest.SpiedFunction<{
        (input: NodeJS.ReadableStream,
         output?: NodeJS.WritableStream | undefined,
         completer?: readline.Completer | readline.AsyncCompleter | undefined,
         terminal?: boolean | undefined):
            readline.Interface; (options: readline.ReadLineOptions): readline.Interface; }>;

    let spyStdin: jest.SpiedFunction<{(event: "timeout", listener: (...args: string[]) => void): (NodeJS.ReadStream & {fd: 0})}>;

    test("default", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/ppp";

        const generatedSpy = generateReadline(dir);
        spyStdin = generateStdin([buttons.enter]);
        spyReadline = generatedSpy.spy;
        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/ppp.tsx").isFile()).toBeTruthy();


        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/bbb";

        const generatedSpy = generateReadline(dir);
        spyStdin = generateStdin([buttons.space, buttons.enter]);
        spyReadline = generatedSpy.spy;
        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/bbb.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/bbb.ts").isFile()).toBeTruthy();


        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and css", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/ccc";

        const generatedSpy = generateReadline(dir);
        spyStdin = generateStdin([buttons.space, buttons.downButton, buttons.space, buttons.enter]);
        spyReadline = generatedSpy.spy;
        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/ccc.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/ccc.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/styles/ccc.module.css").isFile()).toBeTruthy();


        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and scss", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/ddd";

        const generatedSpy = generateReadline(dir);
        spyStdin = generateStdin([buttons.space, buttons.downButton, buttons.downButton, buttons.downButton, buttons.space, buttons.enter]);
        spyReadline = generatedSpy.spy;
        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/ddd.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/ddd.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/styles/ddd.module.scss").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/ddd.module.css")).toBeFalsy();


        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and css+scss", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/eee";

        const generatedSpy = generateReadline(dir);
        spyStdin = generateStdin([
            buttons.space,      // select model
            buttons.downButton, // to css
            buttons.space,      // select css
            buttons.downButton, // to scss 1
            buttons.downButton, // to scss 2
            buttons.space,      // select scss
            buttons.enter
        ]);
        spyReadline = generatedSpy.spy;
        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/eee.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/eee.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/styles/eee.module.scss").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/eee.module.css")).toBeFalsy();


        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and styled+css+scss", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/fff";

        const generatedSpy = generateReadline(dir);
        spyStdin = generateStdin([
            buttons.space,      // select model
            buttons.downButton, // to css
            buttons.space,      // select css
            buttons.downButton, // to styled
            buttons.space,      // select styled
            buttons.downButton, // to scss 2
            buttons.space,      // select scss
            buttons.enter
        ]);
        spyReadline = generatedSpy.spy;
        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/fff.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/fff.ts").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/fff.module.scss")).toBeFalsy();
        expect(fs.existsSync(dir + "/styles/fff.module.css")).toBeFalsy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and css+scss via params", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/ggg";

        process.argv = [...process.argv.slice(0, 3), dir, "mcs"];

        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/ggg.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/ggg.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/styles/ggg.module.scss").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/ggg.module.css")).toBeFalsy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and css via params", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/ggg";

        process.argv = [...process.argv.slice(0, 3), dir, "mc"];

        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/ggg.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/ggg.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/styles/ggg.module.css").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/ggg.module.scss")).toBeFalsy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with model and styled+css+scss via params", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/zzz";

        process.argv = [...process.argv.slice(0, 3), dir, "msccs"];

        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/zzz.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/zzz.ts").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/zzz.module.scss")).toBeFalsy();
        expect(fs.existsSync(dir + "/styles/zzz.module.css")).toBeFalsy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with name via params", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/hhh";

        process.argv = [...process.argv.slice(0, 3), dir];
        // console.error(process.argv.length);

        spyStdin = generateStdin([
            buttons.space,      // select model
            buttons.downButton, // to css
            buttons.space,      // select css
            buttons.downButton, // to styled
            buttons.space,      // select styled
            buttons.downButton, // to scss 2
            buttons.space,      // select scss
            buttons.enter
        ]);

        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/hhh.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/model/hhh.ts").isFile()).toBeTruthy();
        expect(fs.existsSync(dir + "/styles/hhh.module.scss")).toBeFalsy();
        expect(fs.existsSync(dir + "/styles/hhh.module.css")).toBeFalsy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("with too many parameters", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/aaa/ppp";

        const generatedSpy = generateReadline(dir);
        spyReadline = generatedSpy.spy;
        process.argv = [...process.argv.slice(0, 3), dir, "b", "c"];

        await create();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/index.tsx").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/ui/ppp.tsx").isFile()).toBeTruthy();


        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    afterEach(() => {
        spyReadline.mockClear();
        spyStdin.mockClear();
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });

    });
});

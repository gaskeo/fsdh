import {describe, test, jest, afterEach, expect} from "@jest/globals";
import {init} from "../../../commands";
import {generateReadline} from "../../ui/inputs/readline.mock";
import readline from "readline";
import {buttons} from "../../../ui/inputs/shared";
import {generateStdinOnce} from "../../ui/inputs/shared.mock";
import process from "process";
import fs from "fs";

jest.useFakeTimers();

describe("init", () => {
    let spyReadline: jest.SpiedFunction<{
        (input: NodeJS.ReadableStream,
         output?: NodeJS.WritableStream | undefined,
         completer?: readline.Completer | readline.AsyncCompleter | undefined,
         terminal?: boolean | undefined):
            readline.Interface; (options: readline.ReadLineOptions): readline.Interface; }>;

    let spyStdin: jest.SpiedFunction<{(event: "timeout", listener: (...args: string[]) => void): (NodeJS.ReadStream & {fd: 0})}>[] = [];

    test("default", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/ppp";

        const generatedSpy = generateReadline(dir);
        spyStdin.push(generateStdinOnce([buttons.enter]));
        spyStdin.push(generateStdinOnce([buttons.enter]));
        spyReadline = generatedSpy.spy;
        await init();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.lstatSync(dir + "/app/hocs/exampleHoc/index.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/entities/exampleEntity/index.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/features/exampleFeature/index.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/layouts/exampleLayout/index.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/pages/examplePage/index.ts").isFile()).toBeTruthy();
        expect(fs.lstatSync(dir + "/shared/ui/exampleComponent/index.ts").isFile()).toBeTruthy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    test("without examples", async () => {
        process.argv[1] = process.cwd();
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        const dir = "src/__tests__/.files/ppp";

        const generatedSpy = generateReadline(dir);
        spyStdin.push(generateStdinOnce([buttons.enter]));
        spyStdin.push(generateStdinOnce([buttons.downButton, buttons.space, buttons.enter]));
        spyReadline = generatedSpy.spy;
        await init();

        expect(fs.lstatSync(dir).isDirectory()).toBeTruthy();
        expect(fs.existsSync(dir + "/app/hocs/exampleHoc/index.ts")).toBeFalsy();
        expect(fs.existsSync(dir + "/entities/exampleEntity/index.ts")).toBeFalsy();
        expect(fs.existsSync(dir + "/features/exampleFeature/index.ts")).toBeFalsy();
        expect(fs.existsSync(dir + "/layouts/exampleLayout/index.ts")).toBeFalsy();
        expect(fs.existsSync(dir + "/pages/examplePage/index.ts")).toBeFalsy();
        expect(fs.existsSync(dir + "/shared/ui/exampleComponent/index.ts")).toBeFalsy();

        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });

    afterEach(() => {
        spyReadline && spyReadline.mockClear();
        spyStdin.map(spy => spy.mockClear());
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });

    });
});

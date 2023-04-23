import {afterEach, describe, expect, jest, test} from "@jest/globals";
import readline from "readline";
import {selectDir} from "../../../files";
import {generateReadline} from "../../ui/inputs/readline.mock";

jest.useFakeTimers();


describe("select dir", () => {
    let spyReadline: jest.SpiedFunction<(...args: Parameters<{
        (input: NodeJS.ReadableStream, output?: NodeJS.WritableStream, completer?:
            (readline.Completer | readline.AsyncCompleter), terminal?: boolean): readline.Interface;
        (options: readline.ReadLineOptions): readline.Interface
    }>) => ReturnType<{
        (input: NodeJS.ReadableStream, output?: NodeJS.WritableStream, completer?:
            (readline.Completer | readline.AsyncCompleter), terminal?: boolean): readline.Interface;
        (options: readline.ReadLineOptions): readline.Interface
    }>>;

    test("select .", async () => {
        const generatedSpy = generateReadline("");
        spyReadline = generatedSpy.spy;
        await expect(selectDir()).resolves.toEqual(".");
        return new Promise((resolve) => resolve(null));
    });

    test("select windows", async () => {
        const generatedSpy = generateReadline("a\\b\\c");
        spyReadline = generatedSpy.spy;
        await expect(selectDir()).resolves.toEqual("a/b/c");
        return new Promise((resolve) => resolve(null));
    });

    test("select linux", async () => {
        const generatedSpy = generateReadline("a/b/c");
        spyReadline = generatedSpy.spy;
        await expect(selectDir()).resolves.toEqual("a/b/c");
        return new Promise((resolve) => resolve(null));
    });


    test("select windows absolute", async () => {
        const generatedSpy = generateReadline("C:\\a\\b\\c");
        spyReadline = generatedSpy.spy;
        await expect(selectDir()).resolves.toEqual("C:/a/b/c");
        return new Promise((resolve) => resolve(null));
    });

    test("select linux absolute", async () => {
        const generatedSpy = generateReadline("/a/b/c");
        spyReadline = generatedSpy.spy;
        await expect(selectDir()).resolves.toEqual("/a/b/c");
        return new Promise((resolve) => resolve(null));
    });

    test("reject", async () => {
        const generatedSpy = generateReadline("", true);
        spyReadline = generatedSpy.spy;
        await expect(selectDir()).rejects.toThrow(new Error(""));
        return new Promise((resolve) => resolve(null));
    });

    afterEach(async () => spyReadline.mockClear());
});

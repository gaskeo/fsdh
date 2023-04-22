import {afterEach, describe, expect, jest, test} from "@jest/globals";
import {input} from "../../../ui";
import readline from "readline";

jest.useFakeTimers();

function generateReadline(onQuestion: string, close?: undefined | true) {
    const spyReadline = jest.spyOn(readline, "createInterface").mockImplementation(
        (options: readline.ReadLineOptions): readline.Interface => {
            return {
                options,
                on: (event: string, listener: () => void): readline.Interface => {
                    if (event === "close" && close) {
                        listener();
                    }
                    return {} as readline.Interface;
                },
                question: (_query: string, callback: (answer: string) => void) => {
                    callback(onQuestion);
                }
            } as unknown as readline.Interface;
        }
    );
    return {spy: spyReadline};
}

describe("input", () => {
    let spyReadline: jest.SpiedFunction<(...args: Parameters<{
        (input: NodeJS.ReadableStream, output?: NodeJS.WritableStream, completer?:
            (readline.Completer | readline.AsyncCompleter), terminal?: boolean): readline.Interface;
        (options: readline.ReadLineOptions): readline.Interface
    }>) => ReturnType<{
        (input: NodeJS.ReadableStream, output?: NodeJS.WritableStream, completer?:
            (readline.Completer | readline.AsyncCompleter), terminal?: boolean): readline.Interface;
        (options: readline.ReadLineOptions): readline.Interface
    }>>;

    test("none", async () => {
        const generatedSpy = generateReadline("");
        spyReadline = generatedSpy.spy;
        await expect(
            input({
                title: "",
            })).resolves.toEqual("");
        return new Promise((resolve) => resolve(null));
    });

    test("test input", async () => {
        const generatedSpy = generateReadline("test");
        spyReadline = generatedSpy.spy;
        await expect(
            input({
                title: "",
            })).resolves.toEqual("test");
        return new Promise((resolve) => resolve(null));
    });

    test("trim", async () => {
        const generatedSpy = generateReadline("   test    ");
        spyReadline = generatedSpy.spy;
        await expect(
            input({
                title: "",
            })).resolves.toEqual("   test    ");
        return new Promise((resolve) => resolve(null));
    });

    test("reject", async () => {
        const generatedSpy = generateReadline("t", true);
        spyReadline = generatedSpy.spy;
        await expect(
            input({
                title: "",
                ctrlCErrorMessage: "test"
            })).rejects.toThrow(new Error("test"));

        return new Promise((resolve) => resolve(null));
    });

    afterEach(async () => spyReadline.mockClear());
});

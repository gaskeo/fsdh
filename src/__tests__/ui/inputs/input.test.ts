import {afterEach, describe, expect, jest, test} from "@jest/globals";
import {input} from "../../../ui";
import readline from "readline";
import {generateReadline} from "./readline.mock";

jest.useFakeTimers();

describe("input", () => {
    let spyReadline: jest.SpiedFunction<(...args: Parameters<readline.Interface>) =>
        ReturnType<{ (options: readline.ReadLineOptions): readline.Interface }>>;

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

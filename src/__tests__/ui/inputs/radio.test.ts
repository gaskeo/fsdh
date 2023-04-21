import {afterEach, describe, expect, jest, test} from "@jest/globals";
import {generateStdin} from "./shared";
import {buttons} from "../../../ui/inputs/shared";
import {radio} from "../../../ui";

jest.useFakeTimers();

describe("select", () => {
    let spyStdin: jest.SpiedFunction<{(event: "timeout", listener: (...args: string[]) => void): (NodeJS.ReadStream & {fd: 0})}>;

    test("one option", async () => {
        spyStdin = generateStdin([buttons.enter]);
        const selected = await radio({items: ["item1"]});
        expect(selected).toStrictEqual(0);
        return new Promise((resolve) => resolve(null));
    });

    test("many options", async () => {
        spyStdin = generateStdin([buttons.enter]);
        const selected = await radio({items: ["1", "2", "3"]});
        expect(selected).toStrictEqual(0);
        return new Promise((resolve) => resolve(null));
    });

    test("up up up", async () => {
        spyStdin = generateStdin([
            buttons.upButton,
            buttons.upButton,
            buttons.upButton,
            buttons.space,
            buttons.enter]);
        const selected = await radio({items: ["1", "2", "3"]});
        expect(selected).toStrictEqual(0);
        return new Promise((resolve) => resolve(null));
    });

    test("up down down down up select", async () => {
        spyStdin = generateStdin([
            buttons.upButton,
            buttons.downButton,
            buttons.downButton,
            buttons.downButton,
            buttons.upButton,
            buttons.space,
            buttons.enter]);
        const selected = await radio({items: ["1", "2", "3"]});
        expect(selected).toStrictEqual(1);
        return new Promise((resolve) => resolve(null));
    });

    test("default selected < 0", async () => {
        spyStdin = generateStdin([
            buttons.upButton,
            buttons.downButton,
            buttons.downButton,
            buttons.downButton,
            buttons.upButton,
            buttons.space,
            buttons.enter]);
        const selected = await radio({
            defaultSelected: -5,
            items: ["1", "2", "3"]
        });
        expect(selected).toStrictEqual(1);
        return new Promise((resolve) => resolve(null));
    });

    test("default selected > length", async () => {
        spyStdin = generateStdin([
            buttons.upButton,
            buttons.downButton,
            buttons.downButton,
            buttons.downButton,
            buttons.upButton,
            buttons.space,
            buttons.enter]);
        const selected = await radio({
            defaultSelected: 5,
            items: ["1", "2", "3"]
        });
        expect(selected).toStrictEqual(1);
        return new Promise((resolve) => resolve(null));
    });

    test("default selected last option", async () => {
        spyStdin = generateStdin([
            buttons.upButton,
            buttons.downButton,
            buttons.enter]);
        const selected = await radio({
            defaultSelected: 2,
            items: ["1", "2", "3"]
        });
        expect(selected).toStrictEqual(2);
        return new Promise((resolve) => resolve(null));
    });

    test("reject", async () => {
        spyStdin = generateStdin(
            [buttons.exit]
        );
        await expect(
            radio({
                items: ["1", "2", "3"],
                ctrlCErrorMessage: "test"
            })).rejects.toThrow(new Error("test"));

        return new Promise((resolve) => resolve(null));
    });

    afterEach(async () => spyStdin.mockClear());
});

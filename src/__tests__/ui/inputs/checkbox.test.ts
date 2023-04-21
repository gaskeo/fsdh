import {describe, expect, test, jest, afterEach} from "@jest/globals";
import {checkbox} from "../../../ui";
import {buttons} from "../../../ui/inputs/shared";
import * as process from "process";

jest.useFakeTimers();

jest.mock("../../../ui/inputs/shared", () => {
    const originalModule: any = jest.requireActual("../../../ui/inputs/shared");

    return {
        __esModule: true,
        ...originalModule,
        clean: () => undefined
    };
});


jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

jest.spyOn(process.stdin, 'setRawMode').mockImplementation(() => ({
    resume: () => ({} as typeof process.stdin)
} as typeof process.stdin));

jest.spyOn(process.stdin, "resume").mockImplementation(() => ({} as typeof process.stdin));

type ValueOf<T> = T[keyof T]

function generateStdin(pressedButtons: ValueOf<typeof buttons>[]) {
    return jest.spyOn(process.stdin, 'on').mockImplementation(
        (type: string, listener: (data: Buffer) => void): (typeof process.stdin) => {
            if (type !== "data") {
                return {} as typeof process.stdin;
            }
            pressedButtons.map((button) => {
                listener({
                    toString: () => button
                } as Buffer);
            });
            return {} as typeof process.stdin;
        });
}

jest.spyOn(process.stdout, 'write').mockImplementation(() => true);


describe("checkbox", () => {
    let spyStdin: jest.SpiedFunction<{(event: "timeout", listener: (...args: any[]) => void): (NodeJS.ReadStream & {fd: 0})}>;
    test("one option", async () => {
        spyStdin = generateStdin([buttons.enter]);
        const selected = await checkbox({items: ["item1"]});
        expect(selected).toStrictEqual([0]);
        return new Promise((resolve) => resolve(null));
    });

    test("unselect all", async () => {
        spyStdin = generateStdin([buttons.enter]);
        const selected = await checkbox({items: ["1", "2", "3"]});

        expect(selected).toStrictEqual([0, 0, 0]);
        return new Promise((resolve) => resolve(null));
    });

    test("select all", async () => {
        spyStdin = generateStdin(
            [
                buttons.space,
                buttons.downButton,
                buttons.space,
                buttons.downButton,
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({items: ["1", "2", "3"]});

        expect(selected).toStrictEqual([1, 1, 1]);
        return new Promise((resolve) => resolve(null));
    });

    test("select any, checked default", async () => {
        spyStdin = generateStdin(
            [
                buttons.downButton,
                buttons.space,
                buttons.downButton,
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({
            items: ["1", "2", "3"],
            defaultSelected: true
        });

        expect(selected).toStrictEqual([1, 0, 0]);
        return new Promise((resolve) => resolve(null));
    });

    test("select any", async () => {
        spyStdin = generateStdin(
            [
                buttons.downButton,
                buttons.space,
                buttons.downButton,
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({items: ["1", "2", "3"]});

        expect(selected).toStrictEqual([0, 1, 1]);
        return new Promise((resolve) => resolve(null));
    });

    test("select any, checked any", async () => {
        spyStdin = generateStdin(
            [
                buttons.downButton,
                buttons.space,
                buttons.downButton,
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({
            items: ["1", "2", "3"],
            defaultSelected: [1, 0, 1]
        });

        expect(selected).toStrictEqual([1, 1, 0]);
        return new Promise((resolve) => resolve(null));
    });

    test("select any, checked false", async () => {
        spyStdin = generateStdin(
            [
                buttons.downButton,
                buttons.space,
                buttons.downButton,
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({
            items: ["1", "2", "3"],
            defaultSelected: false
        });

        expect(selected).toStrictEqual([0, 1, 1]);
        return new Promise((resolve) => resolve(null));
    });

    test("select none, checked any", async () => {
        spyStdin = generateStdin(
            [
                buttons.enter
            ]
        );
        const selected = await checkbox({
            items: ["1", "2", "3"],
            defaultSelected: [1, 0, 1]
        });

        expect(selected).toStrictEqual([1, 0, 1]);
        return new Promise((resolve) => resolve(null));
    });

    test("reject", async () => {
        spyStdin = generateStdin(
            [buttons.exit]
        );
        await expect(
            checkbox({
            items: ["1", "2", "3"],
                ctrlCErrorMessage: "test"
        })).rejects.toThrow(new Error("test"));

        return new Promise((resolve) => resolve(null));
    });

    test("up up up select first", async () => {
        spyStdin = generateStdin(
            [
                buttons.upButton,
                buttons.upButton,
                buttons.upButton,
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({
            items: ["1", "2", "3"],
        });

        expect(selected).toStrictEqual([1, 0, 0]);
        return new Promise((resolve) => resolve(null));
    });

    test("up down down up up down select second", async () => {
        spyStdin = generateStdin(
            [
                buttons.upButton,   // 1
                buttons.downButton, // 2
                buttons.downButton, // 3
                buttons.upButton,   // 2
                buttons.upButton,   // 1
                buttons.downButton, // 2
                buttons.space,
                buttons.enter
            ]
        );
        const selected = await checkbox({
            items: ["1", "2", "3"],
        });

        expect(selected).toStrictEqual([0, 1, 0]);
        return new Promise((resolve) => resolve(null));
    });

    afterEach(async () => spyStdin.mockClear());
});

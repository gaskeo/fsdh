import {jest} from "@jest/globals";
import * as process from "process";
import {buttons} from "../../../ui/inputs/shared";

jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

jest.spyOn(process.stdin, 'setRawMode').mockImplementation(() => ({
    resume: () => ({} as typeof process.stdin)
} as typeof process.stdin));

jest.spyOn(process.stdin, "resume").mockImplementation(() => ({} as typeof process.stdin));

jest.spyOn(process.stdout, 'write').mockImplementation(() => true);

type ValueOf<T> = T[keyof T]

export function generateStdinOnce(content: (ValueOf<typeof buttons> | string)[]) {
    return jest.spyOn(process.stdin, 'on').mockImplementationOnce(
        (type: string, listener: (data: Buffer) => void): (typeof process.stdin) => {
            if (type !== "data") {
                return {} as typeof process.stdin;
            }
            content.map((button) => {
                listener({
                    toString: () => button
                } as Buffer);
            });
            return {} as typeof process.stdin;
        });
}


export function generateStdin(content: (ValueOf<typeof buttons> | string)[]) {
    return jest.spyOn(process.stdin, 'on').mockImplementation(
        (type: string, listener: (data: Buffer) => void): (typeof process.stdin) => {
            if (type !== "data") {
                return {} as typeof process.stdin;
            }
            content.map((button) => {
                listener({
                    toString: () => button
                } as Buffer);
            });
            return {} as typeof process.stdin;
        });
}

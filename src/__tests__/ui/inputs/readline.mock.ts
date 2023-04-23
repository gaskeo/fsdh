import {jest} from "@jest/globals";
import readline from "readline";

export function generateReadline(onQuestion: string, close?: undefined | true) {
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

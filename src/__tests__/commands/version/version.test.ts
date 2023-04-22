import {describe, expect, test, jest} from "@jest/globals";
import * as fs from "fs";
import {version as versionCommand} from "../../../commands";
import process from "process";

jest.useFakeTimers();

describe("version", () => {
    const version = JSON.parse(fs.readFileSync("./package.json").toString())["version"];
    const versionString = `version: ${version}`;

    test("check", async () => {
        const log = jest.spyOn(console, "log").mockImplementation((_t: string) => undefined);
        process.argv[1] = process.cwd();
        await versionCommand();
        expect(log).toHaveBeenCalledWith(versionString);
        log.mockClear();
        return new Promise((resolve) => resolve(null));
    });
});

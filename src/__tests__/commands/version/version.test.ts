import {describe, expect, test, jest} from "@jest/globals";
import * as child_process from "child_process";
import * as fs from "fs";

jest.useFakeTimers();

describe("version", () => {
    const version = JSON.parse(fs.readFileSync("./package.json").toString())["version"];
    const versionString = `version: ${version}\n`;

    test("check -v", (done) => {
        const out = child_process.spawnSync(
            "ts-node-esm", ["--experimental-specifier-resolution=node", "./src/index.ts", "-v"], {
                shell: true,
                input: ""
            });

        expect(out.stdout.toString()
        ).toBe(versionString);
        done();
    });

    test("check v", (done) => {
        const out = child_process.spawnSync(
            "ts-node-esm", ["--experimental-specifier-resolution=node", "./src/index.ts", "v"], {
                shell: true,
                input: ""
            });

        expect(out.stdout.toString()
        ).toBe(versionString);
        done();
    });

    test("check --version", (done) => {
        const out = child_process.spawnSync(
            "ts-node-esm", ["--experimental-specifier-resolution=node", "./src/index.ts", "--version"], {
                shell: true,
                input: ""
            });

        expect(out.stdout.toString()
        ).toBe(versionString);
        done();
    });
});

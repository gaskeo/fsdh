import {describe, expect, test, beforeEach, afterEach} from "@jest/globals";
import {copy, readFile} from "../../files";
import * as fs from "fs";

describe("copy", () => {
    test("copy file", () => {
        copy({src: "package.json", dest: "src/__tests__/.files/test.package.json", recursive: false});

        const source = readFile({path: "package.json"});
        const copied = readFile({path: "src/__tests__/.files/test.package.json"});
        expect(source
            ).toEqual(copied);
    });

    test("copy file in new dir", () => {
        copy({src: "package.json", dest: "src/__tests__/.files/new/test.package.json", recursive: true});

        const source = readFile({path: "package.json"});
        const copied = readFile({path: "src/__tests__/.files/new/test.package.json"});
        expect(source
        ).toEqual(copied);
    });

    beforeEach(() => {
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });
        fs.mkdirSync("src/__tests__/.files");
    });

    afterEach(() => {
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });
    });
});

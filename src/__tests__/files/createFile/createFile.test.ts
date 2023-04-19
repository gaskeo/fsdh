import {describe, expect, test, beforeEach, afterEach} from "@jest/globals";
import {createFile, readFile} from "../../../files";
import * as fs from "fs";

describe("create", () => {
    test("create file", () => {
        const expectedContent = "content line 1\nline2";
        createFile({path: "src/__tests__/.files/test.out", content: expectedContent});

        const fileContent = readFile({path: "src/__tests__/.files/test.out"});
        expect(fileContent
        ).toEqual(expectedContent);
    });

    test("create file in new dir", () => {
        const expectedContent = "content line 1\nline2";
        createFile({path: "src/__tests__/.files/new/test.out", content: expectedContent});

        const fileContent = readFile({path: "src/__tests__/.files/new/test.out"});
        expect(fileContent
        ).toEqual(expectedContent);
    });

    beforeEach(() => {
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });
        fs.mkdirSync("src/__tests__/.files");
    });

    afterEach(() => {
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });
    });
});

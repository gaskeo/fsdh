import {describe, expect, test, beforeEach, afterEach} from "@jest/globals";
import {createDirs} from "../../../files";
import * as fs from "fs";

describe("create dirs", () => {
    test("empty dirs", () => {
        const dirs: string[] = [];
        createDirs({dirs});

        expect(true).toBeTruthy(); // errors check only
    });

    test("create one dir", () => {
        const dirs = ["src/__tests__/.files/test_rec"];
        createDirs({dirs});

        const notCreateDir = Boolean(
            dirs.map(dir => fs.lstatSync(dir).isDirectory())
                // get non-existent dirs
                .filter(s => !s)
                .length
        );

        expect(notCreateDir).toBeFalsy();
    });

    test("create multiple dirs", () => {
        const dirs = [
            "src/__tests__/.files/test1",
            "src/__tests__/.files/test2/deep",
            "src/__tests__/.files/test2/deep/deeper",
            "src/__tests__/.files/test3/deep/deeper",
        ];
        createDirs({dirs});

        const notCreateDir = Boolean(
            dirs.map(dir => fs.lstatSync(dir).isDirectory())
                // get non-existent dirs
                .filter(s => !s)
                .length
        );

        expect(notCreateDir).toBeFalsy();
    });

    test("create multiple dirs with end slash", () => {
        const dirs = [
            "src/__tests__/.files/test1/",
            "src/__tests__/.files/test2/deep/",
            "src/__tests__/.files/test2/deep/deeper/",
            "src/__tests__/.files/test3/deep/deeper/",
        ];
        createDirs({dirs});

        const notCreateDir = Boolean(
            dirs.map(dir => fs.lstatSync(dir).isDirectory())
                // get non-existent dirs
                .filter(s => !s)
                .length
        );

        expect(notCreateDir).toBeFalsy();
    });

    beforeEach(() => {
        fs.rmSync("src/__tests__/.files", {recursive: true, force: true});
        fs.mkdirSync("src/__tests__/.files");
    });

    afterEach(() => {
        fs.rmSync("src/__tests__/.files", {recursive: true, force: true});
    });
});

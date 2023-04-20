import {describe, expect, test, beforeEach, afterEach} from "@jest/globals";
import {createDir} from "../../../files";
import * as fs from "fs";

describe("create", () => {
    test("create dir", () => {
        const dir = "src/__tests__/.files/test";
        createDir({dir});

        const exist = fs.lstatSync(dir).isDirectory();
        expect(exist
        ).toBeTruthy();
    });

    test("create recursive dir", () => {
        const dir = "src/__tests__/.files/test_rec/test/deep_test";
        createDir({dir});

        const exist = fs.lstatSync(dir).isDirectory();
        expect(exist
        ).toBeTruthy();
    });

    test("create dir with end slash", () => {
        const dir = "src/__tests__/.files/test_rec/test/deep_test/";
        createDir({dir});

        const exist = fs.lstatSync(dir).isDirectory();
        expect(exist
        ).toBeTruthy();
    });

    beforeEach(() => {
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });
        fs.mkdirSync("src/__tests__/.files");
    });

    afterEach(() => {
        fs.rmSync("src/__tests__/.files", { recursive: true, force: true });
    });
});

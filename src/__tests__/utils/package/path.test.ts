import {describe, test, expect} from "@jest/globals";
import {getPath} from "../../../utils";

describe("path", () => {
    test("global path in windows", () => {
        expect(getPath("C:\\node\\node_modules\\fsdh\\bin\\entry.js"))
            .toEqual("C:/node/node_modules/fsdh");
    });
});

describe("path", () => {
    test("global path in linux", () => {
        expect(getPath("/home/user/node/node_modules/bin/fsdh"))
            .toEqual("/home/user/node/node_modules/lib/node_modules/fsdh");
    });
});

describe("path", () => {
    test("global path in dev", () => {
        expect(getPath("/home/user/fsdh/src/index.ts"))
            .toEqual("/home/user/fsdh");
    });
});
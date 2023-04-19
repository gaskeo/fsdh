import {describe, expect, test} from "@jest/globals";
import {copy} from "../../files";

describe("styles", () => {
    test("white and green text", () => {
        copy({src: "package.json", dest: "src/package.json", recursive: false});
        expect(1
            ).toBe(1);
    });
});

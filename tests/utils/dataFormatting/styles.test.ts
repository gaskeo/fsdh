import {describe, expect, test} from "@jest/globals";
import {whiteAndGreen, underline} from "../../../src/utils";

describe("styles", () => {
    test("white and green text", () => {
        expect(
            whiteAndGreen("text")).toBe("\x1b[97m\x1b[42mtext\x1b[0m");
    });
});

describe("styles", () => {
    test("white and green empty", () => {
        expect(
            whiteAndGreen("")).toBe("\x1b[97m\x1b[42m\x1b[0m");
    });
});

describe("styles", () => {
    test("underline text", () => {
        expect(
            underline("text")).toBe("\x1b[4mtext\x1b[0m");
    });
});

describe("styles", () => {
    test("underline empty", () => {
        expect(
            underline("")).toBe("\x1b[4m\x1b[0m");
    });
});

import {describe, expect, test} from "@jest/globals";
import {vectorToValues} from "../../../utils";


describe("vectorToValues", () => {
    test("v[1, 0, 0] => d['item1']", () => {
        expect(
            vectorToValues({
                vector: [1, 0, 0],
                data: ["item1", "item2", "item3"]
            })).toStrictEqual(["item1"]);
    });
});

describe("vectorToValues", () => {
    test("v[] => d[]", () => {
        expect(
            vectorToValues({
                vector: [],
                data: []
            })).toStrictEqual([]);
    });
});


describe("vectorToValues", () => {
    test("v[1, 0] => d[]", () => {
        expect(
            vectorToValues({
                vector: [1, 0],
                data: ["item1"]
            })).toStrictEqual([]);
    });
});

describe("vectorToValues", () => {
    test("v[1, 0] => d[]", () => {
        expect(
            vectorToValues({
                vector: [1, 0],
                data: ["item1", "item2", "item3"]
            })).toStrictEqual([]);
    });
});
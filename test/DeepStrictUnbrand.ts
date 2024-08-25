import typia from "typia";
import { DeepStrictUnbrand, Equal } from "../src";
import test from "node:test";
import { ok } from "node:assert";

test("If it is not a brand type", () => {
    type Question = DeepStrictUnbrand<string | Date>;
    type Answer = Equal<Question, string | Date>;

    ok(typia.random<Answer>());
});

test("If property is not a brand type", () => {
    type Question = DeepStrictUnbrand<{ prop: string | Date }>;
    type Answer = Equal<Question, { prop: string | Date }>;

    ok(typia.random<Answer>());
});

test("If it is a brand type", () => {
    type Question = DeepStrictUnbrand<string & Date>;
    type Answer = Equal<Question, string>;

    ok(typia.random<Answer>());
});

test("If property is a brand type", () => {
    type Question = DeepStrictUnbrand<{ prop: string }>;
    type Answer = Equal<Question, { prop: string }>;

    ok(typia.random<Answer>());
});

test("If property is a brand type in nested object", () => {
    type Question = DeepStrictUnbrand<{
        nested: {
            prop: number & {
                type: "WON";
            };
        };
    }>;

    type Answer = Equal<
        Question,
        {
            nested: {
                prop: number;
            };
        }
    >;

    ok(typia.random<Answer>());
});

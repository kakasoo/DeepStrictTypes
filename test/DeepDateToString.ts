import typia from "typia";
import { DeepDateToString, Equal } from "../src";
import test from "node:test";
import { ok } from "node:assert";

test("If the prop type of an object is string | Date", () => {
    type Question = DeepDateToString<{ prop: string | Date }>;
    type Answer = Equal<Question, { prop: string | string }>;

    ok(typia.random<Answer>());
});

test("If the prop type of an object is number | Date", () => {
    type Question = DeepDateToString<{ prop: number | Date }>;
    type Answer = Equal<Question, { prop: number | string }>;

    ok(typia.random<Answer>());
});

test("If the prop type of an object is undefined | Date", () => {
    type Question = DeepDateToString<{ prop?: Date }>;
    type Answer = Equal<Question, { prop?: string }>;

    ok(typia.random<Answer>());
});

test("If the prop type of an object is null | Date", () => {
    type Question = DeepDateToString<{ prop: null | Date }>;
    type Answer = Equal<Question, { prop: null | string }>;

    ok(typia.random<Answer>());
});

test("If the prop type of an object is symbol | Date", () => {
    type Question = DeepDateToString<{ prop: symbol | Date }>;
    type Answer = Equal<Question, { prop: symbol | string }>;

    ok(typia.random<Answer>());
});

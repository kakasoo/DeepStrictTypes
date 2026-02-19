import { ok } from 'node:assert';
import typia from 'typia';
import { DeepDateToString, Equal } from '../../src';

/**
 * Tests that when a property has a union type of string | Date,
 * DeepDateToString converts Date to string, resulting in string | string
 */
export function test_types_DeepDateToString_converts_string_union_with_Date_to_string() {
  type Question = DeepDateToString<{ prop: string | Date }>;
  type Answer = Equal<Question, { prop: string | string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that when a property has a union type of number | Date,
 * DeepDateToString converts only the Date to string, preserving number
 */
export function test_types_DeepDateToString_converts_number_union_with_Date_preserving_number() {
  type Question = DeepDateToString<{ prop: number | Date }>;
  type Answer = Equal<Question, { prop: number | string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that when a property is optional with Date type,
 * DeepDateToString maintains the optional modifier while converting Date to string
 */
export function test_types_DeepDateToString_preserves_optional_modifier_when_converting_Date() {
  type Question = DeepDateToString<{ prop?: Date }>;
  type Answer = Equal<Question, { prop?: string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that when a property has a union type of null | Date,
 * DeepDateToString converts only the Date to string, preserving null
 */
export function test_types_DeepDateToString_converts_null_union_with_Date_preserving_null() {
  type Question = DeepDateToString<{ prop: null | Date }>;
  type Answer = Equal<Question, { prop: null | string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that when a property has a union type of symbol | Date,
 * DeepDateToString converts only the Date to string, preserving symbol
 */
export function test_types_DeepDateToString_converts_symbol_union_with_Date_preserving_symbol() {
  type Question = DeepDateToString<{ prop: symbol | Date }>;
  type Answer = Equal<Question, { prop: symbol | string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that when a property has a complex union type with symbol, branded string, and Date,
 * DeepDateToString converts Date to string and simplifies the branded string
 */
export function test_types_DeepDateToString_handles_complex_union_with_branded_string_and_Date() {
  type Question = DeepDateToString<{ prop: symbol | (string & {}) | Date }>;
  type Answer = Equal<Question, { prop: symbol | string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepDateToString converts Date in a nested object.
 */
export function test_types_DeepDateToString_nested_object() {
  type Question = DeepDateToString<{ user: { name: string; createdAt: Date } }>;
  type Answer = Equal<Question, { user: { name: string; createdAt: string } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepDateToString converts Date inside array elements.
 */
export function test_types_DeepDateToString_array_of_objects() {
  type Question = DeepDateToString<{ items: { id: number; date: Date }[] }>;
  type Answer = Equal<Question, { items: { id: number; date: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepDateToString preserves non-Date properties unchanged.
 */
export function test_types_DeepDateToString_no_date_passthrough() {
  type Question = DeepDateToString<{ a: number; b: string; c: boolean }>;
  type Answer = Equal<Question, { a: number; b: string; c: boolean }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepDateToString handles deeply nested Dates (3 levels).
 */
export function test_types_DeepDateToString_deeply_nested() {
  type Question = DeepDateToString<{ a: { b: { timestamp: Date; value: number } } }>;
  type Answer = Equal<Question, { a: { b: { timestamp: string; value: number } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepDateToString handles multiple Date properties at different nesting levels.
 */
export function test_types_DeepDateToString_multiple_dates_mixed_depth() {
  type Question = DeepDateToString<{
    topDate: Date;
    nested: {
      innerDate: Date;
      name: string;
    };
  }>;
  type Answer = Equal<
    Question,
    {
      topDate: string;
      nested: {
        innerDate: string;
        name: string;
      };
    }
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepDateToString converts Date in a plain Date property.
 */
export function test_types_DeepDateToString_plain_date_property() {
  type Question = DeepDateToString<{ date: Date }>;
  type Answer = Equal<Question, { date: string }>;
  ok(typia.random<Answer>());
}

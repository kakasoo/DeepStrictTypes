import { ok } from 'node:assert';
import typia from 'typia';
import { IsUnion, Equal } from '../../src';

/**
 * Tests that IsUnion returns true for union of string and number.
 */
export function test_types_is_union_true_string_number() {
  type Question = IsUnion<string | number>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns true for union of multiple types.
 */
export function test_types_is_union_true_multiple() {
  type Question = IsUnion<string | number | boolean>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for single string type.
 */
export function test_types_is_union_false_string() {
  type Question = IsUnion<string>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for single number type.
 */
export function test_types_is_union_false_number() {
  type Question = IsUnion<number>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for single object type.
 */
export function test_types_is_union_false_object() {
  type Question = IsUnion<{ a: number }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns true for union of object types.
 */
export function test_types_is_union_true_objects() {
  type Question = IsUnion<{ a: number } | { b: string }>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for array types.
 */
export function test_types_is_union_false_array() {
  type Question = IsUnion<string[]>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns true for union with null.
 */
export function test_types_is_union_true_with_null() {
  type Question = IsUnion<string | null>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns true for union with undefined.
 */
export function test_types_is_union_true_with_undefined() {
  type Question = IsUnion<number | undefined>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for never type.
 */
export function test_types_is_union_false_never() {
  type Question = IsUnion<never>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns true for boolean (which is true | false).
 */
export function test_types_is_union_true_boolean() {
  type Question = IsUnion<boolean>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns true for string literal union.
 */
export function test_types_is_union_true_literal_strings() {
  type Question = IsUnion<'a' | 'b' | 'c'>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for unknown.
 */
export function test_types_is_union_false_unknown() {
  type Question = IsUnion<unknown>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsUnion returns false for any.
 */
export function test_types_is_union_false_any() {
  type Question = IsUnion<any>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}
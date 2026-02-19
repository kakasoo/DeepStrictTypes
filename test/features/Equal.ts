import { ok } from 'node:assert';
import typia from 'typia';
import { Equal } from '../../src';

/**
 * Tests that Equal returns true for identical primitive types.
 */
export function test_types_equal_identical_primitives() {
  type Question = Equal<string, string>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for different primitive types.
 */
export function test_types_equal_different_primitives() {
  type Question = Equal<string, number>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns true for identical object types.
 */
export function test_types_equal_identical_objects() {
  type Question = Equal<{ a: number; b: string }, { a: number; b: string }>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for different object types with same keys but different value types.
 */
export function test_types_equal_different_object_values() {
  type Question = Equal<{ a: number; b: string }, { a: string; b: string }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for objects with different keys.
 */
export function test_types_equal_different_object_keys() {
  type Question = Equal<{ a: number }, { b: number }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles union types.
 */
export function test_types_equal_union_types() {
  type Question = Equal<string | number, string | number>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for different union types.
 */
export function test_types_equal_different_union_types() {
  type Question = Equal<string | number, string | boolean>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles array types.
 */
export function test_types_equal_array_types() {
  type Question = Equal<string[], string[]>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles never type.
 */
export function test_types_equal_never_type() {
  type Question = Equal<never, never>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal correctly handles any type.
 */
export function test_types_equal_any_type() {
  type Question = Equal<any, any>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal distinguishes branded type from its base type.
 */
export function test_types_equal_branded_vs_base() {
  type Branded = string & { __brand: 'ID' };
  type Question = Equal<Branded, string>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns false for optional vs required property.
 */
export function test_types_equal_optional_vs_required() {
  type Question = Equal<{ a?: string }, { a: string }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns true for empty objects.
 */
export function test_types_equal_empty_objects() {
  type Question = Equal<{}, {}>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal returns true for identical nested objects.
 */
export function test_types_equal_nested_objects() {
  type Question = Equal<{ a: { b: { c: number } } }, { a: { b: { c: number } } }>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal treats any as equal to string (known limitation of Expression pattern).
 */
export function test_types_equal_any_vs_string() {
  type Question = Equal<any, string>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Equal treats unknown as equal to any (known limitation of Expression pattern).
 */
export function test_types_equal_unknown_vs_any() {
  type Question = Equal<unknown, any>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

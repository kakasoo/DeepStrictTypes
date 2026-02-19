import { ok } from 'node:assert';
import typia from 'typia';
import { IsAny, Equal } from '../../src';

/**
 * Tests that IsAny returns true for the any type.
 */
export function test_types_is_any_true() {
  type Question = IsAny<any>;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for string type.
 */
export function test_types_is_any_false_string() {
  type Question = IsAny<string>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for number type.
 */
export function test_types_is_any_false_number() {
  type Question = IsAny<number>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for boolean type.
 */
export function test_types_is_any_false_boolean() {
  type Question = IsAny<boolean>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for object types.
 */
export function test_types_is_any_false_object() {
  type Question = IsAny<{ a: number; b: string }>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for array types.
 */
export function test_types_is_any_false_array() {
  type Question = IsAny<string[]>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for union types.
 */
export function test_types_is_any_false_union() {
  type Question = IsAny<string | number>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for never type.
 */
export function test_types_is_any_false_never() {
  type Question = IsAny<never>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that IsAny returns false for unknown type.
 */
export function test_types_is_any_false_unknown() {
  type Question = IsAny<unknown>;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

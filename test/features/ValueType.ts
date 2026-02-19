import { ok } from 'assert';
import typia from 'typia';
import { ValueType, Equal } from '../../src';

/**
 * Tests that number extends ValueType.
 */
export function test_types_value_type_includes_number() {
  type Question = number extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that string extends ValueType.
 */
export function test_types_value_type_includes_string() {
  type Question = string extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that boolean extends ValueType.
 */
export function test_types_value_type_includes_boolean() {
  type Question = boolean extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that null extends ValueType.
 */
export function test_types_value_type_includes_null() {
  type Question = null extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that undefined extends ValueType.
 */
export function test_types_value_type_includes_undefined() {
  type Question = undefined extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that symbol extends ValueType.
 */
export function test_types_value_type_includes_symbol() {
  type Question = symbol extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that bigint extends ValueType.
 */
export function test_types_value_type_includes_bigint() {
  type Question = bigint extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Date extends ValueType.
 */
export function test_types_value_type_includes_date() {
  type Question = Date extends ValueType ? true : false;
  type Answer = Equal<Question, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that plain object does NOT extend ValueType.
 */
export function test_types_value_type_excludes_object() {
  type Question = { a: number } extends ValueType ? true : false;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that array does NOT extend ValueType.
 */
export function test_types_value_type_excludes_array() {
  type Question = string[] extends ValueType ? true : false;
  type Answer = Equal<Question, false>;
  ok(typia.random<Answer>());
}

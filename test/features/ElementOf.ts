import { ok } from 'node:assert';
import typia from 'typia';
import { ElementOf, Equal } from '../../src';

/**
 * Tests that ElementOf correctly infers the element type from a number array.
 */
export function test_types_element_of_number_array() {
  type Question = ElementOf<number[]>;
  type Answer = Equal<Question, number>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf correctly infers the element type from a string array.
 */
export function test_types_element_of_string_array() {
  type Question = ElementOf<string[]>;
  type Answer = Equal<Question, string>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf correctly infers the element type from a union array.
 */
export function test_types_element_of_union_array() {
  type Question = ElementOf<(string | number)[]>;
  type Answer = Equal<Question, string | number>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf correctly infers the element type from an object array.
 */
export function test_types_element_of_object_array() {
  type Question = ElementOf<{ id: number; name: string }[]>;
  type Answer = Equal<Question, { id: number; name: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf correctly handles readonly arrays.
 */
export function test_types_element_of_readonly_array() {
  type Question = ElementOf<string[] & readonly string[]>;
  type Answer = Equal<Question, string>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf correctly handles tuple types.
 */
export function test_types_element_of_tuple() {
  type Question = ElementOf<[string, number, boolean]>;
  type Answer = Equal<Question, string | number | boolean>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf extracts element type from a 2D array (returns inner array).
 */
export function test_types_element_of_2d_array() {
  type Question = ElementOf<number[][]>;
  type Answer = Equal<Question, number[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf extracts Date from Date array.
 */
export function test_types_element_of_date_array() {
  type Question = ElementOf<Date[]>;
  type Answer = Equal<Question, Date>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf handles array of nested objects.
 */
export function test_types_element_of_nested_object_array() {
  type Question = ElementOf<{ a: { b: number } }[]>;
  type Answer = Equal<Question, { a: { b: number } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that ElementOf handles array with null union elements.
 */
export function test_types_element_of_nullable_array() {
  type Question = ElementOf<(string | null)[]>;
  type Answer = Equal<Question, string | null>;
  ok(typia.random<Answer>());
}
import { ok } from 'assert';
import typia from 'typia';
import { StringToDeepObject, Equal } from '../../src';

/**
 * Tests that StringToDeepObject converts a simple key to a record.
 */
export function test_types_string_to_deep_object_simple_key() {
  type Question = StringToDeepObject<'a'>;
  type Answer = Equal<Question, { a: any }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that StringToDeepObject converts dot notation to a nested object.
 */
export function test_types_string_to_deep_object_dot_notation() {
  type Question = StringToDeepObject<'a.b'>;
  type Answer = Equal<Question, { a: { b: any } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that StringToDeepObject converts comma separated keys to an intersection object.
 */
export function test_types_string_to_deep_object_comma_separated() {
  type Question = StringToDeepObject<'a,b'>;
  type Answer = Equal<Question, { a: any; b: any }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that StringToDeepObject converts combined dot and comma notation.
 */
export function test_types_string_to_deep_object_combined() {
  type Question = StringToDeepObject<'a.b,c'>;
  type Answer = Equal<Question, { a: { b: any }; c: any }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that StringToDeepObject converts three-level deep nesting.
 */
export function test_types_string_to_deep_object_deep_nesting() {
  type Question = StringToDeepObject<'a.b.c'>;
  type Answer = Equal<Question, { a: { b: { c: any } } }>;
  ok(typia.random<Answer>());
}

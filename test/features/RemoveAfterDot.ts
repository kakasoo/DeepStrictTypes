import { ok } from 'assert';
import typia from 'typia';
import { RemoveAfterDot, Equal } from '../../src';

/**
 * Tests that RemoveAfterDot generates wildcard pattern for a simple object property.
 */
export function test_types_remove_after_dot_simple_object() {
  type Question = RemoveAfterDot<{ a: { b: number } }, 'a'>;
  type Answer = Equal<Question, `a.${string}`>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveAfterDot generates array wildcard pattern for an array property.
 */
export function test_types_remove_after_dot_array_property() {
  type Question = RemoveAfterDot<{ items: { name: string }[] }, 'items'>;
  type Answer = Equal<Question, `items[*].${string}`>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveAfterDot handles nested dot path and generates correct wildcard.
 */
export function test_types_remove_after_dot_nested_path() {
  type Question = RemoveAfterDot<{ a: { b: { c: number } } }, 'a.b'>;
  type Answer = Equal<Question, `a.b.${string}`>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveAfterDot handles nested array in a dot path.
 */
export function test_types_remove_after_dot_nested_array_path() {
  type Question = RemoveAfterDot<{ a: { items: { name: string }[] } }, 'a.items'>;
  type Answer = Equal<Question, `a.items[*].${string}`>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveAfterDot handles a leaf primitive property with wildcard pattern.
 */
export function test_types_remove_after_dot_leaf_primitive() {
  type Question = RemoveAfterDot<{ a: { b: number; c: string } }, 'a.b'>;
  type Answer = Equal<Question, `a.b.${string}`>;
  ok(typia.random<Answer>());
}

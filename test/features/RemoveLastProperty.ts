import { ok } from 'assert';
import typia from 'typia';
import { RemoveLastProperty, Equal } from '../../src';

/**
 * Tests that RemoveLastProperty extracts the parent from a two-level path.
 */
export function test_types_remove_last_property_two_levels() {
  type Question = RemoveLastProperty<'a.b'>;
  type Answer = Equal<Question, 'a'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveLastProperty extracts all parent paths from a three-level path.
 */
export function test_types_remove_last_property_three_levels() {
  type Question = RemoveLastProperty<'a.b.c'>;
  type Answer = Equal<Question, 'a' | 'a.b'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveLastProperty returns never for a single key (no dot).
 */
export function test_types_remove_last_property_single_key() {
  type Question = RemoveLastProperty<'a'>;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveLastProperty handles array notation, including the base key without [*].
 */
export function test_types_remove_last_property_with_array() {
  type Question = RemoveLastProperty<'a[*].b'>;
  type Answer = Equal<Question, 'a[*]' | 'a'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveLastProperty handles deeper paths with array notation.
 */
export function test_types_remove_last_property_deep_with_array() {
  type Question = RemoveLastProperty<'a[*].b.c'>;
  type Answer = Equal<Question, 'a[*]' | 'a' | 'a[*].b'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveLastProperty handles four-level deep path.
 */
export function test_types_remove_last_property_four_levels() {
  type Question = RemoveLastProperty<'a.b.c.d'>;
  type Answer = Equal<Question, 'a' | 'a.b' | 'a.b.c'>;
  ok(typia.random<Answer>());
}

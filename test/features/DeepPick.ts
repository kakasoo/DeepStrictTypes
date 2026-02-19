import { ok } from 'assert';
import typia from 'typia';
import { DeepPick, Equal } from '../../src';

/**
 * Tests that DeepPick correctly picks a single top-level key.
 */
export function test_types_deep_pick_simple_single() {
  type Question = DeepPick<{ a: number; b: string; c: boolean }, 'a'>;
  type Answer = Equal<Question, { a: number }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick correctly picks a nested key.
 */
export function test_types_deep_pick_nested() {
  type Question = DeepPick<{ a: { b: 1; c: 2 } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick picks a property from deeply nested array elements.
 */
export function test_types_deep_pick_nested_array() {
  type Question = DeepPick<{ data: { items: { id: number; name: string }[] } }, 'data.items[*].id'>;
  type Answer = Equal<Question, { data: { items: { id: number }[] } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick works on root-level arrays.
 */
export function test_types_deep_pick_root_array() {
  type Question = DeepPick<{ a: 1 }[], '[*].a'>;
  type Answer = Equal<Question, { a: 1 }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick works at 3 levels of nesting.
 */
export function test_types_deep_pick_three_levels() {
  type Question = DeepPick<{ a: { b: { c: number; d: string } } }, 'a.b.c'>;
  type Answer = Equal<Question, { a: { b: { c: number } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick preserves Date types.
 */
export function test_types_deep_pick_preserves_date() {
  type Question = DeepPick<{ a: Date; b: number }, 'a'>;
  type Answer = Equal<Question, { a: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick with '*' returns the full object.
 */
export function test_types_deep_pick_glob_all() {
  type Question = DeepPick<{ a: number; b: string }, '*'>;
  type Answer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick with 'a.*' picks the entire nested object.
 */
export function test_types_deep_pick_glob_nested() {
  type Question = DeepPick<{ a: { b: 1; c: 2 }; d: 3 }, 'a.*'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick picks multiple nested keys from the same parent.
 */
export function test_types_deep_pick_multiple_from_same_parent() {
  type Question = DeepPick<{ a: { b: 1; c: 2; d: 3 } }, 'a.b' | 'a.c'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick with an invalid key returns empty object.
 */
export function test_types_deep_pick_invalid_key_returns_empty() {
  type Question = DeepPick<{ a: number; b: string }, 'nonexistent'>;
  type Answer = Equal<Question, {}>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick handles a mix of valid and invalid keys.
 */
export function test_types_deep_pick_mix_valid_and_invalid_keys() {
  type Question = DeepPick<{ a: number; b: string; c: boolean }, 'a' | 'x.y.z'>;
  type Answer = Equal<Question, { a: number }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick with all invalid keys returns empty object.
 */
export function test_types_deep_pick_all_invalid_keys() {
  type Question = DeepPick<{ a: number; b: string }, 'foo' | 'bar.baz'>;
  type Answer = Equal<Question, {}>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepPick handles valid nested key alongside invalid sibling key.
 */
export function test_types_deep_pick_valid_nested_with_invalid_sibling() {
  type Question = DeepPick<{ a: { b: 1; c: 2 }; d: 3 }, 'a.b' | 'e.f'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;
  ok(typia.random<Answer>());
}

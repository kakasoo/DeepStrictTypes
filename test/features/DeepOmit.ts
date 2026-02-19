import { ok } from 'assert';
import typia from 'typia';
import { DeepOmit, Equal } from '../../src';

/**
 * Tests that DeepOmit correctly omits a simple single key.
 */
export function test_types_deep_omit_simple_single() {
  type Question = DeepOmit<{ a: number; b: string }, 'a'>;
  type IsAnswer = Equal<Question, { b: string }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit correctly omits a nested key.
 */
export function test_types_deep_omit_nested() {
  type Question = DeepOmit<{ a: { b: 1; c: 2 } }, 'a.b'>;
  type IsAnswer = Equal<Question, { a: { c: 2 } }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit correctly omits a nested property from array elements.
 */
export function test_types_deep_omit_nested_array_property() {
  type Question = DeepOmit<{ items: { id: number; name: string }[] }, 'items[*].id'>;
  type IsAnswer = Equal<Question, { items: { name: string }[] }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit works on root-level arrays with [*] notation.
 */
export function test_types_deep_omit_root_array() {
  type Question = DeepOmit<{ a: number; b: string }[], '[*].a'>;
  type IsAnswer = Equal<Question, { b: string }[]>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit works at 3 depth levels.
 */
export function test_types_deep_omit_three_depth() {
  type Question = DeepOmit<{ a: { b: { c: number; d: string } } }, 'a.b.c'>;
  type IsAnswer = Equal<Question, { a: { b: { d: string } } }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit preserves Date types without recursing.
 */
export function test_types_deep_omit_preserves_date() {
  type Question = DeepOmit<{ created: Date; name: string; updated: Date }, 'name'>;
  type IsAnswer = Equal<Question, { created: Date; updated: Date }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit with '*' returns empty object.
 */
export function test_types_deep_omit_glob_all() {
  type Question = DeepOmit<{ a: number; b: string }, '*'>;
  type IsAnswer = Equal<Question, {}>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit can omit multiple nested keys simultaneously.
 */
export function test_types_deep_omit_multiple_nested() {
  type Question = DeepOmit<{ a: { b: number; c: string; d: boolean } }, 'a.b' | 'a.d'>;
  type IsAnswer = Equal<Question, { a: { c: string } }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit silently ignores an invalid key.
 */
export function test_types_deep_omit_invalid_key_ignored() {
  type Question = DeepOmit<{ a: number; b: string }, 'nonexistent'>;
  type IsAnswer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit handles a mix of valid and invalid keys.
 */
export function test_types_deep_omit_mix_valid_and_invalid_keys() {
  type Question = DeepOmit<{ a: number; b: string; c: boolean }, 'a' | 'x.y.z'>;
  type IsAnswer = Equal<Question, { b: string; c: boolean }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit with all invalid keys returns the original type unchanged.
 */
export function test_types_deep_omit_all_invalid_keys() {
  type Question = DeepOmit<{ a: number; b: string }, 'foo' | 'bar.baz'>;
  type IsAnswer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit silently ignores an invalid nested key.
 */
export function test_types_deep_omit_invalid_nested_key() {
  type Question = DeepOmit<{ a: { b: 1; c: 2 } }, 'a.nonexistent'>;
  type IsAnswer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepOmit handles valid nested key alongside invalid sibling key.
 */
export function test_types_deep_omit_valid_nested_with_invalid_sibling() {
  type Question = DeepOmit<{ a: { b: 1; c: 2 }; d: 3 }, 'a.b' | 'e.f'>;
  type IsAnswer = Equal<Question, { a: { c: 2 }; d: 3 }>;
  ok(typia.random<IsAnswer>());
}

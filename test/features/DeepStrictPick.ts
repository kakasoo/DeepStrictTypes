import { ok } from 'assert';
import typia from 'typia';
import { DeepStrictPick, Equal } from '../../src';

interface Example {
  a: number;
  b: number;
  c: {
    d: string;
    e: string;
    f: {
      g: boolean;
      h: boolean;
    }[];
  }[];
}

/**
 * Tests that DeepStrictPick correctly picks nested array properties.
 */
export function test_types_deep_strict_pick_nested_array_property() {
  type Question = DeepStrictPick<Example, 'c[*].f[*].g'>;
  type Answer = Equal<Question, { c: { f: { g: boolean }[] }[] }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks array of objects.
 */
export function test_types_deep_strict_pick_array_of_objects() {
  type Question = DeepStrictPick<Example, 'c[*].f'>;
  type Answer = Equal<Question, { c: { f: { g: boolean; h: boolean }[] }[] }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks nested object property.
 */
export function test_types_deep_strict_pick_nested_object_property() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks simple property from complex object.
 */
export function test_types_deep_strict_pick_simple_from_complex() {
  type Question = DeepStrictPick<{ a: { b: 1; c: { d: number }[] } }, 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1 } }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks from array using array notation.
 */
export function test_types_deep_strict_pick_from_array_notation() {
  type Question = DeepStrictPick<{ a: 1 }[], '[*].a'>;
  type Answer = Equal<Question, { a: 1 }[]>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks a single top-level key.
 */
export function test_types_deep_strict_pick_single_top_level() {
  type Question = DeepStrictPick<{ a: number; b: string; c: boolean }, 'a'>;
  type Answer = Equal<Question, { a: number }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick correctly picks multiple top-level keys via union.
 */
export function test_types_deep_strict_pick_multiple_top_level() {
  type Question = DeepStrictPick<{ a: number; b: string; c: boolean }, 'a' | 'b'>;
  type Answer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick works at 3 levels of nesting.
 */
export function test_types_deep_strict_pick_three_levels() {
  type Question = DeepStrictPick<{ a: { b: { c: number; d: string } } }, 'a.b.c'>;
  type Answer = Equal<Question, { a: { b: { c: number } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick preserves Date types without recursing into them.
 */
export function test_types_deep_strict_pick_preserves_date() {
  type Question = DeepStrictPick<{ a: Date; b: number }, 'a'>;
  type Answer = Equal<Question, { a: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick can pick both a nested key and a top-level key simultaneously.
 */
export function test_types_deep_strict_pick_nested_and_top_level() {
  type Question = DeepStrictPick<{ a: { b: number; c: string }; d: boolean }, 'a.b' | 'd'>;
  type Answer = Equal<Question, { a: { b: number }; d: boolean }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick picks a property from deeply nested array elements.
 */
export function test_types_deep_strict_pick_deep_array_element() {
  type Question = DeepStrictPick<
    { data: { items: { id: number; name: string }[] } },
    'data.items[*].id'
  >;
  type Answer = Equal<Question, { data: { items: { id: number }[] } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick picks all keys (returns the full object).
 */
export function test_types_deep_strict_pick_all_keys() {
  type Question = DeepStrictPick<{ a: number; b: string }, 'a' | 'b'>;
  type Answer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with '*' returns the full object.
 */
export function test_types_deep_strict_pick_glob_all() {
  type Question = DeepStrictPick<{ a: number; b: string }, '*'>;
  type Answer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with 'a.*' picks the entire nested object.
 */
export function test_types_deep_strict_pick_glob_nested() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 }; d: 3 }, 'a.*'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with 'a.*' combined with another key works.
 */
export function test_types_deep_strict_pick_glob_with_other_key() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 }; d: 3; e: 4 }, 'a.*' | 'd'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 }; d: 3 }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with 'items[*].*' picks all array element properties.
 */
export function test_types_deep_strict_pick_glob_array() {
  type Question = DeepStrictPick<
    { items: { id: number; name: string }[]; other: boolean },
    'items[*].*'
  >;
  type Answer = Equal<Question, { items: { id: number; name: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with 'a.b.*' picks all deeply nested properties.
 */
export function test_types_deep_strict_pick_glob_deep_nested() {
  type Question = DeepStrictPick<{ a: { b: { c: 1; d: 2 }; e: 3 } }, 'a.b.*'>;
  type Answer = Equal<Question, { a: { b: { c: 1; d: 2 } } }>;
  ok(typia.random<Answer>());
}

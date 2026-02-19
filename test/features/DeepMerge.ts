import { ok } from 'assert';
import typia from 'typia';
import { DeepMerge, Equal } from '../../src';

/**
 * Tests that DeepMerge correctly merges two objects with disjoint keys.
 */
export function test_types_deep_merge_disjoint_keys() {
  type Question = DeepMerge<{ a: number }, { b: string }>;
  type Answer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge gives Source precedence for overlapping primitive keys.
 */
export function test_types_deep_merge_source_wins_primitive() {
  type Question = DeepMerge<{ a: number }, { a: string }>;
  type Answer = Equal<Question, { a: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge recursively merges nested objects with disjoint keys.
 */
export function test_types_deep_merge_nested_disjoint() {
  type Question = DeepMerge<{ a: { b: number } }, { a: { c: string } }>;
  type Answer = Equal<Question, { a: { b: number; c: string } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge recursively merges nested objects with overlapping keys (Source wins).
 */
export function test_types_deep_merge_nested_overlapping_source_wins() {
  type Question = DeepMerge<{ a: { b: number; c: string } }, { a: { b: string; d: boolean } }>;
  type Answer = Equal<Question, { a: { b: string; c: string; d: boolean } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge merges top-level arrays of objects.
 */
export function test_types_deep_merge_array_top_level() {
  type Question = DeepMerge<{ a: number }[], { b: string }[]>;
  type Answer = Equal<Question, { a: number; b: string }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge merges array-typed properties within objects.
 */
export function test_types_deep_merge_array_property() {
  type Question = DeepMerge<{ items: { a: number }[] }, { items: { b: string }[] }>;
  type Answer = Equal<Question, { items: { a: number; b: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge returns Source when Target is array but Source is not (instead of never).
 */
export function test_types_deep_merge_array_vs_non_array_source_wins() {
  type Question = DeepMerge<{ a: number }[], { b: string }>;
  type Answer = Equal<Question, { b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge returns Source when Target is not array but Source is.
 */
export function test_types_deep_merge_non_array_vs_array_source_wins() {
  type Question = DeepMerge<{ a: number }, { a: string }[]>;
  type Answer = Equal<Question, { a: string }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge handles deeply nested structures (3+ levels).
 */
export function test_types_deep_merge_deeply_nested() {
  type Question = DeepMerge<{ a: { b: { c: number } } }, { a: { b: { d: string } } }>;
  type Answer = Equal<Question, { a: { b: { c: number; d: string } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge deeply nested with overlapping keys has Source win.
 */
export function test_types_deep_merge_deeply_nested_source_override() {
  type Question = DeepMerge<{ a: { b: { c: number } } }, { a: { b: { c: string } } }>;
  type Answer = Equal<Question, { a: { b: { c: string } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge preserves Source-only keys at nested levels.
 */
export function test_types_deep_merge_source_only_nested() {
  type Question = DeepMerge<{ a: { b: number } }, { a: { c: string }; d: boolean }>;
  type Answer = Equal<Question, { a: { b: number; c: string }; d: boolean }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepMerge merges array element types with Source winning on overlap.
 */
export function test_types_deep_merge_array_element_overlapping() {
  type Question = DeepMerge<{ items: { id: number; name: string }[] }, { items: { id: string; active: boolean }[] }>;
  type Answer = Equal<Question, { items: { id: string; name: string; active: boolean }[] }>;
  ok(typia.random<Answer>());
}

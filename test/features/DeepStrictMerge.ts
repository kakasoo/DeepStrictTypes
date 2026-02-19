import { ok } from 'assert';
import typia from 'typia';
import { DeepStrictMerge, Equal } from '../../src';

/**
 * Tests that DeepStrictMerge correctly merges two objects with disjoint keys.
 */
export function test_types_deep_strict_merge_disjoint_keys() {
  type Question = DeepStrictMerge<{ a: number }, { b: string }>;
  type Answer = Equal<Question, { a: number; b: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge gives Target precedence for overlapping primitive keys.
 */
export function test_types_deep_strict_merge_overlapping_target_precedence() {
  type Question = DeepStrictMerge<{ a: number }, { a: string }>;
  type Answer = Equal<Question, { a: number }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge recursively merges nested objects with disjoint keys.
 */
export function test_types_deep_strict_merge_nested_objects() {
  type Question = DeepStrictMerge<{ a: { b: number } }, { a: { c: string } }>;
  type Answer = Equal<Question, { a: { b: number; c: string } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge recursively merges nested objects with overlapping keys (Target wins).
 */
export function test_types_deep_strict_merge_nested_overlapping() {
  type Question = DeepStrictMerge<{ a: { b: number; c: string } }, { a: { b: string; d: boolean } }>;
  type Answer = Equal<Question, { a: { b: number; c: string; d: boolean } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge merges top-level arrays of objects.
 */
export function test_types_deep_strict_merge_array_top_level() {
  type Question = DeepStrictMerge<{ a: number }[], { b: string }[]>;
  type Answer = Equal<Question, { a: number; b: string }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge merges array-typed properties within objects.
 */
export function test_types_deep_strict_merge_array_property() {
  type Question = DeepStrictMerge<{ items: { a: number }[] }, { items: { b: string }[] }>;
  type Answer = Equal<Question, { items: { a: number; b: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge returns never for array vs non-array at top level.
 */
export function test_types_deep_strict_merge_array_vs_non_array() {
  type Question = DeepStrictMerge<{ a: number }[], { b: string }>;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge returns never for property-level array vs non-array mismatch.
 */
export function test_types_deep_strict_merge_property_array_mismatch() {
  type Question = DeepStrictMerge<{ items: { a: number }[] }, { items: { b: string } }>;
  type Answer = Equal<Question, { items: never }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge handles deeply nested structures (3+ levels).
 */
export function test_types_deep_strict_merge_deeply_nested() {
  type Question = DeepStrictMerge<{ a: { b: { c: number } } }, { a: { b: { d: string } } }>;
  type Answer = Equal<Question, { a: { b: { c: number; d: string } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge preserves Source-only keys at nested levels.
 */
export function test_types_deep_strict_merge_source_only_nested() {
  type Question = DeepStrictMerge<{ a: { b: number } }, { a: { c: string }; d: boolean }>;
  type Answer = Equal<Question, { a: { b: number; c: string }; d: boolean }>;
  ok(typia.random<Answer>());
}

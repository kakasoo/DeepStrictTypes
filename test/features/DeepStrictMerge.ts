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

/**
 * Tests that DeepStrictMerge preserves Date properties from both Target and Source.
 */
export function test_types_deep_strict_merge_date_preserved() {
  type Question = DeepStrictMerge<{ createdAt: Date }, { updatedAt: Date }>;
  type Answer = Equal<Question, { createdAt: Date; updatedAt: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge preserves Date when both Target and Source have the same Date key.
 */
export function test_types_deep_strict_merge_overlapping_date() {
  type Question = DeepStrictMerge<{ date: Date }, { date: Date }>;
  type Answer = Equal<Question, { date: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictMerge preserves Date in nested objects.
 */
export function test_types_deep_strict_merge_nested_date() {
  type Question = DeepStrictMerge<{ a: { createdAt: Date; b: number } }, { a: { updatedAt: Date; c: string } }>;
  type Answer = Equal<Question, { a: { createdAt: Date; b: number; updatedAt: Date; c: string } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that a Source-only key with a Date value is taken directly from Source.
 * This proves the dead-code branch (re-checking `key extends keyof Target`) was unreachable:
 * if `key` is only in Source, the result must be `Source[key]` regardless of type.
 */
export function test_types_deep_strict_merge_source_only_date() {
  type Question = DeepStrictMerge<{ a: number }, { createdAt: Date }>;
  type Answer = Equal<Question, { a: number; createdAt: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that a Source-only key with a nested object value is taken directly from Source.
 * The dead code attempted to recursively merge Source[key] with Target[key],
 * but Target[key] doesn't exist for Source-only keys.
 */
export function test_types_deep_strict_merge_source_only_nested_object() {
  type Question = DeepStrictMerge<{ a: number }, { b: { c: string; d: boolean } }>;
  type Answer = Equal<Question, { a: number; b: { c: string; d: boolean } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that a Source-only key with an array-of-objects value is taken directly from Source.
 * The dead code attempted to merge array elements, but that's impossible for Source-only keys.
 */
export function test_types_deep_strict_merge_source_only_array_of_objects() {
  type Question = DeepStrictMerge<{ a: number }, { items: { id: number; name: string }[] }>;
  type Answer = Equal<Question, { a: number; items: { id: number; name: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that a Source-only key with a deeply nested object is taken as-is from Source.
 */
export function test_types_deep_strict_merge_source_only_deeply_nested_object() {
  type Question = DeepStrictMerge<{ x: number }, { y: { z: { w: string; v: Date } } }>;
  type Answer = Equal<Question, { x: number; y: { z: { w: string; v: Date } } }>;
  ok(typia.random<Answer>());
}

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

/**
 * Tests that Date is preserved when Target has Date and Source has a non-Date object at the same key.
 * Target wins because DeepStrictMerge gives Target precedence, and Date is treated as a leaf.
 */
export function test_types_deep_strict_merge_target_date_vs_source_object() {
  type Question = DeepStrictMerge<{ d: Date }, { d: { x: number } }>;
  type Answer = Equal<Question, { d: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Target (non-Date object) wins when Source has Date at the same key.
 * DeepStrictMerge gives Target precedence.
 */
export function test_types_deep_strict_merge_target_object_vs_source_date() {
  type Question = DeepStrictMerge<{ d: { x: number } }, { d: Date }>;
  type Answer = Equal<Question, { d: { x: number } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that Date properties are preserved inside array element merging.
 */
export function test_types_deep_strict_merge_date_in_array_elements() {
  type Question = DeepStrictMerge<
    { items: { createdAt: Date; a: number }[] },
    { items: { updatedAt: Date; b: string }[] }
  >;
  type Answer = Equal<Question, { items: { createdAt: Date; a: number; updatedAt: Date; b: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests Date preservation in deeply nested objects (3+ levels) mixed with other properties.
 */
export function test_types_deep_strict_merge_date_deeply_nested_mixed() {
  type Question = DeepStrictMerge<
    { a: { b: { c: Date; d: number }; e: Date } },
    { a: { b: { c: Date; f: string }; e: { g: boolean } } }
  >;
  type Answer = Equal<Question, { a: { b: { c: Date; d: number; f: string }; e: Date } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that multiple Date properties at different nesting levels are all preserved correctly.
 */
export function test_types_deep_strict_merge_multiple_dates_various_levels() {
  type Question = DeepStrictMerge<
    { created: Date; meta: { updated: Date; info: { archived: Date; name: string } } },
    { deleted: Date; meta: { published: Date; info: { archived: Date; desc: string } } }
  >;
  type Answer = Equal<
    Question,
    {
      created: Date;
      meta: { updated: Date; info: { archived: Date; name: string; desc: string }; published: Date };
      deleted: Date;
    }
  >;
  ok(typia.random<Answer>());
}

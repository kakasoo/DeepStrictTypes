import { ok } from 'node:assert';
import typia from 'typia';
import { DeepStrictUnbrand, Equal } from '../../src';

/**
 * Tests that DeepStrictUnbrand correctly handles empty array.
 */
export function test_types_deep_strict_unbrand_empty_array() {
  type Question = DeepStrictUnbrand<[]>;
  type Answer = Equal<Question, []>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles two-dimensional empty array.
 */
export function test_types_deep_strict_unbrand_2d_empty_array() {
  type Question = DeepStrictUnbrand<[][]>;
  type Answer = Equal<Question, [][]>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles non-brand types.
 */
export function test_types_deep_strict_unbrand_non_brand_type() {
  type Question = DeepStrictUnbrand<string | Date>;
  type Answer = Equal<Question, string | Date>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles property that is not a brand type.
 */
export function test_types_deep_strict_unbrand_property_non_brand() {
  type Question = DeepStrictUnbrand<{ prop: string | Date }>;
  type Answer = Equal<Question, { prop: string | Date }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles brand types by removing branding.
 */
export function test_types_deep_strict_unbrand_brand_type() {
  type Question = DeepStrictUnbrand<string & Date>;
  type Answer = Equal<Question, string>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles property that is a brand type.
 */
export function test_types_deep_strict_unbrand_property_brand() {
  type Question = DeepStrictUnbrand<{ prop: string }>;
  type Answer = Equal<Question, { prop: string }>;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles brand type in nested object.
 */
export function test_types_deep_strict_unbrand_nested_brand_type() {
  type Question = DeepStrictUnbrand<{
    nested: {
      prop: number & {
        type: 'WON';
      };
    };
  }>;

  type Answer = Equal<
    Question,
    {
      nested: {
        prop: number;
      };
    }
  >;

  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles any array.
 */
export function test_types_deep_strict_unbrand_any_array() {
  type Question = DeepStrictUnbrand<any[]>;
  type Answer = Equal<Question, any[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand correctly handles array of objects.
 */
export function test_types_deep_strict_unbrand_object_array() {
  type Question = DeepStrictUnbrand<{ a: number }[]>;
  type Answer = Equal<Question, { a: number }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand strips typia Format tag from string.
 */
export function test_types_deep_strict_unbrand_typia_format_tag() {
  type Branded = string & { __typiaFormat: 'uuid' };
  type Question = DeepStrictUnbrand<{ id: Branded }>;
  type Answer = Equal<Question, { id: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand handles multiple branded properties.
 */
export function test_types_deep_strict_unbrand_multiple_branded() {
  type Question = DeepStrictUnbrand<{
    id: string & { __brand: 'ID' };
    count: number & { __brand: 'Count' };
    name: string;
  }>;
  type Answer = Equal<Question, { id: string; count: number; name: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand handles branded types inside array elements.
 */
export function test_types_deep_strict_unbrand_branded_in_array() {
  type Question = DeepStrictUnbrand<{ id: number & { __brand: 'ID' } }[]>;
  type Answer = Equal<Question, { id: number }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand preserves Date type (does not unbrand it).
 */
export function test_types_deep_strict_unbrand_preserves_date() {
  type Question = DeepStrictUnbrand<{ created: Date; name: string }>;
  type Answer = Equal<Question, { created: Date; name: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictUnbrand handles deeply nested branded type (3 levels).
 */
export function test_types_deep_strict_unbrand_deeply_nested_brand() {
  type Question = DeepStrictUnbrand<{
    a: {
      b: {
        value: number & { __brand: 'Money' };
      };
    };
  }>;
  type Answer = Equal<Question, { a: { b: { value: number } } }>;
  ok(typia.random<Answer>());
}

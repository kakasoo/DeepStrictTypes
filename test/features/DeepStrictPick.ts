import { ok } from 'assert';
import typia from 'typia';
import { MaxLength, MinLength } from 'typia/lib/tags';
import { DeepStrictPick, Equal } from '../../src';

import { IShoppingSale } from '@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSale';

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
  type Question = DeepStrictPick<{ data: { items: { id: number; name: string }[] } }, 'data.items[*].id'>;
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
  type Question = DeepStrictPick<{ items: { id: number; name: string }[]; other: boolean }, 'items[*].*'>;

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

/**
 * Tests that DeepStrictPick picks multiple nested keys from the same parent.
 */
export function test_types_deep_strict_pick_multiple_from_same_parent() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2; d: 3 } }, 'a.b' | 'a.c'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick picks nested keys from different parents.
 */
export function test_types_deep_strict_pick_different_parents() {
  type Question = DeepStrictPick<{ a: { x: 1; y: 2 }; b: { x: 3; y: 4 } }, 'a.x' | 'b.y'>;
  type Answer = Equal<Question, { a: { x: 1 }; b: { y: 4 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick preserves branding types (typia Format).
 */
export function test_types_deep_strict_pick_branding_type() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    name: string;
    age: number;
  };
  type Answer = Equal<DeepStrictPick<Question, 'id'>, { id: string & typia.tags.Format<'uuid'> }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick preserves nested branding types.
 */
export function test_types_deep_strict_pick_nested_branding_type() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'>; title: string };
    name: string;
  };
  type Answer = Equal<DeepStrictPick<Question, 'content.id'>, { content: { id: string & typia.tags.Format<'uuid'> } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick works with nullable branding types in arrays.
 */
export function test_types_deep_strict_pick_nullable_branding_in_array() {
  type TestInterface = {
    id: string;
    title: string;
    thumbnails: {
      name: null | (string & MinLength<1> & MaxLength<255>);
      extension: null | (string & MinLength<1> & MaxLength<8>);
      url: string;
    }[];
  };

  type Question = DeepStrictPick<TestInterface, 'thumbnails[*].name' | 'thumbnails[*].url'>;
  type Answer = Equal<
    Question,
    {
      thumbnails: {
        name: null | (string & MinLength<1> & MaxLength<255>);
        url: string;
      }[];
    }
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick picks a parent key preserving the entire subtree.
 */
export function test_types_deep_strict_pick_parent_preserves_subtree() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 }; d: 3 }, 'a'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick works with root-level arrays picking multiple keys.
 */
export function test_types_deep_strict_pick_root_array_multiple_keys() {
  type Question = DeepStrictPick<{ a: 1; b: 2; c: 3 }[], '[*].a' | '[*].b'>;
  type Answer = Equal<Question, { a: 1; b: 2 }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick works mixing array element keys and top-level keys.
 */
export function test_types_deep_strict_pick_array_element_and_top_level() {
  type Question = DeepStrictPick<
    { items: { id: number; name: string }[]; title: string; age: number },
    'items[*].id' | 'title'
  >;
  type Answer = Equal<Question, { items: { id: number }[]; title: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick works at 4 levels of nesting.
 */
export function test_types_deep_strict_pick_four_levels() {
  type Question = DeepStrictPick<{ a: { b: { c: { d: 1; e: 2 }; f: 3 } } }, 'a.b.c.d'>;
  type Answer = Equal<Question, { a: { b: { c: { d: 1 } } } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with redundant glob + specific key works correctly.
 */
export function test_types_deep_strict_pick_glob_with_redundant_specific() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 }; d: 3 }, 'a.*' | 'a.b'>;
  type Answer = Equal<Question, { a: { b: 1; c: 2 } }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick handles nested arrays (array of arrays of objects).
 */
export function test_types_deep_strict_pick_nested_array_of_arrays() {
  type Question = DeepStrictPick<{ data: { tags: { label: string; value: number }[] }[] }, 'data[*].tags[*].label'>;
  type Answer = Equal<Question, { data: { tags: { label: string }[] }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick works with a complex real-world type.
 */
export function test_types_deep_strict_pick_complex_real_world() {
  type ISummary = Pick<IShoppingSale.ISummary, 'id' | 'content'>;
  type Question = DeepStrictPick<ISummary, 'content.id'>;
  type __Answer = { content: Pick<ISummary['content'], 'id'> };

  type IsAnswer = Equal<Question, __Answer>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictPick picks multiple keys from array elements.
 */
export function test_types_deep_strict_pick_multiple_from_array_element() {
  type Question = DeepStrictPick<
    { items: { id: number; name: string; active: boolean }[] },
    'items[*].id' | 'items[*].name'
  >;
  type Answer = Equal<Question, { items: { id: number; name: string }[] }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick preserves multiple Date properties.
 */
export function test_types_deep_strict_pick_multiple_dates() {
  type Question = DeepStrictPick<{ created: Date; updated: Date; name: string; id: number }, 'created' | 'updated'>;
  type Answer = Equal<Question, { created: Date; updated: Date }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick with glob on array elements picks all properties.
 */
export function test_types_deep_strict_pick_glob_array_element_with_top_level() {
  type Question = DeepStrictPick<
    { items: { id: number; name: string }[]; count: number; label: string },
    'items[*].*' | 'count'
  >;
  type Answer = Equal<Question, { items: { id: number; name: string }[]; count: number }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick can pick a deeply nested key alongside a shallow one.
 */
export function test_types_deep_strict_pick_deep_and_shallow() {
  type Question = DeepStrictPick<{ a: { b: { c: { d: number } } }; x: string }, 'a.b.c.d' | 'x'>;
  type Answer = Equal<Question, { a: { b: { c: { d: number } } }; x: string }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick from single-property object returns same shape.
 */
export function test_types_deep_strict_pick_single_property_object() {
  type Question = DeepStrictPick<{ only: number }, 'only'>;
  type Answer = Equal<Question, { only: number }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictPick handles 5 levels of nesting.
 */
export function test_types_deep_strict_pick_five_levels() {
  type Question = DeepStrictPick<{ a: { b: { c: { d: { e: 42 } } } } }, 'a.b.c.d.e'>;
  type Answer = Equal<Question, { a: { b: { c: { d: { e: 42 } } } } }>;
  ok(typia.random<Answer>());
}

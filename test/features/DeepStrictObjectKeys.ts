import { ok } from 'node:assert';
import typia, { tags } from 'typia';
import { DeepStrictObjectKeys, Equal } from '../../src';

/**
 * Tests that DeepStrictObjectKeys returns never for empty array with unsafe mode.
 */
export function test_types_deep_strict_object_keys_empty_array_unsafe() {
  type Question = DeepStrictObjectKeys<
    [],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns never for empty array with safe mode.
 */
export function test_types_deep_strict_object_keys_empty_array_safe() {
  type Question = DeepStrictObjectKeys<
    [],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns array notation for any array with unsafe mode.
 */
export function test_types_deep_strict_object_keys_any_array_unsafe() {
  type Question = DeepStrictObjectKeys<
    any[],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns array notation for any array with safe mode.
 */
export function test_types_deep_strict_object_keys_any_array_safe() {
  type Question = DeepStrictObjectKeys<
    any[],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns array notation for number tuple with unsafe mode.
 */
export function test_types_deep_strict_object_keys_number_tuple_unsafe() {
  type Question = DeepStrictObjectKeys<
    [1],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns array notation for number tuple with safe mode.
 */
export function test_types_deep_strict_object_keys_number_tuple_safe() {
  type Question = DeepStrictObjectKeys<
    [1],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles Date properties with unsafe mode.
 */
export function test_types_deep_strict_object_keys_date_props_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: Date;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles Date properties with safe mode.
 */
export function test_types_deep_strict_object_keys_date_props_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: Date;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles union with Date and string with unsafe mode.
 */
export function test_types_deep_strict_object_keys_union_date_string_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: Date | string;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles union with Date and string with safe mode.
 */
export function test_types_deep_strict_object_keys_union_date_string_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: Date | string;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles branding type of string (typia) with unsafe mode.
 */
export function test_types_deep_strict_object_keys_branding_string_typia_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: string & tags.Format<'date-time'>;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles branding type of string (typia) with safe mode.
 */
export function test_types_deep_strict_object_keys_branding_string_typia_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: string & tags.Format<'date-time'>;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array as branding type of string (typia) with unsafe mode.
 */
export function test_types_deep_strict_object_keys_array_branding_string_typia_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (string & tags.Format<'date-time'>)[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;

  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array as branding type of string (typia) with safe mode.
 */
export function test_types_deep_strict_object_keys_array_branding_string_typia_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (string & tags.Format<'date-time'>)[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles branding type of string with unsafe mode.
 */
export function test_types_deep_strict_object_keys_branding_string_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number & { unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles branding type of string with safe mode.
 */
export function test_types_deep_strict_object_keys_branding_string_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number & { unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys applies conservative type reasoning for primitive and object union with unsafe mode.
 */
export function test_types_deep_strict_object_keys_primitive_object_union_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number | { value: number; unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit' | '*' | 'prop.*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys applies conservative type reasoning for primitive and object union with safe mode.
 */
export function test_types_deep_strict_object_keys_primitive_object_union_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number | { value: number; unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys applies conservative type reasoning for primitive and array union with unsafe mode.
 */
export function test_types_deep_strict_object_keys_primitive_array_union_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;

  type Answer = Equal<Question, 'prop' | 'other' | 'prop[*].value' | 'prop[*].unit' | '*' | 'prop[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys applies conservative type reasoning for primitive and array union with safe mode.
 */
export function test_types_deep_strict_object_keys_primitive_array_union_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys applies conservative type reasoning for object and array union with unsafe mode.
 */
export function test_types_deep_strict_object_keys_object_array_union_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<
    Question,
    'prop' | 'other' | 'prop.value' | 'prop.unit' | 'prop[*].value' | 'prop[*].unit' | '*' | 'prop.*' | 'prop[*].*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys applies conservative type reasoning for object and array union with safe mode.
 */
export function test_types_deep_strict_object_keys_object_array_union_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles nested object with 2 depth with unsafe mode.
 */
export function test_types_deep_strict_object_keys_nested_object_2_depth_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit' | '*' | 'prop.*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles nested object with 2 depth with safe mode.
 */
export function test_types_deep_strict_object_keys_nested_object_2_depth_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | 'prop.value' | 'prop.unit' | '*' | 'prop.*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles nested object with 3 depth with unsafe mode.
 */
export function test_types_deep_strict_object_keys_nested_object_3_depth_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: {
        value: number;
        unit: 'dollar';
        country: {
          name: string;
          location: string;
        };
      };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<
    Question,
    | 'prop' // depth 1
    | 'other'
    | 'prop.value' // depth 2
    | 'prop.unit'
    | 'prop.country'
    | 'prop.country.name' // depth 3
    | 'prop.country.location'
    | '*'
    | 'prop.*'
    | 'prop.country.*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles nested object with 3 depth with safe mode.
 */
export function test_types_deep_strict_object_keys_nested_object_3_depth_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: {
        value: number;
        unit: 'dollar';
        country: {
          name: string;
          location: string;
        };
      };
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<
    Question,
    | 'prop' // depth 1
    | 'other'
    | 'prop.value' // depth 2
    | 'prop.unit'
    | 'prop.country'
    | 'prop.country.name' // depth 3
    | 'prop.country.location'
    | '*'
    | 'prop.*'
    | 'prop.country.*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array property with unsafe mode.
 */
export function test_types_deep_strict_object_keys_array_property_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array property with safe mode.
 */
export function test_types_deep_strict_object_keys_array_property_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: number[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles union array property with unsafe mode.
 */
export function test_types_deep_strict_object_keys_union_array_property_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (number | string)[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles union array property with safe mode.
 */
export function test_types_deep_strict_object_keys_union_array_property_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (number | string)[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array of branding type of string property with unsafe mode.
 */
export function test_types_deep_strict_object_keys_array_branding_string_property_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (string & { unit: 'dollar' | 'won' })[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array of branding type of string property with safe mode.
 */
export function test_types_deep_strict_object_keys_array_branding_string_property_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (string & { unit: 'dollar' | 'won' })[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array of branding type of string property (typia) with unsafe mode.
 */
export function test_types_deep_strict_object_keys_array_branding_string_typia_property_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (string & tags.Format<'uuid'>)[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array of branding type of string property (typia) with safe mode.
 */
export function test_types_deep_strict_object_keys_array_branding_string_typia_property_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: (string & tags.Format<'uuid'>)[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | '*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array of object with branding properties with unsafe mode.
 */
export function test_types_deep_strict_object_keys_array_object_branding_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, 'prop' | 'other' | 'prop[*].unit' | 'prop[*].value' | '*' | 'prop[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles array of object with branding properties with safe mode.
 */
export function test_types_deep_strict_object_keys_array_object_branding_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    },
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, 'prop' | 'other' | 'prop[*].unit' | 'prop[*].value' | '*' | 'prop[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles keys in an array with unsafe mode.
 */
export function test_types_deep_strict_object_keys_in_array_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<
    Question,
    '[*]' | '[*].prop' | '[*].other' | '[*].prop[*].value' | '[*].prop[*].unit' | '[*].*' | '[*].prop[*].*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles keys in an array with safe mode.
 */
export function test_types_deep_strict_object_keys_in_array_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<
    Question,
    '[*]' | '[*].prop' | '[*].other' | '[*].prop[*].value' | '[*].prop[*].unit' | '[*].*' | '[*].prop[*].*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles keys in a two-dimensional array with unsafe mode.
 */
export function test_types_deep_strict_object_keys_in_2d_array_unsafe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[][],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<
    Question,
    | '[*]'
    | '[*].[*]'
    | '[*].[*].prop'
    | '[*].[*].other'
    | '[*].[*].prop[*].value'
    | '[*].[*].prop[*].unit'
    | '[*].[*].*'
    | '[*].[*].prop[*].*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles keys in a two-dimensional array with safe mode.
 */
export function test_types_deep_strict_object_keys_in_2d_array_safe() {
  type Question = DeepStrictObjectKeys<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[][],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<
    Question,
    | '[*]'
    | '[*].[*]'
    | '[*].[*].prop'
    | '[*].[*].other'
    | '[*].[*].prop[*].value'
    | '[*].[*].prop[*].unit'
    | '[*].[*].*'
    | '[*].[*].prop[*].*'
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles readonly empty array (tuple) with unsafe mode.
 */
export function test_types_deep_strict_object_keys_readonly_empty_array_unsafe() {
  type Question = DeepStrictObjectKeys<
    readonly [],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles readonly empty array (tuple) with safe mode.
 */
export function test_types_deep_strict_object_keys_readonly_empty_array_safe() {
  type Question = DeepStrictObjectKeys<
    readonly [],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles readonly not empty array (tuple) with unsafe mode.
 */
export function test_types_deep_strict_object_keys_readonly_not_empty_array_unsafe() {
  type Question = DeepStrictObjectKeys<
    readonly [1],
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles readonly not empty array (tuple) with safe mode.
 */
export function test_types_deep_strict_object_keys_readonly_not_empty_array_safe() {
  type Question = DeepStrictObjectKeys<
    readonly [1],
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles Array<{a:number}> with unsafe mode.
 */
export function test_types_deep_strict_object_keys_array_object_a_number_unsafe() {
  type Target = { a: number }[];

  type Question = DeepStrictObjectKeys<
    Target,
    {
      array: '[*]';
      object: '.';
    },
    false
  >;
  type Answer = Equal<Question, '[*]' | '[*].a' | '[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly handles Array<{a:number}> with safe mode.
 */
export function test_types_deep_strict_object_keys_array_object_a_number_safe() {
  type Target = { a: number }[];

  type Question = DeepStrictObjectKeys<
    Target,
    {
      array: '[*]';
      object: '.';
    },
    true
  >;
  type Answer = Equal<Question, '[*]' | '[*].a' | '[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys includes glob '*' for flat objects.
 */
export function test_types_deep_strict_object_keys_glob_flat() {
  type Keys = DeepStrictObjectKeys<{ a: 1; b: 2 }>;
  type Answer = Equal<'*' extends Keys ? true : false, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys includes 'a.*' for nested objects.
 */
export function test_types_deep_strict_object_keys_glob_nested() {
  type Keys = DeepStrictObjectKeys<{ a: { b: 1; c: 2 } }>;
  type Answer = Equal<'a.*' extends Keys ? true : false, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys includes 'items[*].*' for array of objects.
 */
export function test_types_deep_strict_object_keys_glob_array() {
  type Keys = DeepStrictObjectKeys<{ items: { id: number }[] }>;
  type Answer = Equal<'items[*].*' extends Keys ? true : false, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys includes '[*].*' for root-level arrays.
 */
export function test_types_deep_strict_object_keys_glob_root_array() {
  type Keys = DeepStrictObjectKeys<{ a: 1 }[]>;
  type Answer = Equal<'[*].*' extends Keys ? true : false, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys does NOT include '*' for empty objects.
 */
export function test_types_deep_strict_object_keys_glob_empty() {
  type Keys = DeepStrictObjectKeys<{}>;
  type Answer = Equal<'*' extends Keys ? true : false, false>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys includes 'a.b.*' for deeply nested objects.
 */
export function test_types_deep_strict_object_keys_glob_deep_nested() {
  type Keys = DeepStrictObjectKeys<{ a: { b: { c: 1; d: 2 } } }>;
  type Answer = Equal<'a.b.*' extends Keys ? true : false, true>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns never for an empty tuple.
 */
export function test_types_deep_strict_object_keys_empty_tuple() {
  type Question = DeepStrictObjectKeys<[]>;
  type Answer = Equal<Question, never>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns '[*]' for a single-element primitive tuple.
 */
export function test_types_deep_strict_object_keys_primitive_tuple() {
  type Question = DeepStrictObjectKeys<['a']>;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns '[*]' for a multi-element primitive tuple.
 */
export function test_types_deep_strict_object_keys_multi_primitive_tuple() {
  type Question = DeepStrictObjectKeys<[string, number]>;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns '[*]' for a readonly primitive tuple.
 */
export function test_types_deep_strict_object_keys_readonly_primitive_tuple() {
  type Question = DeepStrictObjectKeys<readonly ['a']>;
  type Answer = Equal<Question, '[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns correct keys for a tuple of objects
 * with the same shape.
 */
export function test_types_deep_strict_object_keys_same_shape_object_tuple() {
  type Question = DeepStrictObjectKeys<[{ a: 1 }, { a: 2 }]>;
  type Answer = Equal<Question, '[*]' | '[*].a' | '[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys returns correct keys for a heterogeneous tuple
 * where elements have different shapes.
 */
export function test_types_deep_strict_object_keys_heterogeneous_object_tuple() {
  type Question = DeepStrictObjectKeys<[{ a: 1 }, { b: 2 }]>;
  type Answer = Equal<Question, '[*]' | '[*].a' | '[*].b' | '[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys correctly recurses into nested tuple elements
 * when the tuple is a property of an object.
 */
export function test_types_deep_strict_object_keys_nested_heterogeneous_tuple() {
  type Question = DeepStrictObjectKeys<{ items: [{ a: 1 }, { b: 2 }] }>;
  type Answer = Equal<Question, '*' | 'items' | 'items[*].a' | 'items[*].b' | 'items[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys handles a nested same-shape object tuple.
 */
export function test_types_deep_strict_object_keys_nested_same_shape_tuple() {
  type Question = DeepStrictObjectKeys<{ items: [{ a: 1 }, { a: 2 }] }>;
  type Answer = Equal<Question, '*' | 'items' | 'items[*].a' | 'items[*].*'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that DeepStrictObjectKeys handles a nested primitive tuple
 * (no deeper recursion needed).
 */
export function test_types_deep_strict_object_keys_nested_primitive_tuple() {
  type Question = DeepStrictObjectKeys<{ items: [string, number] }>;
  type Answer = Equal<Question, '*' | 'items'>;
  ok(typia.random<Answer>());
}

import { ok } from 'assert';
import typia, { tags } from 'typia';
import { Equal, GetType } from '../../src';

/**
 * Tests that GetType correctly retrieves Date property type.
 */
export function test_types_get_type_date_props() {
  type Question = GetType<
    {
      prop: Date;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, Date>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves union with Date and string.
 */
export function test_types_get_type_union_date_string() {
  type Question = GetType<
    {
      prop: Date | string;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, Date | string>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves branding type of string (typia).
 */
export function test_types_get_type_branding_string_typia() {
  type Question = GetType<
    {
      prop: string & tags.Format<'date-time'>;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, string & tags.Format<'date-time'>>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves branding type of number.
 */
export function test_types_get_type_branding_number() {
  type Question = GetType<
    {
      prop: number & { unit: 'dollar' | 'won' };
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number & { unit: 'dollar' | 'won' }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly handles primitive and object union type.
 */
export function test_types_get_type_primitive_object_union() {
  type Question = GetType<
    {
      prop: number | { value: number; unit: 'dollar' | 'won' };
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number | { value: number; unit: 'dollar' | 'won' }>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly handles primitive and array union type.
 */
export function test_types_get_type_primitive_array_union() {
  type Question = GetType<
    {
      prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number | Array<{ value: number; unit: 'dollar' | 'won' }>>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly handles union type with object and array.
 */
export function test_types_get_type_object_array_union() {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<
    Question,
    { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>
  >;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves nested object property with 2 depth (value).
 */
export function test_types_get_type_nested_2_depth_value() {
  type Answer = Equal<
    GetType<
      {
        prop: { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      'prop.value'
    >,
    number
  >;

  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves nested object property with 2 depth (unit).
 */
export function test_types_get_type_nested_2_depth_unit() {
  type Answer = Equal<
    GetType<
      {
        prop: { value: number; unit: 'dollar' | 'won' };
        other: number;
      },
      'prop.unit'
    >,
    'dollar' | 'won'
  >;

  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves nested object property with 3 depth.
 */
export function test_types_get_type_nested_3_depth() {
  type Question = GetType<
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
    'prop.country.name'
  >;
  type Answer = Equal<Question, string>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves array property type.
 */
export function test_types_get_type_array_property() {
  type Question = GetType<
    {
      prop: number[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, number[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves union array property type.
 */
export function test_types_get_type_union_array_property() {
  type Question = GetType<
    {
      prop: (number | string)[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, (string | number)[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves array of branding type of string property.
 */
export function test_types_get_type_array_branding_string() {
  type Question = GetType<
    {
      prop: (string & { unit: 'dollar' | 'won' })[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, (string & { unit: 'dollar' | 'won' })[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves array of branding type of string property (typia).
 */
export function test_types_get_type_array_branding_string_typia() {
  type Question = GetType<
    {
      prop: (string & tags.Format<'uuid'>)[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, (string & tags.Format<'uuid'>)[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves array of object with branding properties.
 */
export function test_types_get_type_array_object_branding() {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    },
    'prop'
  >;
  type Answer = Equal<Question, { value: number; unit: 'dollar' | 'won' }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves property from array using array notation.
 */
export function test_types_get_type_array_notation() {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[],
    '[*].prop'
  >;
  type Answer = Equal<Question, { value: number; unit: 'dollar' | 'won' }[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that GetType correctly retrieves property from two-dimensional array.
 */
export function test_types_get_type_2d_array_property() {
  type Question = GetType<
    {
      prop: { value: number; unit: 'dollar' | 'won' }[];
      other: number;
    }[][],
    '[*].[*].prop[*].unit'
  >;
  type Answer = Equal<Question, 'dollar' | 'won'>;
  ok(typia.random<Answer>());
}

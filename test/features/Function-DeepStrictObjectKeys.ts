import assert, { deepStrictEqual, ok } from 'node:assert';
import typia, { tags } from 'typia';
import { DeepStrictObjectKeys, deepStrictObjectKeys, Equal } from '../../src';

/**
 * Tests that deepStrictObjectKeys returns empty array for empty object.
 */
export function test_functions_deep_strict_object_keys_empty_object() {
  const keys = deepStrictObjectKeys({}); // It must be just `[]`.
  type Answer = Equal<typeof keys, never[]>;
  ok(typia.random<Answer>());
}

/**
 * Tests that deepStrictObjectKeys returns empty array for empty array.
 */
export function test_functions_deep_strict_object_keys_empty_array() {
  const keys = deepStrictObjectKeys([]); // It must be just `[]`.
  const elements: string[] = [];
  deepStrictEqual(keys, elements);
}

/**
 * Tests that deepStrictObjectKeys returns empty array for empty readonly array.
 */
export function test_functions_deep_strict_object_keys_empty_readonly_array() {
  const keys = deepStrictObjectKeys([] as const); // It must be just `[]`.
  const elements: string[] = [];
  deepStrictEqual(keys, elements);
}

/**
 * Tests that deepStrictObjectKeys correctly handles array in object with const assertion.
 */
export function test_functions_deep_strict_object_keys_array_in_object_const() {
  const keys = deepStrictObjectKeys({ a: [1] } as const); // It must be just `['a', 'a.0']`.
  const elements = ['a', 'a.0'];

  assert(typia.misc.literals<(typeof keys)[number]>().length === elements.length);
  deepStrictEqual(keys, elements);
}

/**
 * Tests that deepStrictObjectKeys correctly handles object with empty array property.
 */
export function test_functions_deep_strict_object_keys_object_empty_array_property() {
  const target = { a: [] } as const;
  const keys = deepStrictObjectKeys(target); // ['a']
  const elements = ['a'];

  assert(typia.misc.literals<(typeof keys)[number]>().length === elements.length);
  deepStrictEqual(keys, elements);
}

/**
 * Tests that deepStrictObjectKeys correctly handles object with multi-element array.
 */
export function test_functions_deep_strict_object_keys_object_multi_element_array() {
  const target = { a: [1, 2, 3, 4] } as const;
  const keys = deepStrictObjectKeys(target);
  const elements = ['a', 'a.0', 'a.1', 'a.2', 'a.3'];

  assert(typia.misc.literals<(typeof keys)[number]>().length === elements.length);
  deepStrictEqual(keys, elements);
}

/**
 * Tests that deepStrictObjectKeys correctly handles Date properties.
 */
export function test_functions_deep_strict_object_keys_date_props() {
  interface Target {
    prop: Date;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles union with Date and string.
 */
export function test_functions_deep_strict_object_keys_union_date_string() {
  interface Target {
    prop: Date | string;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys treats Date as a leaf when nested inside an object.
 * Verifies that keys like "meta.createdAt.toISOString" are NOT produced.
 */
export function test_functions_deep_strict_object_keys_date_nested_in_object() {
  interface Target {
    meta: {
      createdAt: Date;
      updatedAt: Date;
      label: string;
    };
    id: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys treats Date as a leaf inside arrays.
 * Ensures array elements containing Date properties do not recurse into Date methods.
 */
export function test_functions_deep_strict_object_keys_date_in_array_elements() {
  interface Target {
    events: {
      name: string;
      occurredAt: Date;
    }[];
  }
  const target: Target = {
    events: [
      { name: 'login', occurredAt: new Date() },
      { name: 'logout', occurredAt: new Date() },
    ],
  };

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(!key.includes('toISOString'), `Date method leaked into keys: ${key}`);
    ok(!key.includes('getTime'), `Date method leaked into keys: ${key}`);
    ok(!key.includes('getFullYear'), `Date method leaked into keys: ${key}`);
  }
}

/**
 * Tests that deepStrictObjectKeys handles objects with multiple Date fields at different depths.
 */
export function test_functions_deep_strict_object_keys_multiple_dates_at_different_depths() {
  interface Target {
    topDate: Date;
    nested: {
      midDate: Date;
      deep: {
        bottomDate: Date;
        value: number;
      };
    };
  }
  const target: Target = {
    topDate: new Date(),
    nested: {
      midDate: new Date(),
      deep: {
        bottomDate: new Date(),
        value: 42,
      },
    },
  };

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles branding type of string (typia).
 */
export function test_functions_deep_strict_object_keys_branding_string_typia() {
  interface Target {
    prop: string & tags.Format<'date-time'>;
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles branding type of number.
 */
export function test_functions_deep_strict_object_keys_branding_number() {
  interface Target {
    prop: number & { unit: 'dollar' | 'won' };
    other: number;
  }
  const target: Target = { prop: 1 as number & { unit: 'dollar' | 'won' }, other: 1 };

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys applies conservative type reasoning for primitive and object union.
 */
export function test_functions_deep_strict_object_keys_primitive_object_union() {
  interface Target {
    prop: number | { value: number; unit: 'dollar' | 'won' };
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys applies conservative type reasoning for primitive and array union.
 */
export function test_functions_deep_strict_object_keys_primitive_array_union() {
  interface Target {
    prop: number | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`>(key);
    ok(result, `actual: ${key}`);
  }
}

/**
 * Tests that deepStrictObjectKeys applies conservative type reasoning for object and array union.
 */
export function test_functions_deep_strict_object_keys_object_array_union() {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' } | Array<{ value: number; unit: 'dollar' | 'won' }>;
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<
      'prop' | 'other' | 'prop.value' | 'prop.unit' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`
    >(key);
    ok(result, `actual: ${key}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles nested object with 2 depth.
 */
export function test_functions_deep_strict_object_keys_nested_object_2_depth() {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' };
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles nested object with 3 depth.
 */
export function test_functions_deep_strict_object_keys_nested_object_3_depth() {
  interface Target {
    prop: {
      value: number;
      unit: 'dollar';
      country: {
        name: string;
        location: string;
      };
    };
    other: number;
  }
  const target = typia.random<Target>();

  const elements = typia.misc.literals<DeepStrictObjectKeys<Target, { array: '[*]'; object: '.' }, false>>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    ok(elements.includes(key), `${key} is not in ${JSON.stringify(elements)}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles array property.
 */
export function test_functions_deep_strict_object_keys_array_property() {
  interface Target {
    prop: number[];
    other: number;
  }
  const target = typia.random<Target>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}`>(key);
    ok(result);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles union array property.
 */
export function test_functions_deep_strict_object_keys_union_array_property() {
  interface Target {
    prop: (number | string)[];
    other: number;
  }
  const target = typia.random<Target>();
  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}`>(key);
    ok(result);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles array of branding type of string property.
 */
export function test_functions_deep_strict_object_keys_array_branding_string() {
  interface Target {
    prop: (string & { unit: 'dollar' | 'won' })[];
    other: number;
  }
  const target: Target = { prop: ['1' as string & { unit: 'dollar' | 'won' }], other: 1 };
  const keys = deepStrictObjectKeys(target); // 'prop', 'other'
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}`>(key);
    ok(result, `actual: ${key}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles array of branding type string with typia tags.
 */
export function test_functions_deep_strict_object_keys_array_branding_string_typia() {
  interface Target {
    prop: (string & tags.Format<'uuid'>)[];
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`>(key);
    ok(result);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles array of object with branding properties.
 */
export function test_functions_deep_strict_object_keys_array_object_branding() {
  interface Target {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<'prop' | 'other' | `prop.${number}` | `prop.${number}.value` | `prop.${number}.unit`>(key);
    ok(result);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles keys in an array.
 */
export function test_functions_deep_strict_object_keys_in_array() {
  type Target = {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }[];
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<
      | `${number}`
      | `${number}.prop.${number}`
      | `${number}.prop`
      | `${number}.other`
      | `${number}.prop.${number}.value`
      | `${number}.prop.${number}.unit`
    >(key);
    ok(result);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles keys in a two-dimensional array.
 */
export function test_functions_deep_strict_object_keys_in_2d_array() {
  type Target = {
    prop: { value: number; unit: 'dollar' | 'won' }[];
    other: number;
  }[][];
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target);
  for (const key of keys) {
    const result = typia.is<
      | `${number}`
      | `${number}.${number}`
      | `${number}.${number}.prop`
      | `${number}.${number}.other`
      | `${number}.${number}.prop.${number}`
      | `${number}.${number}.prop.${number}.value`
      | `${number}.${number}.prop.${number}.unit`
    >(key);
    ok(result, `actual: ${key}`);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles simple keys in a two-dimensional array.
 */
export function test_functions_deep_strict_object_keys_simple_in_2d_array() {
  type Target = { a: 1 }[][];
  const target = typia.random<Target>();

  const keys = deepStrictObjectKeys(target); // 0.0.a, 0.1.a, 1.0.a ... `${number}.${number}.a`
  for (const key of keys) {
    const result = typia.is<`${number}` | `${number}.${number}` | `${number}.${number}.a`>(key);
    ok(result);
  }
}

/**
 * Tests that deepStrictObjectKeys correctly handles empty array with const assertion.
 */
export function test_functions_deep_strict_object_keys_empty_array_const() {
  const keys = deepStrictObjectKeys([] as const);
  deepStrictEqual(keys, []);
}

/**
 * Tests that deepStrictObjectKeys correctly handles non-empty array with const assertion.
 */
export function test_functions_deep_strict_object_keys_array_const() {
  const keys = deepStrictObjectKeys([1] as const);
  for (const key of keys) {
    const result = typia.is<`${number}`>(key);
    ok(result);
  }
}

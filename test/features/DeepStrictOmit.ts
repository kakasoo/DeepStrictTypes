import { ok } from 'assert';
import typia from 'typia';
import { MaxLength, MinLength } from 'typia/lib/tags';
import { DeepStrictOmit, Equal } from '../../src';

import { IShoppingSale } from '@samchon/shopping-api/lib/structures/shoppings/sales/IShoppingSale';

/**
 * Tests that DeepStrictOmit correctly applies to primitive property type of branding type.
 */
export function test_types_deep_strict_omit_primitive_branding_type() {
  type TestInterface = {
    id: string;
    title: string;
    thumbnails: {
      name: null | (string & MinLength<1> & MaxLength<255>);
      extension: null | (string & MinLength<1> & MaxLength<8>);
      url: string;
    }[];
  };

  type Question = DeepStrictOmit<TestInterface, 'id'>;
  type IsAnswer = Equal<
    Question,
    {
      title: string;
      thumbnails: {
        name: null | (string & MinLength<1> & MaxLength<255>);
        extension: null | (string & MinLength<1> & MaxLength<8>);
        url: string;
      }[];
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit correctly applies to branding property type of branding type.
 */
export function test_types_deep_strict_omit_branding_property_type() {
  type Question = { id: string & typia.tags.Format<'uuid'>; name: string };
  type IsAnswer = Equal<DeepStrictOmit<Question, 'id'>, { name: string }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works with complex type example.
 */
export function test_types_deep_strict_omit_complex_type() {
  type ISummary = Pick<IShoppingSale.ISummary, 'id' | 'content'>;
  type Question = DeepStrictOmit<ISummary, 'content.id'>;
  type __Answer = Omit<ISummary, 'content'> & { content: Omit<ISummary['content'], 'id'> };

  type IsAnswer = Equal<Question, __Answer>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when picked property is branding type (typia).
 */
export function test_types_deep_strict_omit_picked_property_branding_typia() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<
    DeepStrictOmit<Question, 'id'>,
    {
      content: { id: string & typia.tags.Format<'uuid'> };
      name: string;
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when one of picked properties is branding type (typia).
 */
export function test_types_deep_strict_omit_one_picked_property_branding_typia() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<
    DeepStrictOmit<Question, 'id' | 'name'>,
    {
      content: { id: string & typia.tags.Format<'uuid'> };
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when one picked property is nested key type and branding type (typia).
 */
export function test_types_deep_strict_omit_nested_key_branding_typia() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<
    DeepStrictOmit<Question, 'content.id' | 'name'>,
    {
      id: string & typia.tags.Format<'uuid'>;
      content: {};
    }
  >;

  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works when all properties are omitted.
 */
export function test_types_deep_strict_omit_all_properties() {
  type Question = {
    id: string & typia.tags.Format<'uuid'>;
    content: { id: string & typia.tags.Format<'uuid'> };
    name: string;
  };

  type IsAnswer = Equal<DeepStrictOmit<Question, 'id' | 'name' | 'content'>, {}>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit correctly omits a nested property from array elements.
 */
export function test_types_deep_strict_omit_nested_array_property() {
  type Question = DeepStrictOmit<
    { items: { id: number; name: string }[] },
    'items[*].id'
  >;
  type IsAnswer = Equal<Question, { items: { name: string }[] }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works on root-level arrays with [*] notation.
 */
export function test_types_deep_strict_omit_root_array() {
  type Question = DeepStrictOmit<{ a: number; b: string }[], '[*].a'>;
  type IsAnswer = Equal<Question, { b: string }[]>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit works at 3 depth levels.
 */
export function test_types_deep_strict_omit_three_depth() {
  type Question = DeepStrictOmit<
    { a: { b: { c: number; d: string } } },
    'a.b.c'
  >;
  type IsAnswer = Equal<Question, { a: { b: { d: string } } }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit preserves Date types without recursing.
 */
export function test_types_deep_strict_omit_preserves_date() {
  type Question = DeepStrictOmit<
    { created: Date; name: string; updated: Date },
    'name'
  >;
  type IsAnswer = Equal<Question, { created: Date; updated: Date }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit can omit multiple nested keys simultaneously.
 */
export function test_types_deep_strict_omit_multiple_nested() {
  type Question = DeepStrictOmit<
    { a: { b: number; c: string; d: boolean } },
    'a.b' | 'a.d'
  >;
  type IsAnswer = Equal<Question, { a: { c: string } }>;
  ok(typia.random<IsAnswer>());
}

/**
 * Tests that DeepStrictOmit correctly handles a simple single key omit.
 */
export function test_types_deep_strict_omit_simple_single() {
  type Question = DeepStrictOmit<{ a: number; b: string }, 'a'>;
  type IsAnswer = Equal<Question, { b: string }>;
  ok(typia.random<IsAnswer>());
}

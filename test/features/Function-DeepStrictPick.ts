import typia, { tags } from 'typia';
import { deepStrictPick } from '../../src';

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
 * Tests that deepStrictPick can access a top-level property 'a' from an object
 */
export function test_functions_deepStrictPick_accesses_top_level_property_a() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'a'));
}

/**
 * Tests that deepStrictPick can access a top-level property 'b' from an object
 */
export function test_functions_deepStrictPick_accesses_top_level_property_b() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'b'));
}

/**
 * Tests that deepStrictPick can access a top-level array property 'c' from an object
 */
export function test_functions_deepStrictPick_accesses_top_level_array_property_c() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'c'));
}

/**
 * Tests that deepStrictPick can access nested property 'd' from all elements in array 'c'
 * using wildcard notation 'c[*].d'
 */
export function test_functions_deepStrictPick_accesses_nested_property_d_in_array_with_wildcard() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'c[*].d'));
}

/**
 * Tests that deepStrictPick can access nested property 'e' from all elements in array 'c'
 * using wildcard notation 'c[*].e'
 */
export function test_functions_deepStrictPick_accesses_nested_property_e_in_array_with_wildcard() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'c[*].e'));
}

/**
 * Tests that deepStrictPick can access nested array property 'f' from all elements in array 'c'
 * using wildcard notation 'c[*].f'
 */
export function test_functions_deepStrictPick_accesses_nested_array_f_in_array_with_wildcard() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'c[*].f'));
}

/**
 * Tests that deepStrictPick can access deeply nested property 'g' through double array navigation
 * using wildcard notation 'c[*].f[*].g'
 */
export function test_functions_deepStrictPick_accesses_deeply_nested_property_g_with_double_wildcard() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'c[*].f[*].g'));
}

/**
 * Tests that deepStrictPick can access deeply nested property 'h' through double array navigation
 * using wildcard notation 'c[*].f[*].h'
 */
export function test_functions_deepStrictPick_accesses_deeply_nested_property_h_with_double_wildcard() {
  typia.assertEquals(deepStrictPick(typia.random<Example>(), 'c[*].f[*].h'));
}

/**
 * Tests that deepStrictPick can access property 'a' from all elements when the root is an array
 * using wildcard notation '[*].a'
 */
export function test_functions_deepStrictPick_accesses_property_a_from_root_array_with_wildcard() {
  typia.assertEquals(deepStrictPick(typia.random<Example[] & tags.MinItems<1>>(), '[*].a'));
}

interface SimpleNested {
  user: {
    name: string;
    age: number;
  };
  title: string;
}

/**
 * Tests that deepStrictPick can access a nested non-array object property.
 */
export function test_functions_deepStrictPick_accesses_nested_object_property() {
  typia.assertEquals(deepStrictPick(typia.random<SimpleNested>(), 'user.name'));
}

/**
 * Tests that deepStrictPick throws when accessing a non-existent key.
 */
export function test_functions_deepStrictPick_throws_on_invalid_key() {
  const original = { x: 1, y: 2 } as { x: number; y: number };
  let threw = false;
  try {
    (deepStrictPick as any)(original, 'nonexistent.key');
  } catch {
    threw = true;
  }
  if (!threw) throw new Error('Expected deepStrictPick to throw for invalid key');
}

/**
 * Tests that deepStrictPick works with nested property from array with multiple nested keys.
 */
export function test_functions_deepStrictPick_accesses_multiple_nested_array_props() {
  const original = typia.random<Example>();
  typia.assertEquals(deepStrictPick(original, 'c[*].d'));
  typia.assertEquals(deepStrictPick(original, 'c[*].e'));
}

// ─── Complex test types ────────────────────────────────────────────────

interface ThreeLevelNested {
  org: {
    department: {
      team: {
        name: string;
        lead: string;
      };
      budget: number;
    };
    location: string;
  };
  id: number;
}

/**
 * Tests 3-level deep object traversal without arrays: 'org.department.team.name'
 */
export function test_functions_deepStrictPick_three_level_nested_object() {
  typia.assertEquals(deepStrictPick(typia.random<ThreeLevelNested>(), 'org.department.team.name'));
}

/**
 * Tests picking a mid-level object that includes its children: 'org.department.team'
 */
export function test_functions_deepStrictPick_mid_level_includes_children() {
  typia.assertEquals(deepStrictPick(typia.random<ThreeLevelNested>(), 'org.department.team'));
}

/**
 * Tests picking a top-level key that has deeply nested children: 'org'
 */
export function test_functions_deepStrictPick_top_level_with_deep_children() {
  typia.assertEquals(deepStrictPick(typia.random<ThreeLevelNested>(), 'org'));
}

interface WithDate {
  createdAt: Date;
  user: {
    name: string;
    birthday: Date;
  };
}

/**
 * Tests picking a top-level Date property (Date is a leaf, not recursed).
 */
export function test_functions_deepStrictPick_date_top_level() {
  typia.assertEquals(deepStrictPick(typia.random<WithDate>(), 'createdAt'));
}

/**
 * Tests picking a nested Date property inside an object.
 */
export function test_functions_deepStrictPick_date_nested() {
  typia.assertEquals(deepStrictPick(typia.random<WithDate>(), 'user.birthday'));
}

interface BrandedType {
  uuid: string & tags.Format<'uuid'>;
  email: string & tags.Format<'email'>;
  profile: {
    score: number & tags.Minimum<0> & tags.Maximum<100>;
    bio: string;
  };
}

/**
 * Tests picking a branded (typia tag) property at top level.
 */
export function test_functions_deepStrictPick_branded_type_top_level() {
  typia.assertEquals(deepStrictPick(typia.random<BrandedType>(), 'uuid'));
}

/**
 * Tests picking a branded property nested inside an object.
 */
export function test_functions_deepStrictPick_branded_type_nested() {
  typia.assertEquals(deepStrictPick(typia.random<BrandedType>(), 'profile.score'));
}

interface TripleArrayNesting {
  categories: {
    items: {
      variants: {
        sku: string;
        price: number;
      }[];
    }[];
    name: string;
  }[];
}

/**
 * Tests triple array nesting: 'categories[*].items[*].variants[*].sku'
 */
export function test_functions_deepStrictPick_triple_array_nesting() {
  typia.assertEquals(deepStrictPick(typia.random<TripleArrayNesting>(), 'categories[*].items[*].variants[*].sku'));
}

/**
 * Tests picking mid-level array: 'categories[*].items'
 * (picks the full items sub-tree including variants)
 */
export function test_functions_deepStrictPick_triple_nesting_mid_level() {
  typia.assertEquals(deepStrictPick(typia.random<TripleArrayNesting>(), 'categories[*].items'));
}

/**
 * Tests picking sibling of nested arrays: 'categories[*].name'
 */
export function test_functions_deepStrictPick_array_sibling_property() {
  typia.assertEquals(deepStrictPick(typia.random<TripleArrayNesting>(), 'categories[*].name'));
}

interface MixedArrayObject {
  settings: {
    notifications: {
      channels: {
        type: string;
        enabled: boolean;
      }[];
      frequency: string;
    };
    theme: string;
  };
}

/**
 * Tests mixed object-then-array-then-property traversal:
 * 'settings.notifications.channels[*].type'
 */
export function test_functions_deepStrictPick_mixed_object_array_leaf() {
  typia.assertEquals(deepStrictPick(typia.random<MixedArrayObject>(), 'settings.notifications.channels[*].type'));
}

/**
 * Tests picking an object sibling of an array: 'settings.notifications.frequency'
 */
export function test_functions_deepStrictPick_object_sibling_of_array() {
  typia.assertEquals(deepStrictPick(typia.random<MixedArrayObject>(), 'settings.notifications.frequency'));
}

interface RootArrayNested {
  user: {
    posts: {
      title: string;
      likes: number;
    }[];
  };
  active: boolean;
}

/**
 * Tests root array with nested array access: '[*].user.posts[*].title'
 */
export function test_functions_deepStrictPick_root_array_with_nested_array() {
  typia.assertEquals(deepStrictPick(typia.random<RootArrayNested[] & tags.MinItems<1>>(), '[*].user.posts[*].title'));
}

/**
 * Tests that multiple picks on the same input do not mutate the original object.
 */
export function test_functions_deepStrictPick_immutability() {
  const original = typia.random<ThreeLevelNested>();
  const snapshot = JSON.stringify(original);

  deepStrictPick(original, 'org.department.team.name');
  deepStrictPick(original, 'org.department.budget');
  deepStrictPick(original, 'id');

  if (JSON.stringify(original) !== snapshot) {
    throw new Error('deepStrictPick mutated the original object');
  }
}

interface WideObject {
  alpha: number;
  beta: string;
  gamma: boolean;
  delta: {
    one: string;
    two: number;
    three: {
      deep: boolean;
    };
  };
  epsilon: string[];
}

/**
 * Tests picking a single deep leaf from an object with many sibling keys.
 */
export function test_functions_deepStrictPick_deep_leaf_from_wide_object() {
  typia.assertEquals(deepStrictPick(typia.random<WideObject>(), 'delta.three.deep'));
}

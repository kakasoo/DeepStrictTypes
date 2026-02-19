/**
 * @title Type for Expanding Glob Patterns into Template Literal Matchers.
 *
 * Converts glob patterns (`*`) into template literal types that can match
 * all keys at a given level. Used by {@link DeepStrictPick} to correctly
 * preserve all descendant keys when a glob pattern is selected.
 *
 * - `'*'` expands to `string` (matches everything)
 * - `'a.*'` expands to `'a.${string}' | 'a'` (matches all keys under `a`)
 * - `'items[*].*'` expands to `'items[*].${string}' | 'items[*]'`
 *
 * @template K - The key pattern to expand
 * @returns A template literal type matching all keys covered by the glob, or `never` for non-glob keys
 *
 * @example
 * ```typescript
 * type Ex1 = ExpandGlob<'*'>; // string
 * type Ex2 = ExpandGlob<'a.*'>; // `a.${string}` | 'a'
 * type Ex3 = ExpandGlob<'items[*].*'>; // `items[*].${string}` | 'items[*]'
 * type Ex4 = ExpandGlob<'a.b'>; // never (not a glob pattern)
 * ```
 */
export type ExpandGlob<K extends string> = K extends '*'
  ? string
  : K extends `${infer Prefix}.*`
    ? `${Prefix}.${string}` | Prefix
    : never;

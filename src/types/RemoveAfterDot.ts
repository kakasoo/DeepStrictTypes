import { ElementOf } from './ElementOf';

/**
 * @title Type for Generating Wildcard Patterns for Descendant Keys.
 *
 * A helper type used by {@link DeepStrictPick} to generate string patterns that match
 * all keys below a given path in a nested object. This allows `DeepStrictPick` to preserve
 * child properties when selecting a parent key.
 *
 * For object properties, it produces `"key.${string}"` patterns.
 * For array properties, it produces `"key[*].${string}"` patterns.
 * The type recurses through the object structure following the key path `K`.
 *
 * @template T - The object type to traverse
 * @template K - The key path to generate descendant patterns for
 * @returns A template literal type matching all descendant keys, or `never` if the path is invalid
 *
 * @example
 * ```typescript
 * type Ex1 = RemoveAfterDot<{ a: { b: number } }, "a">; // `a.${string}`
 * type Ex2 = RemoveAfterDot<{ items: { name: string }[] }, "items">; // `items[*].${string}`
 * type Ex3 = RemoveAfterDot<{ a: { b: { c: number } } }, "a.b">; // `a.b.${string}`
 * ```
 */
export type RemoveAfterDot<T extends object, K extends string> = K extends `${infer First}.${infer Last}`
  ? First extends keyof T
    ? T[First] extends Array<any>
      ? `${First}[*].${string}`
      : T[First] extends object
        ? `${First}.${RemoveAfterDot<T[First], Last>}`
        : never
    : First extends '[*]'
      ? T extends Array<any>
        ? RemoveAfterDot<ElementOf<T>, Last>
        : never
      : First extends `${infer Second extends string}[*]`
        ? Second extends keyof T
          ? T[Second] extends object
            ? `${First}.${RemoveAfterDot<T[Second], Last>}`
            : never
          : never
        : never
  : K extends keyof T
    ? T[K] extends Array<any>
      ? `${K}[*].${string}`
      : `${K}.${string}`
    : T extends Array<any>
      ? RemoveAfterDot<ElementOf<T>, K>
      : never;

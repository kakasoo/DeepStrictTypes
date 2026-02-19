import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { GetElementMember } from './GetMember';

namespace DeepStrictOmit {
  /**
   * @internal Recursively omits keys from a non-array object type.
   *
   * Handles three cases for each property:
   * - Array of objects: recurses into array elements using {@link GetElementMember} to extract sub-keys
   * - Object (non-Date): recurses into the nested object
   * - Primitive / Date / array of primitives: preserves as-is
   *
   * Top-level keys that exactly match `K` are removed via the `as` clause.
   *
   * @template T - The object type to omit keys from
   * @template K - The dot-notation key paths to omit (must be valid keys of `T`)
   */
  export type Infer<T extends object, K extends DeepStrictObjectKeys<T>> = '*' extends K
    ? {}
    : [K] extends [never]
      ? T
      : {
          [key in keyof T as key extends K ? never : key]: T[key] extends Array<infer Element extends object>
            ? key extends string
              ? Element extends Date
                ? Array<Element>
                : GetElementMember<K, key> extends DeepStrictObjectKeys<Element>
                  ? Array<Infer<Element, GetElementMember<K, key>>>
                  : Array<Element>
              : never
            : T[key] extends Array<infer Element>
              ? Array<Element>
              : T[key] extends object
                ? key extends string
                  ? T[key] extends Date
                    ? T[key]
                    : GetElementMember<K, key> extends DeepStrictObjectKeys<T[key]>
                      ? Infer<T[key], GetElementMember<K, key>>
                      : T[key]
                  : never
                : T[key];
        };
}

/**
 * @title Type for Removing Specific Keys from an Interface.
 *
 * The `DeepStrictOmit<T, K>` type creates a new type by excluding properties
 * corresponding to the key `K` from the object `T`, while preserving the nested structure.
 * It enables precise omission of keys even in deeply nested objects or arrays.
 *
 * {@link DeepStrictObjectKeys} can be used to determine valid keys for omission,
 * including nested keys represented with dot notation (`.`) and array indices represented with `[*]`.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepStrictOmit<{ a: { b: 1; c: 2 } }, "a.b">; // { a: { c: 2 } }
 * type Example2 = DeepStrictOmit<{ a: { b: 1; c: { d: number }[] } }, "a.c[*].d">; // { a: { b: 1; c: {}[] } }
 * type Example3 = DeepStrictOmit<{ a: 1 }[], "[*].a">; // {}[]
 * ```
 */
export type DeepStrictOmit<T extends object, K extends DeepStrictObjectKeys<T>> = '*' extends K
  ? T extends Array<any>
    ? never[]
    : {}
  : T extends Array<infer Element extends object>
    ? Array<
        DeepStrictOmit<
          Element,
          GetElementMember<K, ''> extends DeepStrictObjectKeys<Element> ? GetElementMember<K, ''> : never
        >
      >
    : DeepStrictOmit.Infer<T, K>;

import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { GetElementMember } from './GetMember';

namespace DeepOmit {
  /**
   * @internal Recursively omits keys from a non-array object type.
   *
   * Unlike {@link DeepStrictOmit.Infer}, this version accepts any string as K,
   * silently ignoring keys that do not exist in T. The guard conditions
   * (`GetElementMember<K, key> extends DeepStrictObjectKeys<Element>`) naturally
   * handle invalid keys by falling through to the else branch which preserves
   * the value unchanged.
   *
   * @template T - The object type to omit keys from
   * @template K - The dot-notation key paths to omit (any string; invalid keys are ignored)
   */
  export type Infer<T extends object, K extends string> = '*' extends K
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
 * @title Type for Removing Specific Keys from an Interface (Non-Strict).
 *
 * The `DeepOmit<T, K>` type creates a new type by excluding properties
 * corresponding to the key `K` from the object `T`, while preserving the nested structure.
 * Unlike {@link DeepStrictOmit}, `K` is not constrained to valid keys of `T`.
 * Invalid or non-existent key paths in `K` are silently ignored.
 *
 * {@link DeepStrictObjectKeys} can be used to determine valid keys for omission,
 * including nested keys represented with dot notation (`.`) and array indices represented with `[*]`.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepOmit<{ a: { b: 1; c: 2 } }, "a.b">;          // { a: { c: 2 } }
 * type Example2 = DeepOmit<{ a: { b: 1; c: 2 } }, "a.b" | "x.y">; // { a: { c: 2 } } (invalid "x.y" ignored)
 * type Example3 = DeepOmit<{ a: 1 }, "nonexistent">;                // { a: 1 } (no change)
 * ```
 */
export type DeepOmit<T extends object, K extends string> = '*' extends K
  ? T extends Array<any>
    ? never[]
    : {}
  : T extends Array<infer Element extends object>
    ? Array<DeepOmit<Element, GetElementMember<K, ''> extends string ? GetElementMember<K, ''> : never>>
    : DeepOmit.Infer<T, K>;

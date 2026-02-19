import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { DeepOmit } from './DeepOmit';
import type { DeepStrictUnbrand } from './DeepStrictUnbrand';
import type { ExpandGlob } from './ExpandGlob';
import type { RemoveAfterDot } from './RemoveAfterDot';
import type { RemoveLastProperty } from './RemoveLastProperty';

/**
 * @title Type for Selecting Specific Keys from an Interface (Non-Strict).
 *
 * The `DeepPick<T, K>` type creates a new type by selecting only the properties
 * corresponding to the key `K` from the object `T`, while preserving the nested structure.
 * Unlike {@link DeepStrictPick}, `K` is not constrained to valid keys of `T`.
 * Invalid or non-existent key paths in `K` are silently ignored.
 *
 * `DeepPick` is implemented by omitting all keys except those selected,
 * using {@link DeepOmit} internally.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepPick<{ a: { b: 1; c: 2 } }, "a.b">;          // { a: { b: 1 } }
 * type Example2 = DeepPick<{ a: { b: 1; c: 2 } }, "a.b" | "x.y">; // { a: { b: 1 } } (invalid "x.y" ignored)
 * type Example3 = DeepPick<{ a: 1; b: 2 }, "nonexistent">;          // {} (nothing matched)
 * ```
 */
export type DeepPick<T extends object, K extends string> = '*' extends K
  ? T
  : DeepOmit<
      T,
      Exclude<
        Exclude<
          DeepStrictObjectKeys<T>,
          K | RemoveLastProperty<K> | RemoveAfterDot<DeepStrictUnbrand<T>, K> | ExpandGlob<K>
        >,
        '*' | `${string}.*`
      >
    >;

import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
import type { DeepStrictOmit } from './DeepStrictOmit';
import type { DeepStrictUnbrand } from './DeepStrictUnbrand';
import type { ExpandGlob } from './ExpandGlob';
import type { RemoveAfterDot } from './RemoveAfterDot';
import type { RemoveLastProperty } from './RemoveLastProperty';

/**
 * @title Type for Selecting Specific Keys from an Interface.
 *
 * The `DeepStrictPick<T, K>` type creates a new type by selecting only the properties
 * corresponding to the key `K` from the object `T`, while preserving the nested structure.
 * This type allows safely selecting specific keys, even from deeply nested objects or arrays.
 * `DeepStrictPick` is a type created with the idea of omit all but the selected key.
 * Therefore, we use {@link DeepStrictOmit}.
 *
 * {@link DeepStrictObjectKeys} can be used to determine valid keys for selection,
 * including nested keys represented with dot notation (`.`) and array indices represented with `[*]`.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepStrictPick<{ a: { b: 1; c: 2 } }, "a.b">; // { a: { b: 1 } }
 * type Example2 = DeepStrictPick<{ a: { b: 1; c: { d: number }[] } }, "a.c[*].d">; // { a: { c: { d: number }[] } }
 * type Example3 = DeepStrictPick<{ a: 1 }[], "[*].a">; // { a: 1 }[]
 * ```
 */
export type DeepStrictPick<T extends object, K extends DeepStrictObjectKeys<T>> = '*' extends K
  ? T
  : DeepStrictOmit<
      T,
      Exclude<
        Exclude<
          DeepStrictObjectKeys<T>,
          K | RemoveLastProperty<K> | RemoveAfterDot<DeepStrictUnbrand<T>, K> | ExpandGlob<K>
        >,
        '*' | `${string}.*`
      >
    >;

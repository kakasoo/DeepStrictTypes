/**
 * @title Type for Extracting All Parent Path Segments from a Dot-Notation Key.
 *
 * A helper type used by {@link DeepStrictPick} to extract all intermediate (parent) paths
 * from a dot-notation key string. When picking a nested key like `"a.b.c"`, the parent
 * paths `"a"` and `"a.b"` must be preserved in the result. This type generates those paths.
 *
 * For paths containing array notation (`[*]`), both the array path and the base key
 * without `[*]` are included.
 *
 * @template S - The dot-notation key string to extract parent paths from
 * @returns A union of all parent path segments, or `never` if the key has no dots
 *
 * @example
 * ```typescript
 * type Ex1 = RemoveLastProperty<"a.b">; // "a"
 * type Ex2 = RemoveLastProperty<"a.b.c">; // "a" | "a.b"
 * type Ex3 = RemoveLastProperty<"a[*].b">; // "a[*]" | "a"
 * type Ex4 = RemoveLastProperty<"a">; // never
 * ```
 */
export type RemoveLastProperty<S extends string> = S extends `${infer First}.${infer Last}`
  ? First extends `${infer ObjectPart}[*]`
    ? First | ObjectPart | `${First}.${RemoveLastProperty<Last>}`
    : `${First}` | `${First}.${RemoveLastProperty<Last>}`
  : never;

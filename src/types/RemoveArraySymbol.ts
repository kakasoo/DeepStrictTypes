/**
 * @title Type for Stripping the Array Symbol Suffix from a Key String.
 *
 * A helper type that removes the trailing array symbol (default `[*]`) from a key string.
 * Used internally by {@link GetType} and other types to extract the base property name
 * from keys that include array notation.
 *
 * If the string does not end with the array symbol, it is returned unchanged.
 *
 * @template T - The key string to process
 * @template ArraySymbol - The array symbol to strip (defaults to `[*]`)
 * @returns The key string with the trailing array symbol removed, or the original string if no match
 *
 * @example
 * ```typescript
 * type Ex1 = RemoveArraySymbol<"items[*]">; // "items"
 * type Ex2 = RemoveArraySymbol<"items">; // "items"
 * type Ex3 = RemoveArraySymbol<"[*]">; // ""
 * type Ex4 = RemoveArraySymbol<"data[]", "[]">; // "data"
 * ```
 */
export type RemoveArraySymbol<
  T extends string,
  ArraySymbol extends string = '[*]',
> = T extends `${infer P}${ArraySymbol}` ? P : T;

namespace DeepStrictMerge {
  /**
   * @title Infer Type
   *
   * A helper type that recursively merges two object types, `Target` and `Source`, at the deepest level.
   * This type is used internally to handle merging the properties of `Target` and `Source`.
   *
   * - If both `Target` and `Source` share a common key, their corresponding values are merged.
   * - If the values are objects, they are merged recursively.
   * - If the values are arrays, their elements are merged.
   * - If an element of the array is not an object, merging is not possible.
   */
  export type Infer<Target extends object, Source extends object> = {
    // Iterate through the keys of both `Target` and `Source`
    [key in keyof Target | keyof Source]: key extends keyof Target
      ? key extends keyof Source
        ? Target[key] extends object
          ? Source[key] extends object
            ? Target[key] extends Array<infer TE extends object>
              ? Source[key] extends Array<infer PE extends object>
                ? Array<Infer<TE, PE>> // If both are arrays of objects, merge their elements into a new array
                : never // If one is an array and the other is not, merging is not possible
              : Infer<Target[key], Source[key]> // If both are objects, merge them recursively
            : Target[key] // If `Target` is an object but `Source` is not, take `Target`'s value
          : Target[key] // If `Target` is not an object, take `Target`'s value
        : Target[key] // If `key` is only in `Target`, take `Target`'s value
      : key extends keyof Source
        ? key extends keyof Target
          ? Source[key] extends object
            ? Target[key] extends object
              ? Target[key] extends Array<infer TE extends object>
                ? Source[key] extends Array<infer PE extends object>
                  ? Array<Infer<TE, PE>> // If both are arrays of objects, merge their elements into a new array
                  : never // If one is an array and the other is not, merging is not possible
                : Infer<Target[key], Source[key]> // If both are objects, merge them recursively
              : Source[key] // If `Source` is an object but `Target` is not, take `Source`'s value
            : Source[key] // If `Source` is not an object, take `Source`'s value
          : Source[key] // If `key` is only in `Source`, take `Source`'s value
        : never; // If `key` is in neither `Target` nor `Source`, return `never`
  };
}

/**
 * @title DeepStrictMerge Type
 *
 * A type that deeply merges two object types, `Target` and `Source`.
 * Nested objects are recursively merged, and in the case of array types, the elements of the arrays are merged into a new type.
 *
 * Merge Rules:
 * 1. For object types, if both `Target` and `Source` have a common key, the value from `Target` takes precedence, and `Source` does not overwrite it.
 * 2. For array types, if both `Target` and `Source` are arrays and their elements are objects, those elements are merged.
 *    - If the elements of the arrays are not objects, merging is not possible.
 * 3. If only one of the types is an array, merging is not possible.
 *
 * @template Target - The primary object type. Its values take precedence on overlapping keys.
 * @template Source - The secondary object type whose unique keys are added to the result.
 * @returns A deeply merged object type combining `Target` and `Source`
 *
 * @example
 * ```ts
 * type Ex1 = DeepStrictMerge<{ a: 1 }, { b: 2 }>; // { a: 1; b: 2 }
 * type Ex2 = DeepStrictMerge<{ a: { b: 1 } }, { a: { c: 2 } }>; // { a: { b: 1; c: 2 } }
 * type Ex3 = DeepStrictMerge<{ a: 1 }, { a: 2 }>; // { a: 1 } (Target wins)
 * ```
 */
export type DeepStrictMerge<Target extends object, Source extends object> =
  Target extends Array<infer TE extends object>
    ? Source extends Array<infer PE extends object>
      ? DeepStrictMerge.Infer<TE, PE>[] // If both are arrays, merge the element types into an array
      : never // If `Target` is an array but `Source` is not, merging is not possible
    : DeepStrictMerge.Infer<Target, Source>; // If both are objects, merge recursively

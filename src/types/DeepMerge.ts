namespace DeepMerge {
  /**
   * @title Infer Type
   *
   * A helper type that recursively merges two object types, `Target` and `Source`, at the deepest level.
   * Unlike {@link DeepStrictMerge.Infer}, when both sides have a common key, **Source takes precedence**
   * for primitive values (override/spread pattern). For nested objects, they are recursively merged
   * with Source still winning on conflicts.
   *
   * Type mismatch rules (different from DeepStrictMerge):
   * - If one side is an array and the other is not: Source wins
   * - If one side is an object and the other is a primitive: Source wins
   */
  export type Infer<Target extends object, Source extends object> = {
    [key in keyof Target | keyof Source]: key extends keyof Source
      ? key extends keyof Target
        ? // Key exists in both — Source wins, but recurse if both are non-Date non-array objects
          Target[key] extends object
          ? Source[key] extends object
            ? Target[key] extends Date
              ? Source[key] // Target is Date: Source wins
              : Source[key] extends Date
                ? Source[key] // Source is Date: Source wins
                : Target[key] extends Array<infer TE extends object>
                  ? Source[key] extends Array<infer SE extends object>
                    ? Array<Infer<TE, SE>> // Both arrays of objects: merge elements
                    : Source[key] // Array mismatch: Source wins
                  : Source[key] extends Array<any>
                    ? Source[key] // Source is array, Target is not: Source wins
                    : Infer<Target[key], Source[key]> // Both plain objects: recurse
            : Source[key] // Target is object, Source is not: Source wins
          : Source[key] // Target is not object: Source wins
        : Source[key] // Key only in Source
      : key extends keyof Target
        ? Target[key] // Key only in Target
        : never;
  };
}

/**
 * @title DeepMerge Type (Source Wins)
 *
 * A type that deeply merges two object types, `Target` and `Source`, where **Source takes precedence**
 * on overlapping keys. This follows the JavaScript spread/Object.assign pattern: `{...target, ...source}`.
 *
 * Merge Rules:
 * 1. For overlapping keys with both sides being non-array, non-Date objects: recursively merge.
 * 2. For overlapping keys with both sides being arrays of objects: merge the element types.
 * 3. For all other overlapping cases (type mismatches, primitives): Source wins.
 * 4. Non-overlapping keys are preserved from whichever side has them.
 *
 * Compare with {@link DeepStrictMerge} where Target wins on overlap.
 *
 * @template Target - The base object type.
 * @template Source - The override object type. Its values take precedence on overlapping keys.
 * @returns A deeply merged object type combining `Target` and `Source`
 *
 * @example
 * ```ts
 * type Ex1 = DeepMerge<{ a: 1 }, { b: 2 }>;               // { a: 1; b: 2 }
 * type Ex2 = DeepMerge<{ a: { b: 1 } }, { a: { c: 2 } }>; // { a: { b: 1; c: 2 } }
 * type Ex3 = DeepMerge<{ a: 1 }, { a: 2 }>;                // { a: 2 } (Source wins)
 * type Ex4 = DeepMerge<{ a: number[] }, { a: string }>;     // { a: string } (Source wins on mismatch)
 * ```
 */
export type DeepMerge<Target extends object, Source extends object> =
  Target extends Array<infer TE extends object>
    ? Source extends Array<infer SE extends object>
      ? Array<DeepMerge.Infer<TE, SE>> // Both arrays: merge element types
      : Source // Target is array, Source is not: Source wins
    : Source extends Array<any>
      ? Source // Target is not array, Source is array: Source wins
      : DeepMerge.Infer<Target, Source>;

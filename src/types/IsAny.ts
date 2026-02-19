/**
 * @title Type for Checking if a Type is `any`.
 *
 * Determines whether the provided type `T` is `any`. It leverages the fact that `any`
 * is the only type where `0 extends 1 & T` evaluates to `true`, because `1 & any` collapses
 * to `any`, and `0 extends any` is always true.
 *
 * @template T - The type to check
 * @returns `true` if `T` is `any`, `false` otherwise
 *
 * @example
 * ```typescript
 * type Test1 = IsAny<any>; // true
 * type Test2 = IsAny<string>; // false
 * type Test3 = IsAny<unknown>; // false
 * type Test4 = IsAny<never>; // false
 * ```
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;

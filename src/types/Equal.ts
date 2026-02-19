/**
 * Helper type that creates a generic function signature for type comparison.
 * This technique leverages TypeScript's strict function type checking to determine type equality.
 * 
 * @internal
 */
type Expression<X> = <T>() => T extends X ? 1 : 2;

/**
 * @title Type for Checking if Two Types are Equal.
 *
 * The `Equal<X, Y>` type uses conditional types and a helper type `Expression<X>`
 * to determine if two types `X` and `Y` are exactly the same. It returns `true` if they are
 * equal, and `false` otherwise.
 * 
 * This type performs a strict equality check that distinguishes between:
 * - Union types with different members
 * - Branded types vs their base types
 * - Optional vs required properties
 *
 * **Known limitation:** Due to how TypeScript resolves `any` in generic function signatures,
 * `Equal<any, T>` returns `true` for any `T`. This means `any` cannot be distinguished
 * from specific types using this approach.
 *
 * @template X - The first type to compare
 * @template Y - The second type to compare
 * @returns `true` if X and Y are exactly the same type, `false` otherwise
 *
 * @example
 * ```typescript
 * type Test1 = Equal<string, string>; // true
 * type Test2 = Equal<string, number>; // false
 * type Test3 = Equal<string | number, string | number>; // true
 * type Test4 = Equal<string | number, number | string>; // true (order doesn't matter)
 * type Test5 = Equal<{ a: string }, { a: string }>; // true
 * type Test6 = Equal<{ a: string }, { a: string; b?: string }>; // false
 * type Test7 = Equal<any, string>; // true (known limitation)
 * type Test8 = Equal<unknown, any>; // true (known limitation)
 * type Test9 = Equal<string & { __brand: 'ID' }, string>; // false (branded types)
 * ```
 */
export type Equal<X, Y> = Expression<X> extends Expression<Y> ? true : false;

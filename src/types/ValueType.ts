/**
 * @title Union Type of All Primitive and Date Types.
 *
 * A union of all JavaScript primitive types and `Date`. This type is used internally
 * by {@link DeepStrictObjectKeys} and other recursive types to determine when to stop
 * recursion. Properties whose type extends `ValueType` are treated as leaf nodes
 * and are not recursively traversed.
 *
 * Note that `Date` is included because, although it is technically an object,
 * it should not be recursively explored for nested keys.
 *
 * @example
 * ```typescript
 * type IsValue = number extends ValueType ? true : false; // true
 * type IsNotValue = { a: 1 } extends ValueType ? true : false; // false
 * ```
 */
export type ValueType = number | boolean | string | null | undefined | symbol | bigint | Date;

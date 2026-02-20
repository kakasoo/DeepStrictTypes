import type { StringType } from '@kakasoo/proto-typescript';

/** @internal Converts a union type to an intersection type. */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/** @internal Extracts the portion before the first dot in a string. */
type BeforeDot<T extends string> = T extends `${infer Before}.${infer _}` ? Before : never;

/** @internal Extracts the portion after the first dot in a string. */
type AfterDot<T extends string> = T extends `${infer _}.${infer After}` ? After : never;

/** @internal Extracts a union of all property value types from an object. */
type ValueOf<T> = T[keyof T];

/** @internal Converts a string or number type to its string literal representation. */
type ToString<T> = T extends string ? T : T extends number ? `${T}` : never;

/**
 * @title Type for Converting a Comma-Separated Dot-Notation String to a Nested Object Type.
 *
 * Converts a string like `"a.b,c"` into a nested object type `{ a: { b: any }; c: any }`.
 * Comma-separated segments produce an intersection of records, and dot-separated segments
 * produce nested `Record` types. Leaf values are typed as `any`.
 *
 * @template T - The comma-separated dot-notation string to convert
 * @template P - The split string segments (defaults to splitting T by comma)
 * @returns A nested object type representing the string structure
 *
 * @example
 * ```typescript
 * type Ex1 = StringToDeepObject<"a">; // { a: any }
 * type Ex2 = StringToDeepObject<"a.b">; // { a: { b: any } }
 * type Ex3 = StringToDeepObject<"a,b">; // { a: any; b: any }
 * type Ex4 = StringToDeepObject<"a.b,c">; // { a: { b: any }; c: any }
 * type Ex5 = StringToDeepObject<"a.b.c">; // { a: { b: { c: any } } }
 * ```
 */
export type StringToDeepObject<T extends string, P extends string[] = StringType.Split<T, ','>> = UnionToIntersection<
  ValueOf<{
    [key in P[number]]: StringType.Includes<key, '.'> extends true
      ? Record<BeforeDot<key>, StringToDeepObject<ToString<AfterDot<key>>>>
      : Record<key, any>;
  }>
>;

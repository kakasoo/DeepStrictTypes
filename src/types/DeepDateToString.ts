import { DeepStrictUnbrand } from './DeepStrictUnbrand';

/**
 * @title Type for Recursively Converting All Date Types to String.
 *
 * A utility type that recursively traverses a nested object or array type and converts
 * every `Date` type to `string`. This is useful for representing serialized forms of objects
 * where dates are transmitted as ISO strings (e.g., JSON responses from APIs).
 *
 * Conversion rules:
 * - If `T` is an array of objects, each element is processed recursively.
 * - If `T` is a `Date`, it becomes `string`.
 * - If `T` is an object, each property is checked: `Date` properties become `string`,
 *   nested objects are recursed into, and primitives are preserved as-is.
 * - Union types containing `Date` (e.g., `Date | null`) have only the `Date` portion converted.
 * - Branded types are unbranded via {@link DeepStrictUnbrand} before recursion.
 *
 * @template T - The object type to convert
 * @returns A new type with all `Date` occurrences replaced by `string`
 *
 * @example
 * ```typescript
 * type Ex1 = DeepDateToString<{ created: Date; name: string }>; // { created: string; name: string }
 * type Ex2 = DeepDateToString<{ items: { date: Date }[] }>; // { items: { date: string }[] }
 * type Ex3 = DeepDateToString<{ prop: Date | null }>; // { prop: string | null }
 * ```
 */
export type DeepDateToString<T extends object> =
  DeepStrictUnbrand<T> extends Array<infer I extends object>
    ? Array<DeepDateToString<I>>
    : T extends Date
      ? string
      : {
          [K in keyof T]: T[K] extends infer I
            ? I extends Date
              ? string
              : DeepStrictUnbrand<I> extends object
                ? DeepDateToString<DeepStrictUnbrand<I>>
                : I
            : never;
        };

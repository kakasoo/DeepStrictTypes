namespace DeepStrictUnbrand {
  /**
   * @internal Union of all JavaScript primitive types.
   * Used to detect branded primitives (primitives intersected with `Record<any, any>`).
   */
  export type Primitive = string | number | boolean | symbol | null | undefined;

  /**
   * @internal Strips branding from a single branded primitive type.
   *
   * A "branded primitive" is a type like `string & { __brand: 'email' }`.
   * This type pattern-matches the base primitive and returns it without the brand.
   *
   * @template T - A branded primitive type (must extend both `Primitive` and `Record<any, any>`)
   * @returns The underlying primitive type with branding removed
   */
  export type Infer<T extends Primitive & Record<any, any>> = T extends string & Record<any, any>
    ? string
    : T extends number & Record<any, any>
      ? number
      : T extends boolean & Record<any, any>
        ? boolean
        : T extends symbol & Record<any, any>
          ? symbol
          : T extends null & Record<any, any>
            ? null
            : T extends undefined & Record<any, any>
              ? undefined
              : T;
}

/**
 * @title Type for Recursively Removing Branding Types.
 *
 * The `DeepStrictUnbrand<T>` type recursively processes the type `T` to remove any branding
 * that may have been added to primitive types or object properties. Branding often occurs when
 * extending or augmenting primitive types for type safety, and this type "unbrands" them, restoring
 * the original primitive type (e.g., `string`, `number`, `boolean`, etc.).
 *
 * The helper type `Unbrand<T>` is used to handle primitive types and their respective branding,
 * by stripping off any additional properties that may have been added to them.
 *
 * The recursion goes through:
 * - Arrays: It recursively processes elements of the array, maintaining deep unbranding.
 * - Objects: It recursively processes each key in the object, unbranding any branded properties.
 * - Primitives: It removes branding from primitive types (`string`, `number`, `boolean`, `symbol`, `null`, `undefined`).
 * - Dates: The `Date` type is preserved as it is.
 *
 * Example Usage:
 * ```ts
 * type Example1 = DeepStrictUnbrand<{ a: string & { __brand: 'unique' } }>; // { a: string }
 * type Example2 = DeepStrictUnbrand<{ a: { b: number & { __brand: 'id' } } }>; // { a: { b: number } }
 * type Example3 = DeepStrictUnbrand<Array<string & { __brand: 'email' }>>; // Array<string>
 * ```
 */
export type DeepStrictUnbrand<T> = T extends []
  ? []
  : T extends Array<infer I extends object>
    ? Array<DeepStrictUnbrand<I>>
    : T extends DeepStrictUnbrand.Primitive & NonNullable<unknown> // If T is branding type.
      ? DeepStrictUnbrand.Infer<T>
      : T extends Date // Date is a type of object,
        ? T // but it is not considered a branding type.
        : {
            [K in keyof T]: T[K] extends object
              ? DeepStrictUnbrand<T[K]> // Recursively releases the branding type.
              : T[K];
          };

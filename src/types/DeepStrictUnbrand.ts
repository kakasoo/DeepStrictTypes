type Primitive = string | number | boolean | symbol | null | undefined;
type Unbrand<T extends Primitive & Record<any, any>> = T extends string &
    Record<any, any>
    ? Extract<string, Omit<T, any>>
    : T extends number & Record<any, any>
    ? Extract<number, Omit<T, any>>
    : T extends boolean & Record<any, any>
    ? Extract<boolean, Omit<T, any>>
    : T extends symbol & Record<any, any>
    ? Extract<symbol, Omit<T, any>>
    : T extends null & Record<any, any>
    ? Extract<null, Omit<T, any>>
    : T extends undefined & Record<any, any>
    ? Extract<undefined, Omit<T, any>>
    : never;

export type DeepStrictUnbrand<T> = T extends Array<Date>
    ? Array<Date>
    : T extends Array<infer I extends object>
    ? Array<DeepStrictUnbrand<I>>
    : T extends Primitive & NonNullable<unknown>
    ? Unbrand<T>
    : T extends Date
    ? T
    : {
          [K in keyof T]: T[K] extends object ? DeepStrictUnbrand<T[K]> : T[K];
      };

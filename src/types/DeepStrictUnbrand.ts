type Primitive = string | number | boolean | symbol | null | undefined;
type Unbrand<T extends Primitive & NonNullable<unknown>> = T extends Primitive &
    NonNullable<unknown>
    ? Extract<Primitive, T>
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
          [K in keyof T]: T[K] extends Unbrand<infer I>
              ? Extract<I, T[K]> // Primitive type에서 T[K]의 부분 집합만을 추려내서 브랜드 타입을 제거
              : T[K] extends object
              ? DeepStrictUnbrand<T[K]>
              : T[K];
      };

export type DeepDateToString<T> = T extends Array<infer I extends object>
  ? Array<DeepDateToString<I>>
  : T extends Date
  ? string
  : {
      [K in keyof T]: T[K] extends infer I
        ? I extends Date
          ? string
          : I extends object
          ? DeepDateToString<I>
          : I
        : never;
    };

import { DeepStrictObjectKeys } from '../types/DeepStrictObjectKeys';
import { DeepStrictPick } from '../types/DeepStrictPick';

/**
 * @title Runtime Function for Type-Safe Deep Property Extraction.
 *
 * A curried function that takes an object and returns a picker function.
 * The picker function accepts a dot-notation key path and returns a new object
 * containing only the specified nested property, preserving the original structure.
 *
 * This is the runtime counterpart of the {@link DeepStrictPick} type.
 *
 * @deprecated Use {@link deepStrictPick} instead. This curried form will be removed in a future version.
 *
 * @template T - The object type of the input
 * @param input - The source object to extract properties from
 * @returns A function that accepts a key path `K` and returns the deeply-picked result
 *
 * @example
 * ```ts
 * const result = deepStrictAssert({ a: { b: 1, c: 2 } })('a.b');
 * // result: { a: { b: 1 } }
 * ```
 */
export const deepStrictAssert =
  <T extends object>(input: T) =>
  <K extends DeepStrictObjectKeys<T>>(key: K): DeepStrictPick<T, K> => {
    const keys = key.split(/(?:\[\*\])?\./g).filter(Boolean);

    const traverse = (input: Record<string, any> | Record<string, any>[], keys: string[]): any => {
      const [first, ...rest] = keys;

      if (input instanceof Array) {
        const elements = input.map((element) => {
          if (first in element) {
            if (typeof element[first] === 'object' && element[first] !== null) {
              return { [first]: traverse(element[first], rest) };
            }

            return { [first]: element[first] };
          }

          return element;
        });

        return elements;
      } else {
        if (first in input) {
          if (typeof input[first] === 'object' && input[first] !== null) {
            return { [first]: traverse(input[first], rest) };
          }
          return { [first]: input[first] };
        }

        throw new Error(`input doesn\'t have key: ${first}`);
      }
    };

    return traverse(input, keys) as DeepStrictPick<T, K>;
  };

import { DeepStrictObjectKeys } from '../types/DeepStrictObjectKeys';
import { DeepStrictPick } from '../types/DeepStrictPick';

/**
 * @title Runtime Function for Type-Safe Deep Property Picking.
 *
 * Takes an object and a dot-notation key path, and returns a new object
 * containing only the specified nested property, preserving the original structure.
 *
 * This is the runtime counterpart of the {@link DeepStrictPick} type.
 *
 * @template T - The object type of the input
 * @template K - The key path to pick
 * @param input - The source object to extract properties from
 * @param key - A dot-notation key path specifying which property to pick
 * @returns A new object containing only the picked property with its original structure
 *
 * @example
 * ```ts
 * const result = deepStrictPick({ a: { b: 1, c: 2 } }, 'a.b');
 * // result: { a: { b: 1 } }
 * ```
 */
export const deepStrictPick = <T extends object, K extends DeepStrictObjectKeys<T>>(
  input: T,
  key: K,
): DeepStrictPick<T, K> => {
  const keys = key.split(/(?:\[\*\])?\./g).filter(Boolean);

  const traverse = (input: Record<string, any> | Record<string, any>[], keys: string[]): any => {
    const [first, ...rest] = keys;

    if (input instanceof Array) {
      const elements = input.map((element) => {
        if (first in element) {
          if (typeof element[first] === 'object' && element[first] !== null && rest.length > 0) {
            return { [first]: traverse(element[first], rest) };
          }

          return { [first]: element[first] };
        }

        return element;
      });

      return elements;
    } else {
      if (first in input) {
        if (typeof input[first] === 'object' && input[first] !== null && rest.length > 0) {
          return { [first]: traverse(input[first], rest) };
        }
        return { [first]: input[first] };
      }

      throw new Error(`input doesn\'t has key: ${first}`);
    }
  };

  return traverse(input, keys) as DeepStrictPick<T, K>;
};

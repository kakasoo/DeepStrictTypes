import type { DeepStrictObjectKeys } from '../types';

/** @internal Removes a leading dot from a string type. e.g., `".foo"` becomes `"foo"`. */
type RemoveStartWithDot<T extends string> = T extends `.${infer R extends string}` ? R : T;

/** @internal Replaces all `[*]` array notation with `${number}` for runtime key path access. */
type Replace<S extends string> = S extends '[*]'
  ? `${number}`
  : S extends `[*].${infer Rest}`
    ? `${number}.${Replace<Rest>}`
    : S extends `${infer Prefix extends string}.[*]${infer Rest}` // `[ ]` 패턴을 찾음
      ? `${Prefix}.${number}${Replace<Rest>}` // `[ ]`를 `${number}`로 대체하고, 나머지를 재귀 처리
      : S extends `${infer Prefix extends string}[*]${infer Rest}`
        ? `${Prefix}.${number}${Replace<Rest>}`
        : S; // 더 이상 `[ ]`가 없으면 문자열 반환

/**
 * @internal The return type for {@link deepStrictObjectKeys}.
 * Converts type-level keys (with `[*]` notation) to runtime-friendly keys (with `${number}` notation),
 * strips leading dots, and wraps the result in an array type.
 */
/** @internal Removes glob patterns (e.g., `'*'`, `'a.*'`) from a string union. */
type WithoutGlob<K extends string> = K extends '*' | `${string}.*` ? never : K;

type DeepStrictObjectKeysResult<
  Target extends object,
  Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
> = [Target] extends [never]
  ? []
  : RemoveStartWithDot<Replace<WithoutGlob<DeepStrictObjectKeys<Target, Joiner, false>>>>[];

/**
 * @title Runtime Function for Extracting All Nested Keys from an Object.
 *
 * Recursively traverses the input object and returns a flat array of all key paths
 * using dot notation. Nested objects produce paths like `"a.b.c"`, and arrays produce
 * indexed paths at runtime.
 *
 * This is the runtime counterpart of the {@link DeepStrictObjectKeys} type.
 *
 * @template Target - The object type to extract keys from
 * @template Joiner - Separator symbols (defaults to `{ array: '[*]', object: '.' }`)
 * @param target - The object instance to extract keys from
 * @returns An array of all dot-notation key paths in the object
 *
 * @example
 * ```ts
 * const keys = deepStrictObjectKeys({ a: { b: 1, c: 2 } });
 * // keys: ["a", "a.b", "a.c"]
 * ```
 */
export function deepStrictObjectKeys<
  Target extends object,
  Joiner extends { array: string; object: string } = { array: '[*]'; object: '.' },
>(target: Target): DeepStrictObjectKeysResult<Target, Joiner> {
  const response = [];
  const keys = Object.keys(target);
  response.push(...keys);

  for (const key of keys) {
    if (key in target) {
      const value = (target as any)[key];
      if (typeof value === 'object' && value !== null) {
        const children = deepStrictObjectKeys(value).map((el) => `${key}.${el}`);
        response.push(...children);
      }
    }
  }

  return Array.from(new Set(response)) as DeepStrictObjectKeysResult<Target, Joiner>;
}

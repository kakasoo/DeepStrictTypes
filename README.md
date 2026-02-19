# @kakasoo/deep-strict-types

[![npm version](https://img.shields.io/npm/v/@kakasoo/deep-strict-types.svg)](https://www.npmjs.com/package/@kakasoo/deep-strict-types)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D5.0-blue)](https://www.typescriptlang.org/)

Type-safe `Pick`, `Omit`, and key extraction for deeply nested TypeScript objects and arrays.

[한국어 설명](./docs/README_KO.md)

![example](https://github.com/user-attachments/assets/28316425-8302-453e-b238-0c732606e6a7)

## Installation

```bash
npm install @kakasoo/deep-strict-types
```

## Quick Start

```typescript
import { DeepStrictObjectKeys, DeepStrictPick, DeepStrictOmit } from '@kakasoo/deep-strict-types';

type User = {
  id: string;
  profile: {
    name: string;
    age: number;
  };
  posts: {
    title: string;
    tags: string[];
  }[];
};

// Extract all nested key paths
type Keys = DeepStrictObjectKeys<User>;
// "id" | "profile" | "profile.name" | "profile.age" | "posts" | "posts[*].title" | "posts[*].tags"

// Pick only what you need
type NameOnly = DeepStrictPick<User, 'profile.name'>;
// { profile: { name: string } }

// Remove what you don't need
type NoAge = DeepStrictOmit<User, 'profile.age'>;
// { id: string; profile: { name: string }; posts: { title: string; tags: string[] }[] }
```

## Core Types

### `DeepStrictObjectKeys<T>`

Extracts all keys from a nested object as a union of dot-notation string paths. Arrays use `[*]` notation.

```typescript
type Example = {
  user: {
    name: string;
    address: { city: string; zip: number };
  };
};

type Keys = DeepStrictObjectKeys<Example>;
// "user" | "user.name" | "user.address" | "user.address.city" | "user.address.zip"
```

```typescript
type WithArray = { items: { name: string; price: number }[] };

type Keys = DeepStrictObjectKeys<WithArray>;
// "items" | "items[*].name" | "items[*].price"
```

### `DeepStrictPick<T, K>`

Creates a new type by selecting only the specified nested keys, preserving the object structure.

```typescript
type Example = {
  user: {
    id: string;
    profile: { name: string; age: number; email: string };
    posts: { title: string; content: string; meta: { likes: number; shares: number } }[];
  };
};

type Picked = DeepStrictPick<Example, 'user.profile.name' | 'user.posts[*].meta.likes'>;
/*
  {
    user: {
      profile: { name: string };
      posts: { meta: { likes: number } }[];
    };
  }
*/
```

### `DeepStrictOmit<T, K>`

Creates a new type by removing the specified nested keys.

```typescript
type Omitted = DeepStrictOmit<Example, 'user.profile.email' | 'user.posts[*].meta.shares'>;
/*
  {
    user: {
      id: string;
      profile: { name: string; age: number };
      posts: { title: string; content: string; meta: { likes: number } }[];
    };
  }
*/
```

### `DeepStrictMerge<Target, Source>`

Deeply merges two object types. When both types share a key, `Target` takes precedence.

```typescript
type A = { user: { id: string; profile: { name: string } } };
type B = { user: { profile: { email: string }; settings: { theme: string } } };

type Merged = DeepStrictMerge<A, B>;
/*
  {
    user: {
      id: string;
      profile: { name: string; email: string };
      settings: { theme: string };
    };
  }
*/
```

Arrays of objects are also merged element-wise:

```typescript
type Merged = DeepStrictMerge<{ a: number }[], { b: string }[]>;
// { a: number; b: string }[]
```

### `GetType<T, K>`

Extracts the type at a specific nested path.

```typescript
type Data = {
  user: {
    name: string;
    posts: { title: string; tags: string[] }[];
  };
};

type T1 = GetType<Data, 'user.name'>;           // string
type T2 = GetType<Data, 'user.posts'>;           // { title: string; tags: string[] }[]
type T3 = GetType<Data, 'user.posts[*].title'>;  // string
type T4 = GetType<Data, 'user.posts[*].tags'>;   // string[]
```

### `DeepDateToString<T>`

Recursively converts all `Date` types to `string`. Useful for representing serialized/JSON response types.

```typescript
type Input = {
  createdAt: Date;
  user: { name: string; birthDate: Date };
};

type Output = DeepDateToString<Input>;
// { createdAt: string; user: { name: string; birthDate: string } }
```

### `DeepStrictUnbrand<T>`

Recursively removes branding (e.g., `typia` tags like `Format<'uuid'>`) from types, restoring base primitives.

```typescript
type Branded = {
  id: string & { __brand: 'uuid' };
  profile: { email: string & { __brand: 'email' } };
};

type Clean = DeepStrictUnbrand<Branded>;
// { id: string; profile: { email: string } }
```

## Runtime Functions

### `deepStrictObjectKeys(obj)`

Runtime counterpart of `DeepStrictObjectKeys`. Returns an array of all dot-notation key paths.

```typescript
import { deepStrictObjectKeys } from '@kakasoo/deep-strict-types';

const keys = deepStrictObjectKeys({ a: { b: 1, c: 2 } });
// ["a", "a.b", "a.c"]
```

### `deepStrictAssert(obj)(key)`

Curried runtime function that extracts a specific nested property, preserving the object structure. Type-safe counterpart of `DeepStrictPick`.

```typescript
import { deepStrictAssert } from '@kakasoo/deep-strict-types';

const data = {
  user: { name: 'Alice', age: 30 },
  posts: [{ title: 'Hello', content: 'World' }],
};

const result = deepStrictAssert(data)('user.name');
// { user: { name: 'Alice' } }
```

## Utility Types

| Type | Description | Example |
|------|-------------|---------|
| `DeepStrictObjectLastKeys<T>` | Extracts only the leaf-level (deepest) keys | `"a.b.c"` instead of `"a" \| "a.b" \| "a.b.c"` |
| `StringToDeepObject<T>` | Converts a comma-separated dot-notation string to a nested object type | `StringToDeepObject<"a.b,c">` = `{ a: { b: any }; c: any }` |
| `Equal<X, Y>` | Type-level equality check (returns `true` or `false`) | `Equal<string, string>` = `true` |
| `ElementOf<T>` | Extracts the element type from an array | `ElementOf<string[]>` = `string` |
| `IsAny<T>` | Checks if a type is `any` | `IsAny<any>` = `true` |
| `IsUnion<T>` | Checks if a type is a union | `IsUnion<string \| number>` = `true` |
| `ValueType` | Union of all primitive types + `Date` | `string \| number \| boolean \| ...` |
| `GetMember<T, Prefix>` | Extracts key segments after a dot-notation prefix | Internal helper for `DeepStrictOmit` |
| `GetElementMember<T, Prefix>` | Extracts array element sub-keys after a `[*]` prefix | Internal helper for `DeepStrictOmit` |
| `RemoveAfterDot<T, K>` | Generates wildcard patterns for descendant keys | Internal helper for `DeepStrictPick` |
| `RemoveArraySymbol<T>` | Strips `[*]` suffix from a key string | `RemoveArraySymbol<"items[*]">` = `"items"` |
| `RemoveLastProperty<T>` | Extracts all parent path segments | `RemoveLastProperty<"a.b.c">` = `"a" \| "a.b"` |

## License

ISC

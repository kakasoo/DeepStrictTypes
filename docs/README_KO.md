# @kakasoo/deep-strict-types

[![npm version](https://img.shields.io/npm/v/@kakasoo/deep-strict-types.svg)](https://www.npmjs.com/package/@kakasoo/deep-strict-types)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-%3E%3D5.0-blue)](https://www.typescriptlang.org/)

깊게 중첩된 TypeScript 객체와 배열을 위한 타입 안전한 `Pick`, `Omit`, 키 추출 유틸리티.

[English](../README.md)

![example](https://github.com/user-attachments/assets/28316425-8302-453e-b238-0c732606e6a7)

## 설치

```bash
npm install @kakasoo/deep-strict-types
```

## 빠른 시작

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

// 모든 중첩 키 경로 추출
type Keys = DeepStrictObjectKeys<User>;
// "id" | "profile" | "profile.name" | "profile.age" | "posts" | "posts[*].title" | "posts[*].tags"

// 원하는 키만 선택
type NameOnly = DeepStrictPick<User, 'profile.name'>;
// { profile: { name: string } }

// 필요 없는 키 제거
type NoAge = DeepStrictOmit<User, 'profile.age'>;
// { id: string; profile: { name: string }; posts: { title: string; tags: string[] }[] }
```

## 핵심 타입

### `DeepStrictObjectKeys<T>`

중첩 객체의 모든 키를 dot 표기법 문자열 유니온으로 추출합니다. 배열은 `[*]` 표기법을 사용합니다.

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

지정한 중첩 키만 선택하여 새 타입을 생성합니다. 객체 구조를 그대로 유지합니다.

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

지정한 중첩 키를 제거하여 새 타입을 생성합니다.

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

두 객체 타입을 깊게 병합합니다. 동일한 키가 있을 경우 `Target`이 우선합니다.

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

배열 내 객체도 요소 단위로 병합됩니다:

```typescript
type Merged = DeepStrictMerge<{ a: number }[], { b: string }[]>;
// { a: number; b: string }[]
```

### `GetType<T, K>`

특정 중첩 경로의 타입을 추출합니다.

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

모든 `Date` 타입을 재귀적으로 `string`으로 변환합니다. 직렬화/JSON 응답 타입 표현에 유용합니다.

```typescript
type Input = {
  createdAt: Date;
  user: { name: string; birthDate: Date };
};

type Output = DeepDateToString<Input>;
// { createdAt: string; user: { name: string; birthDate: string } }
```

### `DeepStrictUnbrand<T>`

브랜딩 타입(예: `typia`의 `Format<'uuid'>` 태그)을 재귀적으로 제거하여 기본 프리미티브 타입으로 복원합니다.

```typescript
type Branded = {
  id: string & { __brand: 'uuid' };
  profile: { email: string & { __brand: 'email' } };
};

type Clean = DeepStrictUnbrand<Branded>;
// { id: string; profile: { email: string } }
```

## 런타임 함수

### `deepStrictObjectKeys(obj)`

`DeepStrictObjectKeys`의 런타임 버전입니다. 모든 dot 표기법 키 경로를 배열로 반환합니다.

```typescript
import { deepStrictObjectKeys } from '@kakasoo/deep-strict-types';

const keys = deepStrictObjectKeys({ a: { b: 1, c: 2 } });
// ["a", "a.b", "a.c"]
```

### `deepStrictAssert(obj)(key)`

특정 중첩 프로퍼티를 추출하는 커링 런타임 함수입니다. 객체 구조를 유지하며, `DeepStrictPick`의 런타임 버전입니다.

```typescript
import { deepStrictAssert } from '@kakasoo/deep-strict-types';

const data = {
  user: { name: 'Alice', age: 30 },
  posts: [{ title: 'Hello', content: 'World' }],
};

const result = deepStrictAssert(data)('user.name');
// { user: { name: 'Alice' } }
```

## 유틸리티 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| `DeepStrictObjectLastKeys<T>` | 리프 레벨(최하위) 키만 추출 | `"a.b.c"` (`"a" \| "a.b" \| "a.b.c"` 대신) |
| `StringToDeepObject<T>` | 콤마 구분 dot 표기법 문자열을 중첩 객체 타입으로 변환 | `StringToDeepObject<"a.b,c">` = `{ a: { b: any }; c: any }` |
| `Equal<X, Y>` | 타입 레벨 동등성 검사 (`true` 또는 `false` 반환) | `Equal<string, string>` = `true` |
| `ElementOf<T>` | 배열의 요소 타입 추출 | `ElementOf<string[]>` = `string` |
| `IsAny<T>` | `any` 타입인지 확인 | `IsAny<any>` = `true` |
| `IsUnion<T>` | 유니온 타입인지 확인 | `IsUnion<string \| number>` = `true` |
| `ValueType` | 모든 프리미티브 타입 + `Date`의 유니온 | `string \| number \| boolean \| ...` |
| `GetMember<T, Prefix>` | dot 표기법 접두사 이후의 키 세그먼트 추출 | `DeepStrictOmit` 내부 헬퍼 |
| `GetElementMember<T, Prefix>` | `[*]` 접두사 이후의 배열 요소 하위 키 추출 | `DeepStrictOmit` 내부 헬퍼 |
| `RemoveAfterDot<T, K>` | 하위 키에 대한 와일드카드 패턴 생성 | `DeepStrictPick` 내부 헬퍼 |
| `RemoveArraySymbol<T>` | 키 문자열에서 `[*]` 접미사 제거 | `RemoveArraySymbol<"items[*]">` = `"items"` |
| `RemoveLastProperty<T>` | 모든 상위 경로 세그먼트 추출 | `RemoveLastProperty<"a.b.c">` = `"a" \| "a.b"` |

## 라이선스

ISC

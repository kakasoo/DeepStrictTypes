# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@kakasoo/deep-strict-types`는 중첩된 배열과 객체 내부의 키를 타입 안전하게 Pick, Omit, 탐색할 수 있는 TypeScript 유틸리티 타입 라이브러리입니다.

npm 패키지로 배포되며, 순수 타입 수준(type-level)의 연산과 런타임 함수를 모두 제공합니다.

## Build & Test Commands

```bash
# 빌드
npm run build              # rimraf bin && tsc (src만 빌드)
npm run build:test         # rimraf bin && tsc -p test/tsconfig.json (테스트 포함 빌드)

# 테스트 (빌드 후 실행)
npm run build:test && npm run test

# 특정 테스트만 실행
npm run build:test && npm run test -- --include DeepStrictPick

# 포매팅
npm run prettier

# typia 패치 (최초 세팅)
npm run prepare            # ts-patch install && typia patch
```

### 테스트 실행 방식

테스트는 `@nestia/e2e`의 `DynamicExecutor`를 사용합니다. `test/features/` 디렉토리에서 `test_` prefix가 붙은 export 함수를 자동으로 수집하여 실행합니다. **Jest/Mocha 등의 테스트 프레임워크를 사용하지 않습니다.**

## Architecture

```
src/
  types/       # 순수 타입 정의 (type-level 연산)
  functions/   # 런타임 함수 (타입과 연동)
  index.ts     # re-export

test/
  features/    # 테스트 파일 (test_types_*, test_functions_*)
  helpers/     # 테스트 유틸리티
  index.ts     # DynamicExecutor 기반 테스트 러너
```

### 핵심 타입

| 타입 | 역할 |
|------|------|
| `DeepStrictObjectKeys<T>` | 중첩 객체의 모든 키를 dot notation으로 추출 (`a.b`, `c[*].d`) |
| `DeepStrictOmit<T, K>` | 중첩 키를 기준으로 deep omit (존재하지 않는 키 사용 시 컴파일 에러) |
| `DeepStrictPick<T, K>` | 중첩 키를 기준으로 deep pick (존재하지 않는 키 사용 시 컴파일 에러) |
| `DeepStrictMerge<T, U>` | 두 객체를 deep merge |
| `DeepOmit<T, K>` | 중첩 키를 기준으로 deep omit (non-strict, 잘못된 키 무시) |
| `DeepPick<T, K>` | 중첩 키를 기준으로 deep pick (non-strict, 잘못된 키 무시) |
| `DeepMerge<T, U>` | 두 객체를 deep merge (source wins, spread 패턴) |
| `DeepDateToString<T>` | Date 타입을 string으로 재귀 변환 |
| `DeepStrictUnbrand<T>` | 브랜드 타입 제거 |
| `GetType<T, K>` | 중첩 경로의 타입 추출 (`GetType<{a: {b: 1}}, "a.b">` → `1`) |
| `StringToDeepObject<T>` | 콤마 구분 dot 표기법 → 중첩 객체 타입 변환 |
| `ElementOf<T>` | 배열 요소 타입 추출 |
| `Equal<A, B>` | 두 타입의 동등성 검사 (테스트용) |
| `IsAny<T>` | any 타입 체크 |
| `IsUnion<T>` | 유니온 타입 체크 |

### 핵심 함수

| 함수 | 역할 |
|------|------|
| `deepStrictAssert<T>(input)<K>(key)` | 런타임에서 특정 키만 추출 (타입 안전) |
| `deepStrictObjectKeys<T>(input)` | 런타임에서 모든 중첩 키 문자열 배열 반환 |
| `deepStrictPick<T>(input)<K>(keys)` | 런타임에서 중첩 키 기준으로 pick (타입 안전) |

## Coding Conventions

### 타입 작성 규칙

1. **PascalCase** 사용 (예: `DeepStrictPick`, `RemoveAfterDot`)
2. **JSDoc 필수** - 모든 export 타입에 `@title`, 설명, 예시 코드 포함
3. **JSDoc은 영어로 작성** - npm 패키지의 국제적 사용을 고려
4. **타입 간 의존성은 import type 사용**
5. **namespace를 활용한 내부 타입 구조화** - 외부 노출 타입과 내부 추론 타입 분리 (예: `DeepStrictOmit.Infer`)
6. **`[*]` 표기법** - 배열 내부 접근 시 사용 (예: `c[*].d`)
7. **Date 타입 특별 처리** - object이지만 재귀 탐색하지 않음

### 파일 구조 규칙

- 하나의 타입/함수 = 하나의 파일 (파일명 = 타입명)
- `index.ts`에서 모든 public 타입/함수를 re-export
- 새 타입/함수 추가 시 반드시 `src/types/index.ts` 또는 `src/functions/index.ts`에 export 추가

### 테스트 규칙

- **함수명**: `test_types_<type_name>_<scenario>` 또는 `test_functions_<func_name>_<scenario>`
- **반드시 export** (DynamicExecutor가 수집하기 위해)
- **파라미터 없음** (M24과 달리 TestOption을 받지 않음)
- **검증 방법**: `Equal<Question, Answer>` 타입으로 타입 레벨 검증 + `typia.random<Answer>()`로 런타임 확인
- **파일명**: 테스트 대상 타입/함수와 동일한 이름
- **하나의 파일에 여러 테스트 함수** 가능 (시나리오별 분리)

### 테스트 패턴

```typescript
import { ok } from 'assert';
import typia from 'typia';
import { DeepStrictPick, Equal } from '../../src';

export function test_types_deep_strict_pick_nested() {
  type Question = DeepStrictPick<{ a: { b: 1; c: 2 } }, "a.b">;
  type Answer = Equal<Question, { a: { b: 1 } }>;
  ok(typia.random<Answer>());
}
```

## PR 체크리스트

PR을 생성하기 전에 **반드시** 다음을 수행합니다:

1. `npm run build:test && npm run test` — 모든 테스트 통과 확인
2. **`npm run prettier`** — 코드 포매팅 (필수, 빠뜨리지 말 것)
3. 커밋 및 푸시

## Git Conventions

### 브랜치 규칙

- 기본 브랜치: `main`
- 기능 브랜치: `kakasoo/<name>` (예: `kakasoo/deep-strict-flat`, `kakasoo/fix-deep-strict-pick`)

### 커밋 메시지

영어로 작성하며 다음 prefix를 사용합니다:

| Prefix | 용도 | 예시 |
|--------|------|------|
| `feat` | 새로운 타입/함수 추가 | `feat: add glob (*) pattern to DeepStrictObjectKeys for wildcard key selection` |
| `fix` | 타입 버그 수정 | `fix: support readonly array type` |
| `test` | 테스트 추가/수정 | `test: add comprehensive test coverage for all types and functions` |
| `docs` | 문서/주석 변경 | `docs: rewrite README with installation, quick start, and full API coverage` |
| `refactor` | 리팩토링 | `refactor: extract to isMatched function` |
| `style` | 코드 포맷팅 | `style: remove unnecessary type` |
| `chore` | 빌드, 설정 변경 | `chore: update test code command` |
| `ci` | CI/CD 변경 | `ci: add test step before npm publish` |

형식: `<prefix>: <소문자로 시작하는 영어 설명>`

규칙:
- prefix 뒤에 콜론과 공백 (`: `)
- 설명은 소문자로 시작, 마침표 없이 끝냄
- 코드 참조 시 백틱 사용 가능 (예: `` chore: add detailed comments for `DeepStrictObjectKeys` ``)
- 한 줄로 작성, 무엇을 했는지 간결하게 기술

## CI/CD

- main 브랜치에 push + `src/` 또는 `package.json` 변경 시 자동으로:
  1. npm install + build
  2. `npm version patch` (자동 버전 증가)
  3. npm publish
  4. git push --follow-tags

## Dependencies

- **런타임**: `@kakasoo/proto-typescript` (프로토타입 유틸리티)
- **개발**: `typia` (런타임 검증/랜덤 생성), `@nestia/e2e` (테스트 러너), `ts-patch` (typia 트랜스폼)

## 비판적 피드백 원칙

사용자의 요청이 다음에 해당하면 **즉시 지적하고 대안을 제시**합니다:

- 타입 레벨 연산에서 `any`, `as` 캐스팅 사용 시도
- Utility Type (`Partial`, `Pick`, `Omit` 등) 직접 사용 (이 라이브러리가 deep 버전을 제공)
- Date를 일반 object처럼 재귀 탐색하려는 시도
- 테스트 없이 새 타입 추가 시도
- `index.ts` re-export 누락

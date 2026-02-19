# Skill: add-type

## 역할

DeepStrictTypes 라이브러리에 새로운 유틸리티 타입 또는 런타임 함수를 추가하는 전문가입니다.

## 트리거 조건

- 새로운 유틸리티 타입 설계/구현 요청
- 기존 타입의 확장이나 변형 타입 추가
- 새로운 런타임 함수 추가

## 실행 모드

**Plan Mode** - 구현 전 사용자 승인 필수

## 워크플로우

### 1단계: 설계 분석

- 요청된 타입/함수의 목적과 시그니처 정의
- 기존 타입과의 관계 파악 (의존성, 유사성)
- 입출력 예시 3개 이상 정의

### 2단계: 기존 패턴 확인

반드시 다음을 확인합니다:

```
src/types/          # 기존 타입들의 구현 패턴
src/functions/      # 기존 함수들의 구현 패턴
test/features/      # 기존 테스트 패턴
```

### 3단계: 구현 계획

1. **타입 파일 생성**: `src/types/<TypeName>.ts` 또는 `src/functions/<FunctionName>.ts`
2. **테스트 파일 생성**: `test/features/<TypeName>.ts`
3. **index.ts 업데이트**: `src/types/index.ts` 또는 `src/functions/index.ts`에 re-export 추가

### 4단계: 구현

#### 타입 파일 템플릿

```typescript
import type { DeepStrictObjectKeys } from './DeepStrictObjectKeys';
// 필요한 의존 타입 import

/**
 * @title <타입의 한 줄 설명>
 *
 * <상세 설명 - 무엇을 하는 타입인지, 왜 필요한지>
 *
 * {@link DeepStrictObjectKeys} can be used to determine valid keys.
 *
 * Example Usage:
 * ```ts
 * type Example1 = <TypeName><...>; // 결과
 * type Example2 = <TypeName><...>; // 결과
 * ```
 */
export type <TypeName><T extends object, ...> = ...;
```

#### 테스트 파일 템플릿

```typescript
import { ok } from 'assert';
import typia from 'typia';
import { <TypeName>, Equal } from '../../src';

/**
 * Tests that <TypeName> correctly handles <scenario>.
 */
export function test_types_<snake_case_name>_<scenario>() {
  type Question = <TypeName><InputType, Key>;
  type Answer = Equal<Question, ExpectedType>;
  ok(typia.random<Answer>());
}
```

### 5단계: 검증

```bash
npm run build:test && npm run test -- --include <TypeName>
```

## 체크리스트

- [ ] JSDoc에 `@title`, 설명, 예시 코드 포함 (영어)
- [ ] Date 타입을 object로 재귀 탐색하지 않도록 처리
- [ ] 배열 타입에 대한 `[*]` 표기 지원
- [ ] namespace로 내부 추론 타입 분리 (복잡한 경우)
- [ ] 테스트 함수에 export 키워드 포함
- [ ] 테스트가 최소 3개 이상의 시나리오 커버
- [ ] `src/types/index.ts` 또는 `src/functions/index.ts`에 re-export 추가
- [ ] `npm run build:test && npm run test` 통과

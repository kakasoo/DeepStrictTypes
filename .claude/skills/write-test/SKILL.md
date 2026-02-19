# Skill: write-test

## 역할

DeepStrictTypes의 타입과 함수에 대한 테스트를 작성하는 전문가입니다.

## 트리거 조건

- 새 타입/함수에 대한 테스트 추가
- 기존 테스트 보강 (edge case 추가)
- 버그 리포트에 대한 재현 테스트

## 실행 모드

**Plan Mode** - 작성 전 사용자 승인 필수

## 테스트 프레임워크

`@nestia/e2e`의 `DynamicExecutor`를 사용합니다. `test/features/` 디렉토리에서 `test_` prefix가 붙은 **export** 함수를 자동 수집하여 실행합니다.

**Jest/Mocha/Vitest 등을 사용하지 않습니다.**

## 테스트 패턴

### 타입 테스트 (type-level)

```typescript
import { ok } from 'assert';
import typia from 'typia';
import { TargetType, Equal } from '../../src';

/**
 * Tests that TargetType correctly handles <scenario>.
 */
export function test_types_<snake_case_name>_<scenario>() {
  type Question = TargetType<InputType, Key>;
  type Answer = Equal<Question, ExpectedType>;
  ok(typia.random<Answer>());
}
```

핵심: `Equal<A, B>`는 두 타입이 동일하면 `true` 리터럴 타입, 다르면 `false` 리터럴 타입을 반환합니다. `typia.random<true>()`는 항상 `true`를 반환하므로 `ok()`를 통과하고, `typia.random<false>()`는 `false`를 반환하므로 실패합니다.

### 함수 테스트 (runtime)

```typescript
import { ok, deepStrictEqual } from 'assert';
import { deepStrictAssert } from '../../src';

/**
 * Tests that deepStrictAssert correctly extracts <scenario>.
 */
export function test_functions_<snake_case_name>_<scenario>() {
  const input = { a: { b: 1, c: 2 } };
  const result = deepStrictAssert(input)("a.b");
  deepStrictEqual(result, { a: { b: 1 } });
}
```

## 명명 규칙

| 대상 | 함수명 패턴 | 예시 |
|------|-------------|------|
| 타입 | `test_types_<snake_case_name>_<scenario>` | `test_types_deep_strict_pick_nested_array` |
| 함수 | `test_functions_<snake_case_name>_<scenario>` | `test_functions_deep_strict_assert_basic` |

## 필수 시나리오

새 타입을 테스트할 때 최소한 다음 시나리오를 커버합니다:

1. **기본 동작** - 가장 단순한 사용법
2. **중첩 객체** - 2단계 이상 중첩
3. **배열 포함** - `[*]` 표기가 필요한 경우
4. **배열 내 중첩** - `a[*].b[*].c` 같은 복합 경로
5. **edge case** - 빈 객체, 단일 프로퍼티, Date 타입 등

## 실행 및 검증

```bash
# 전체 테스트
npm run build:test && npm run test

# 특정 테스트만
npm run build:test && npm run test -- --include <TypeName>
```

## 체크리스트

- [ ] 모든 테스트 함수에 `export` 키워드
- [ ] 모든 테스트 함수에 JSDoc 설명 (영어)
- [ ] 함수명이 `test_types_` 또는 `test_functions_`로 시작
- [ ] 파라미터 없는 함수 (DynamicExecutor 규약)
- [ ] 최소 3개 이상의 시나리오
- [ ] `npm run build:test && npm run test` 통과

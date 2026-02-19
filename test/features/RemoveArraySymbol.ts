import { ok } from 'assert';
import typia from 'typia';
import { RemoveArraySymbol, Equal } from '../../src';

/**
 * Tests that RemoveArraySymbol removes [*] suffix from a key.
 */
export function test_types_remove_array_symbol_basic() {
  type Question = RemoveArraySymbol<'a[*]'>;
  type Answer = Equal<Question, 'a'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveArraySymbol returns the same string when no [*] suffix exists.
 */
export function test_types_remove_array_symbol_no_symbol() {
  type Question = RemoveArraySymbol<'a'>;
  type Answer = Equal<Question, 'a'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveArraySymbol returns empty string when input is only [*].
 */
export function test_types_remove_array_symbol_only_symbol() {
  type Question = RemoveArraySymbol<'[*]'>;
  type Answer = Equal<Question, ''>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveArraySymbol handles dotted path with [*] suffix.
 */
export function test_types_remove_array_symbol_dotted_path() {
  type Question = RemoveArraySymbol<'a.b[*]'>;
  type Answer = Equal<Question, 'a.b'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveArraySymbol with custom array symbol removes [] suffix.
 */
export function test_types_remove_array_symbol_custom_symbol() {
  type Question = RemoveArraySymbol<'items[]', '[]'>;
  type Answer = Equal<Question, 'items'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveArraySymbol with non-matching custom symbol returns the original string.
 */
export function test_types_remove_array_symbol_custom_no_match() {
  type Question = RemoveArraySymbol<'a[*]', '[]'>;
  type Answer = Equal<Question, 'a[*]'>;
  ok(typia.random<Answer>());
}

/**
 * Tests that RemoveArraySymbol does not strip [*] in the middle of a string.
 */
export function test_types_remove_array_symbol_middle_not_stripped() {
  type Question = RemoveArraySymbol<'a[*].b'>;
  type Answer = Equal<Question, 'a[*].b'>;
  ok(typia.random<Answer>());
}

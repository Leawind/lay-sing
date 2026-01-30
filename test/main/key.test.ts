// deno-lint-ignore-file no-explicit-any
import { expect } from '../../src/test-utils.ts'
import type { KeysOfOtherType, KeysOfType } from '../../src/main/key.ts'

type A = { a: 1; b: 2 }
type B = { a: 2; c: 3 }
type C = { a: 3; b: 4; d: 5 }
type D = { a: 3; b: any; c: never; d: unknown }

// KeysOfType
{
  expect<KeysOfType<A, 1>>().toBe<'a'>().success
  expect<KeysOfType<C, 4>>().toBe<'b'>().success
  expect<KeysOfType<C, string>>().toBeNever

  expect<KeysOfType<C, any>>().toBeNever

  expect<KeysOfType<D, 3>>().toBe<'a'>().success
  expect<KeysOfType<D, any>>().toBe<'b'>().success
  expect<KeysOfType<D, never>>().toBe<'c'>().success
  expect<KeysOfType<D, unknown>>().toBe<'d'>().success
  expect<KeysOfType<D, void>>().toBeNever
}
// KeysOfOtherType
{
  expect<KeysOfOtherType<A, 1>>().toBe<'b'>().success
  expect<KeysOfOtherType<B, string>>().toBe<'a' | 'c'>().success
  expect<KeysOfOtherType<C, 4>>().toBe<'a' | 'd'>().success
  expect<KeysOfOtherType<D, any>>().toBe<'a' | 'c' | 'd'>().success
}

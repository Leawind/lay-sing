// deno-lint-ignore-file no-explicit-any no-explicit-any ban-types
import { expect } from '@leawind/lay-sing/test-utils'
import type { KeysOfOtherType, KeysOfType } from '@leawind/lay-sing'

type A = { a: 1; b: 2 }
type B = { a: 2; c: 3 }
type C = { a: 3; b: 4; d: 5 }
type D = { a: 3; b: any; c: never; d: unknown }

// KeysOfType
{
  // Basic
  {
    expect<KeysOfType<{}, string>>().toBeNever

    expect<KeysOfType<A, 1>>().toBe<'a'>().success
    expect<KeysOfType<C, 4>>().toBe<'b'>().success
    expect<KeysOfType<C, string>>().toBeNever

    expect<KeysOfType<C, any>>().toBeNever

    expect<KeysOfType<D, 3>>().toBe<'a'>().success
    expect<KeysOfType<D, any>>().toBe<'b'>().success
    expect<KeysOfType<D, never>>().toBe<'c'>().success
    expect<KeysOfType<D, unknown>>().toBe<'d'>().success
    expect<KeysOfType<D, void>>().toBeNever

    expect<KeysOfType<{ a: 1; b: 2; c: 1 }, 1>>().toBe<'a' | 'c'>().success
  }

  // With never, any, unknown
  {
    expect<KeysOfType<{ a: never }, never>>().toBe<'a'>().success
    expect<KeysOfType<{ a: unknown }, unknown>>().toBe<'a'>().success
    expect<KeysOfType<{ a: any }, any>>().toBe<'a'>().success
  }

  // Union types
  {
    expect<KeysOfType<{ a: 1 | 2; b: 3 }, 1>>().toBeNever
    expect<KeysOfType<{ a: 1; b: 2 | 1 }, 1>>().toBe<'a'>().success
  }

  // Complex cases
  {
    type ComplexObj = {
      str: string
      num: number
      bool: boolean
      arr: string[]
      func: () => void
      nested: { a: string }
    }

    expect<KeysOfType<ComplexObj, string>>().toBe<'str'>().success
    expect<KeysOfType<ComplexObj, number>>().toBe<'num'>().success
    expect<KeysOfType<ComplexObj, boolean>>().toBe<'bool'>().success
    expect<KeysOfType<ComplexObj, string[]>>().toBe<'arr'>().success
    expect<KeysOfType<ComplexObj, () => void>>().toBe<'func'>().success
    expect<KeysOfType<ComplexObj, { a: string }>>().toBe<'nested'>().success
  }

  // Union property types
  expect<KeysOfType<{ a: string | number; b: boolean }, string | number>>().toBe<'a'>().success

  // Optional properties
  {
    expect<KeysOfType<{ a?: string }, number>>().toBeNever
    expect<KeysOfType<{ a?: string }, string>>().toBeNever
    expect<KeysOfType<{ a?: string }, string | undefined>>().toBe<'a'>().success

    expect<KeysOfType<{ a?: string; b: number }, undefined>>().toBeNever

    expect<KeysOfType<{ a?: string; b: string }, string>>().toBe<'b'>().success
    expect<KeysOfType<{ a?: string; b: string }, string | undefined>>().toBe<'a'>().success
  }
}
// KeysOfOtherType
{
  // Basic
  {
    expect<KeysOfOtherType<{}, string>>().toBeNever
    expect<KeysOfOtherType<A, 1>>().toBe<'b'>().success
    expect<KeysOfOtherType<B, string>>().toBe<'a' | 'c'>().success
    expect<KeysOfOtherType<C, 4>>().toBe<'a' | 'd'>().success
    expect<KeysOfOtherType<D, any>>().toBe<'a' | 'c' | 'd'>().success

    expect<KeysOfOtherType<{ a: 1; b: 2; c: 1 }, 1>>().toBe<'b'>().success
  }

  // With never, any, unknown
  {
    expect<KeysOfOtherType<{ a: never; b: string }, never>>().toBe<'b'>().success
    expect<KeysOfOtherType<{ a: unknown; b: string }, unknown>>().toBe<'b'>().success
    expect<KeysOfOtherType<{ a: any; b: string }, any>>().toBe<'b'>().success
  }

  // Union types
  {
    expect<KeysOfOtherType<{ a: 1 | 2; b: 3; c: 4 }, 1>>().toBe<'a' | 'b' | 'c'>().success
    expect<KeysOfOtherType<{ a: 1; b: 2 | 1; c: 3 }, 1>>().toBe<'b' | 'c'>().success
  }

  // Complex cases
  {
    type ComplexObj = {
      str: string
      num: number
      bool: boolean
      arr: string[]
      func: () => void
      other: string
    }

    expect<KeysOfOtherType<ComplexObj, string>>().toBe<'num' | 'bool' | 'arr' | 'func'>().success
    expect<KeysOfOtherType<ComplexObj, number>>().toBe<'str' | 'bool' | 'arr' | 'func' | 'other'>().success
  }

  // Optional properties
  {
    expect<KeysOfOtherType<{ a?: string }, number>>().toBe<'a'>().success
    expect<KeysOfOtherType<{ a?: string }, string | undefined>>().toBeNever

    expect<KeysOfOtherType<{ a?: string; b: number }, undefined>>().toBe<'a' | 'b'>().success

    expect<KeysOfOtherType<{ a?: string; b: string }, string>>().toBe<'a'>().success
    expect<KeysOfOtherType<{ a?: string; b: string }, string | undefined>>().toBe<'b'>().success
  }
}

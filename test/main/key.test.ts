// deno-lint-ignore-file no-explicit-any no-explicit-any ban-types
import { expect } from '@leawind/lay-sing/test-utils'
import type { KeysOfBaseType, KeysOfExactType } from '@leawind/lay-sing'

type A = { a: 1; b: 2 }
type B = { a: 2; c: 3 }
type C = { a: 3; b: 4; d: 5 }
type D = { a: 3; b: any; c: never; d: unknown }

// AllKeysOfType
{
  // Basic
  {
    expect<KeysOfBaseType<{}, string>>().toBeNever

    expect<KeysOfBaseType<A, 1>>().toBe<'a'>().success
    expect<KeysOfBaseType<C, 4>>().toBe<'b'>().success
    expect<KeysOfBaseType<C, string>>().toBeNever

    expect<KeysOfBaseType<C, any>>().toBeNever

    expect<KeysOfBaseType<D, 3>>().toBe<'a'>().success
    expect<KeysOfBaseType<D, any>>().toBe<'b'>().success
    expect<KeysOfBaseType<D, never>>().toBe<'c'>().success
    expect<KeysOfBaseType<D, unknown>>().toBe<'d'>().success
    expect<KeysOfBaseType<D, void>>().toBeNever

    expect<KeysOfBaseType<{ a: 1; b: 2; c: 1 }, 1>>().toBe<'a' | 'c'>().success
  }

  // With never, any, unknown
  {
    expect<KeysOfBaseType<{ a: never }, never>>().toBe<'a'>().success
    expect<KeysOfBaseType<{ a: unknown }, unknown>>().toBe<'a'>().success
    expect<KeysOfBaseType<{ a: any }, any>>().toBe<'a'>().success
  }

  // Union types
  {
    expect<KeysOfBaseType<{ a: 1 | 2; b: 3 }, 1>>().toBeNever
    expect<KeysOfBaseType<{ a: 1; b: 2 | 1 }, 1>>().toBe<'a'>().success
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

    expect<KeysOfBaseType<ComplexObj, string>>().toBe<'str'>().success
    expect<KeysOfBaseType<ComplexObj, number>>().toBe<'num'>().success
    expect<KeysOfBaseType<ComplexObj, boolean>>().toBe<'bool'>().success
    expect<KeysOfBaseType<ComplexObj, string[]>>().toBe<'arr'>().success
    expect<KeysOfBaseType<ComplexObj, () => void>>().toBe<'func'>().success
    expect<KeysOfBaseType<ComplexObj, { a: string }>>().toBe<'nested'>().success
  }

  // Union property types
  expect<KeysOfBaseType<{ a: string | number; b: boolean }, string | number>>().toBe<'a'>().success

  // Optional properties
  {
    expect<KeysOfBaseType<{ a?: string }, number>>().toBeNever
    expect<KeysOfBaseType<{ a?: string }, string>>().toBe<'a'>().success
    expect<KeysOfBaseType<{ a?: string }, string | undefined>>().toBeNever

    expect<KeysOfBaseType<{ a?: string; b: number }, undefined>>().toBeNever

    expect<KeysOfBaseType<{ a?: string; b: string }, string>>().toBe<'a' | 'b'>().success
    expect<KeysOfBaseType<{ a?: string; b: string }, string | undefined>>().toBeNever
  }
}

// KeysOfType
{
  // Basic
  {
    expect<KeysOfExactType<{}, string>>().toBeNever

    expect<KeysOfExactType<A, 1>>().toBe<'a'>().success
    expect<KeysOfExactType<C, 4>>().toBe<'b'>().success
    expect<KeysOfExactType<C, string>>().toBeNever

    expect<KeysOfExactType<C, any>>().toBeNever

    expect<KeysOfExactType<D, 3>>().toBe<'a'>().success
    expect<KeysOfExactType<D, any>>().toBe<'b'>().success
    expect<KeysOfExactType<D, never>>().toBe<'c'>().success
    expect<KeysOfExactType<D, unknown>>().toBe<'d'>().success
    expect<KeysOfExactType<D, void>>().toBeNever

    expect<KeysOfExactType<{ a: 1; b: 2; c: 1 }, 1>>().toBe<'a' | 'c'>().success
  }

  // With never, any, unknown
  {
    expect<KeysOfExactType<{ a: never }, never>>().toBe<'a'>().success
    expect<KeysOfExactType<{ a: unknown }, unknown>>().toBe<'a'>().success
    expect<KeysOfExactType<{ a: any }, any>>().toBe<'a'>().success
  }

  // Union types
  {
    expect<KeysOfExactType<{ a: 1 | 2; b: 3 }, 1>>().toBeNever
    expect<KeysOfExactType<{ a: 1; b: 2 | 1 }, 1>>().toBe<'a'>().success
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

    expect<KeysOfExactType<ComplexObj, string>>().toBe<'str'>().success
    expect<KeysOfExactType<ComplexObj, number>>().toBe<'num'>().success
    expect<KeysOfExactType<ComplexObj, boolean>>().toBe<'bool'>().success
    expect<KeysOfExactType<ComplexObj, string[]>>().toBe<'arr'>().success
    expect<KeysOfExactType<ComplexObj, () => void>>().toBe<'func'>().success
    expect<KeysOfExactType<ComplexObj, { a: string }>>().toBe<'nested'>().success
  }

  // Union property types
  expect<KeysOfExactType<{ a: string | number; b: boolean }, string | number>>().toBe<'a'>().success

  // Optional properties
  {
    expect<KeysOfExactType<{ a?: 1 }, 2>>().toBeNever
    expect<KeysOfExactType<{ a?: 1 }, 1>>().toBeNever
    expect<KeysOfExactType<{ a?: 1 }, 1 | undefined>>().toBe<'a'>().success

    expect<KeysOfExactType<{ a?: 1; b: 2 }, undefined>>().toBeNever

    expect<KeysOfExactType<{ a?: 1; b: 1 | undefined }, 1>>().toBeNever
    expect<KeysOfExactType<{ a?: 1; b: 1 | undefined }, 1 | undefined>>().toBe<'a' | 'b'>().success
  }
}

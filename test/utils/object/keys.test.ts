import { expect } from '@leawind/lay-sing'
import type { KeysOfBaseType, KeysOfExactType } from '@leawind/lay-sing/utils'

type A = { a: 1; b: 2 }
type B = { a: 2; c: 3 }
type C = { a: 3; b: 4; d: 5 }
type D = { a: 3; b: any; c: never; d: unknown }

{
  // Basic
  {
    expect<KeysOfExactType<{}, string>>().toBeNever

    expect<KeysOfExactType<A, 1>>().toBe<'a'>().pass
    expect<KeysOfExactType<C, 4>>().toBe<'b'>().pass
    expect<KeysOfExactType<C, string>>().toBeNever

    expect<KeysOfExactType<C, any>>().toBeNever

    expect<KeysOfExactType<D, 3>>().toBe<'a'>().pass
    expect<KeysOfExactType<D, any>>().toBe<'b'>().pass
    expect<KeysOfExactType<D, never>>().toBe<'c'>().pass
    expect<KeysOfExactType<D, unknown>>().toBe<'d'>().pass
    expect<KeysOfExactType<D, void>>().toBeNever

    expect<KeysOfExactType<{ a: 1; b: 2; c: 1 }, 1>>().toBe<'a' | 'c'>().pass
  }

  // With never, any, unknown
  {
    expect<KeysOfExactType<{ a: never }, never>>().toBe<'a'>().pass
    expect<KeysOfExactType<{ a: unknown }, unknown>>().toBe<'a'>().pass
    expect<KeysOfExactType<{ a: any }, any>>().toBe<'a'>().pass
  }

  // Union types
  {
    expect<KeysOfExactType<{ a: 1 | 2; b: 3 }, 1>>().toBeNever
    expect<KeysOfExactType<{ a: 1; b: 2 | 1 }, 1>>().toBe<'a'>().pass
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

    expect<KeysOfExactType<ComplexObj, string>>().toBe<'str'>().pass
    expect<KeysOfExactType<ComplexObj, number>>().toBe<'num'>().pass
    expect<KeysOfExactType<ComplexObj, boolean>>().toBe<'bool'>().pass
    expect<KeysOfExactType<ComplexObj, string[]>>().toBe<'arr'>().pass
    expect<KeysOfExactType<ComplexObj, () => void>>().toBe<'func'>().pass
    expect<KeysOfExactType<ComplexObj, { a: string }>>().toBe<'nested'>().pass
  }

  // Union property types
  expect<KeysOfExactType<{ a: string | number; b: boolean }, string | number>>().toBe<'a'>().pass

  // Optional properties
  {
    expect<KeysOfExactType<{ a?: 1 }, 2>>().toBeNever
    expect<KeysOfExactType<{ a?: 1 }, 1>>().toBeNever
    expect<KeysOfExactType<{ a?: 1 }, 1 | undefined>>().toBe<'a'>().pass

    expect<KeysOfExactType<{ a?: 1; b: 2 }, undefined>>().toBeNever

    expect<KeysOfExactType<{ a?: 1; b: 1 | undefined }, 1>>().toBeNever
    expect<KeysOfExactType<{ a?: 1; b: 1 | undefined }, 1 | undefined>>().toBe<'a' | 'b'>().pass
  }
}

{
  // Basic
  {
    expect<KeysOfBaseType<{}, string>>().toBeNever

    expect<KeysOfBaseType<A, 1>>().toBe<'a'>().pass
    expect<KeysOfBaseType<C, 4>>().toBe<'b'>().pass
    expect<KeysOfBaseType<C, string>>().toBeNever

    expect<KeysOfBaseType<C, any>>().toBeNever

    expect<KeysOfBaseType<D, 3>>().toBe<'a'>().pass
    expect<KeysOfBaseType<D, any>>().toBe<'b'>().pass
    expect<KeysOfBaseType<D, never>>().toBe<'c'>().pass
    expect<KeysOfBaseType<D, unknown>>().toBe<'d'>().pass
    expect<KeysOfBaseType<D, void>>().toBeNever

    expect<KeysOfBaseType<{ a: 1; b: 2; c: 1 }, 1>>().toBe<'a' | 'c'>().pass
  }

  // With never, any, unknown
  {
    expect<KeysOfBaseType<{ a: never }, never>>().toBe<'a'>().pass
    expect<KeysOfBaseType<{ a: unknown }, unknown>>().toBe<'a'>().pass
    expect<KeysOfBaseType<{ a: any }, any>>().toBe<'a'>().pass
  }

  // Union types
  {
    expect<KeysOfBaseType<{ a: 1 | 2; b: 3 }, 1>>().toBeNever
    expect<KeysOfBaseType<{ a: 1; b: 2 | 1 }, 1>>().toBe<'a'>().pass
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

    expect<KeysOfBaseType<ComplexObj, string>>().toBe<'str'>().pass
    expect<KeysOfBaseType<ComplexObj, number>>().toBe<'num'>().pass
    expect<KeysOfBaseType<ComplexObj, boolean>>().toBe<'bool'>().pass
    expect<KeysOfBaseType<ComplexObj, string[]>>().toBe<'arr'>().pass
    expect<KeysOfBaseType<ComplexObj, () => void>>().toBe<'func'>().pass
    expect<KeysOfBaseType<ComplexObj, { a: string }>>().toBe<'nested'>().pass
  }

  // Union property types
  expect<KeysOfBaseType<{ a: string | number; b: boolean }, string | number>>().toBe<'a'>().pass

  // Optional properties
  {
    expect<KeysOfBaseType<{ a?: string }, number>>().toBeNever
    expect<KeysOfBaseType<{ a?: string }, string>>().toBe<'a'>().pass
    expect<KeysOfBaseType<{ a?: string }, string | undefined>>().toBeNever

    expect<KeysOfBaseType<{ a?: string; b: number }, undefined>>().toBeNever

    expect<KeysOfBaseType<{ a?: string; b: string }, string>>().toBe<'a' | 'b'>().pass
    expect<KeysOfBaseType<{ a?: string; b: string }, string | undefined>>().toBeNever
  }
}

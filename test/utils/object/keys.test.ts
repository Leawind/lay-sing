import { expect } from '@leawind/lay-sing'
import type { KeysOfBaseType, KeysOfExactType } from '@leawind/lay-sing/utils'

type A = { a: 1; b: 2 }
type B = { a: 2; c: 3 }
type C = { a: 3; b: 4; d: 5 }
type D = { a: 3; b: any; c: never; d: unknown }

{
  // Basic
  {
    expect<KeysOfExactType<{}, string>>().to.be.never

    expect<KeysOfExactType<A, 1>>().to.be<'a'>().pass
    expect<KeysOfExactType<C, 4>>().to.be<'b'>().pass
    expect<KeysOfExactType<C, string>>().to.be.never

    expect<KeysOfExactType<C, any>>().to.be.never

    expect<KeysOfExactType<D, 3>>().to.be<'a'>().pass
    expect<KeysOfExactType<D, any>>().to.be<'b'>().pass
    expect<KeysOfExactType<D, never>>().to.be<'c'>().pass
    expect<KeysOfExactType<D, unknown>>().to.be<'d'>().pass
    expect<KeysOfExactType<D, void>>().to.be.never

    expect<KeysOfExactType<{ a: 1; b: 2; c: 1 }, 1>>().to.be<'a' | 'c'>().pass
  }

  // With never, any, unknown
  {
    expect<KeysOfExactType<{ a: never }, never>>().to.be<'a'>().pass
    expect<KeysOfExactType<{ a: unknown }, unknown>>().to.be<'a'>().pass
    expect<KeysOfExactType<{ a: any }, any>>().to.be<'a'>().pass
  }

  // Union types
  {
    expect<KeysOfExactType<{ a: 1 | 2; b: 3 }, 1>>().to.be.never
    expect<KeysOfExactType<{ a: 1; b: 2 | 1 }, 1>>().to.be<'a'>().pass
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

    expect<KeysOfExactType<ComplexObj, string>>().to.be<'str'>().pass
    expect<KeysOfExactType<ComplexObj, number>>().to.be<'num'>().pass
    expect<KeysOfExactType<ComplexObj, boolean>>().to.be<'bool'>().pass
    expect<KeysOfExactType<ComplexObj, string[]>>().to.be<'arr'>().pass
    expect<KeysOfExactType<ComplexObj, () => void>>().to.be<'func'>().pass
    expect<KeysOfExactType<ComplexObj, { a: string }>>().to.be<'nested'>().pass
  }

  // Union property types
  expect<KeysOfExactType<{ a: string | number; b: boolean }, string | number>>().to.be<'a'>().pass

  // Optional properties
  {
    expect<KeysOfExactType<{ a?: 1 }, 2>>().to.be.never
    expect<KeysOfExactType<{ a?: 1 }, 1>>().to.be.never
    expect<KeysOfExactType<{ a?: 1 }, 1 | undefined>>().to.be<'a'>().pass

    expect<KeysOfExactType<{ a?: 1; b: 2 }, undefined>>().to.be.never

    expect<KeysOfExactType<{ a?: 1; b: 1 | undefined }, 1>>().to.be.never
    expect<KeysOfExactType<{ a?: 1; b: 1 | undefined }, 1 | undefined>>().to.be<'a' | 'b'>().pass
  }
}

{
  // Basic
  {
    expect<KeysOfBaseType<{}, string>>().to.be.never

    expect<KeysOfBaseType<A, 1>>().to.be<'a'>().pass
    expect<KeysOfBaseType<C, 4>>().to.be<'b'>().pass
    expect<KeysOfBaseType<C, string>>().to.be.never

    expect<KeysOfBaseType<C, any>>().to.be.never

    expect<KeysOfBaseType<D, 3>>().to.be<'a'>().pass
    expect<KeysOfBaseType<D, any>>().to.be<'b'>().pass
    expect<KeysOfBaseType<D, never>>().to.be<'c'>().pass
    expect<KeysOfBaseType<D, unknown>>().to.be<'d'>().pass
    expect<KeysOfBaseType<D, void>>().to.be.never

    expect<KeysOfBaseType<{ a: 1; b: 2; c: 1 }, 1>>().to.be<'a' | 'c'>().pass
  }

  // With never, any, unknown
  {
    expect<KeysOfBaseType<{ a: never }, never>>().to.be<'a'>().pass
    expect<KeysOfBaseType<{ a: unknown }, unknown>>().to.be<'a'>().pass
    expect<KeysOfBaseType<{ a: any }, any>>().to.be<'a'>().pass
  }

  // Union types
  {
    expect<KeysOfBaseType<{ a: 1 | 2; b: 3 }, 1>>().to.be.never
    expect<KeysOfBaseType<{ a: 1; b: 2 | 1 }, 1>>().to.be<'a'>().pass
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

    expect<KeysOfBaseType<ComplexObj, string>>().to.be<'str'>().pass
    expect<KeysOfBaseType<ComplexObj, number>>().to.be<'num'>().pass
    expect<KeysOfBaseType<ComplexObj, boolean>>().to.be<'bool'>().pass
    expect<KeysOfBaseType<ComplexObj, string[]>>().to.be<'arr'>().pass
    expect<KeysOfBaseType<ComplexObj, () => void>>().to.be<'func'>().pass
    expect<KeysOfBaseType<ComplexObj, { a: string }>>().to.be<'nested'>().pass
  }

  // Union property types
  expect<KeysOfBaseType<{ a: string | number; b: boolean }, string | number>>().to.be<'a'>().pass

  // Optional properties
  {
    expect<KeysOfBaseType<{ a?: string }, number>>().to.be.never
    expect<KeysOfBaseType<{ a?: string }, string>>().to.be<'a'>().pass
    expect<KeysOfBaseType<{ a?: string }, string | undefined>>().to.be.never

    expect<KeysOfBaseType<{ a?: string; b: number }, undefined>>().to.be.never

    expect<KeysOfBaseType<{ a?: string; b: string }, string>>().to.be<'a' | 'b'>().pass
    expect<KeysOfBaseType<{ a?: string; b: string }, string | undefined>>().to.be.never
  }
}

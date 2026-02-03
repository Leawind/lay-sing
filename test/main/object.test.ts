import { expect } from '@leawind/lay-sing/test-utils'
import type {
  Access,
  AssertExtends,
  DeepPartial,
  DeepRequire,
  InverseAccess,
  PropsOfBaseType,
  SafePick,
} from '@leawind/lay-sing'

{
  type A = { a: string; b?: number; c: boolean }
  type B = { a: bigint; b?: symbol; c: string }

  expect<Access<A, 'a'>>().toBe<string>().success
  expect<Access<A, 'b'>>().toBe<number | undefined>().success
  expect<Access<A, 'x', 'default'>>().toBe<'default'>().success

  expect<Access<A, 'a' | 'b'>>().toBe<string | number | undefined>().success
  expect<Access<A, 'a' | 'c'>>().toBe<string | boolean>().success

  expect<Access<A | B, 'a'>>().toBe<string | bigint>().success
  expect<Access<A | B, 'a' | 'c'>>().toBe<string | bigint | boolean>().success
}

{
  type A = {
    a: 1
    b: 2
    c: 3
  }

  type M<K extends keyof A> = A[K]
  type W<V> = InverseAccess<A, V>
  {
    expect<M<'a'>>().toBe<1>().success
    expect<M<'b'>>().toBe<2>().success
    expect<M<'c'>>().toBe<3>().success
  }
  {
    expect<W<1>>().toBe<'a'>().success
    expect<W<2>>().toBe<'b'>().success
    expect<W<3>>().toBe<'c'>().success

    expect<W<1 | 2>>().toBe<'a' | 'b'>().success

    expect<W<4>>().toBeNever
    expect<W<'a'>>().toBeNever
    expect<W<never>>().toBeNever
    expect<W<unknown>>().toBe<'a' | 'b' | 'c'>().success
    expect<W<any>>().toBe<'a' | 'b' | 'c'>().success
  }
}

// DeepPartial
{
  type MyObject = { a: string; b?: number; c: boolean }
  expect<DeepPartial<MyObject>>().toBe<{ a?: string; b?: number; c?: boolean }>().success
}
// DeepRequire
{
  expect<DeepRequire<{ a?: 1; b?: 2 }>>().toBe<{ a: 1; b: 2 }>().success
  expect<DeepRequire<{ a: 1 | undefined; b?: 2 }>>().toBe<{ a: 1 | undefined; b: 2 }>().success

  expect<DeepRequire<{ _?: 1 }>>().toBe<{ _: 1 }>().success
  expect<DeepRequire<{ _?: { _?: 1 } }>>().toBe<{ _: { _: 1 } }>().success
  expect<DeepRequire<{ _?: { _?: { _?: 1 } } }>>().toBe<{ _: { _: { _: 1 } } }>().success

  type NestedType = { a?: string; b: number; nested?: { c?: string } }
  expect<DeepRequire<NestedType>['nested']>().toBe<{ c: string }>().success
}

// AssertExtends
{
  expect<AssertExtends<string, number>>().toBeNever
  expect<AssertExtends<string, string>>().toBe<string>().success
  expect<AssertExtends<boolean, true>>().toBeNever

  // distributive check
  expect<AssertExtends<1 | 2, 1>>().toBeNever
  expect<AssertExtends<1, 1 | 2>>().toBe<1>().success
  expect<AssertExtends<1 | 2, 1 | 2>>().toBe<1 | 2>().success
}

// SafePick
{
  type Picked = SafePick<{ a: string; b: number }, 'a' | 'c'>
  expect<Picked>().toBe<{ a: string }>().success
}

// PropsOfType
{
  type TestObj = { a: 1; b: 2; c: 1; d: 4 }

  // Basic functionality
  {
    expect<PropsOfBaseType<TestObj, 1>>().toBe<{ a: 1; c: 1 }>().success
    expect<PropsOfBaseType<TestObj, 2>>().toBe<{ b: 2 }>().success
    expect<PropsOfBaseType<TestObj, 4>>().toBe<{ d: 4 }>().success

    expect<PropsOfBaseType<TestObj, 'no such key'>>().toBe<{}>().success
  }
  // Optional properties
  {
    expect<PropsOfBaseType<{ a?: 1 }, 1>>().toBe<{ a?: 1 }>().success
    expect<PropsOfBaseType<{ a?: 1 }, 1 | undefined>>().toBe<{}>().success
    expect<PropsOfBaseType<{ a?: 1; c: 1; b?: 2; d: 3 }, 1>>().toBe<{ a?: 1; c: 1 }>().success
  }
  // Edge cases
  {
    expect<PropsOfBaseType<{}, 1>>().toBe<{}>().success
  }
}

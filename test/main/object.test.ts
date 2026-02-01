// deno-lint-ignore-file ban-types no-explicit-any
import { expect } from '../../src/test-utils/index.ts'
import type {
  Access,
  AssertExtends,
  DeepPartial,
  DeepRequire,
  InverseAccess,
  PropsOfBaseType,
  SafePick,
} from '@leawind/lay-sing'

type MyObject = { a: string; b?: number; c: boolean }

// Access
{
  expect<Access<MyObject, 'a'>>().toBe<string>().success
  expect<Access<MyObject, 'b'>>().toBe<number | undefined>().success
  expect<Access<MyObject, 'x', 'default'>>().toBe<'default'>().success
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
  expect<DeepPartial<MyObject>>().toBe<{ a?: string; b?: number; c?: boolean }>().success
}
// DeepRequire
{
  type NestedType = { a?: string; b: number; nested?: { c?: string } }
  expect<DeepRequire<NestedType>['nested']>().toBe<{ c?: string }>().success
}

// AssertExtends
{
  expect<AssertExtends<string, number>>().toBeNever
  expect<AssertExtends<string, string>>().toBe<string>().success
  expect<AssertExtends<boolean, true>>().toBeNever
  expect<AssertExtends<1 | 2, 1>>().toBeNever
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

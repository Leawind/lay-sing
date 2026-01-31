// deno-lint-ignore-file ban-types
import { expect } from '@leawind/lay-sing/test-utils'
import type {
  Access,
  AssertExtends,
  DeepPartial,
  DeepRequire,
  PropsOfBaseType,
  PropsOfOtherType,
  SafePick,
} from '@leawind/lay-sing'

type MyObject = { a: string; b?: number; c: boolean }

// Access
{
  expect<Access<MyObject, 'a'>>().toBe<string>().success
  expect<Access<MyObject, 'b'>>().toBe<number | undefined>().success
  expect<Access<MyObject, 'x', 'default'>>().toBe<'default'>().success
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

// PropsOfOtherType
{
  type TestObj = { a: string; b: number; c: string; d: boolean }

  // Basic functionality
  {
    expect<PropsOfOtherType<TestObj, string>>().toBe<{ b: number; d: boolean }>().success
    expect<PropsOfOtherType<TestObj, number>>().toBe<{ a: string; c: string; d: boolean }>().success
    expect<PropsOfOtherType<TestObj, boolean>>().toBe<{ a: string; b: number; c: string }>().success
  }

  // Testing with exact type matches (since KeysOfOtherType uses Same via KeysOfType)
  {
    type NotStringProps = PropsOfOtherType<TestObj, string>
    expect<NotStringProps>().toBe<{ b: number; d: boolean }>().success

    type NotNumberProps = PropsOfOtherType<TestObj, number>
    expect<NotNumberProps>().toBe<{ a: string; c: string; d: boolean }>().success
  }

  // Edge cases
  {
    expect<PropsOfOtherType<{}, string>>().toBe<{}>().success
    type PartialObj = { a?: string; b?: number; c: string }
    expect<PropsOfOtherType<PartialObj, string>>().toBe<{ a?: string; b?: number }>().success
  }
}

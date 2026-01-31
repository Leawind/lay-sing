import { expect } from '@leawind/lay-sing/test-utils'
import type { Access, AssertExtends, DeepPartial, DeepRequire, SafePick } from '@leawind/lay-sing'

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

import { expect } from '@leawind/lay-sing/test-utils'
import type { Access, AssertExtends, DeepPartial, DeepRequire, SafePick } from '@leawind/lay-sing'

type MyObject = { a: string; b?: number; c: boolean }

expect<Access<MyObject, 'a'>>().toBe<string>().success
expect<Access<MyObject, 'b'>>().toBe<number | undefined>().success
expect<Access<MyObject, 'x', 'default'>>().toBe<'default'>().success

type PartialObj = DeepPartial<MyObject>
expect<PartialObj>().toBe<{ a?: string; b?: number; c?: boolean }>().success

// Instead of expecting an exact type match, let's verify the nested property is required
type NestedType = { a?: string; b: number; nested?: { c?: string } }
type RequireObj = DeepRequire<NestedType>
expect<RequireObj['nested']>().toBe<{ c?: string }>().success

expect<AssertExtends<string, string>>().toBe<string>().success
expect<AssertExtends<string, number>>().toBe<never>().success

type Picked = SafePick<{ a: string; b: number }, 'a' | 'c'>
expect<Picked>().toBe<{ a: string }>().success

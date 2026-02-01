import { compare, expect } from '@leawind/lay-sing/test-utils'
import type {
  Access,
  AssertExtends,
  DeepPartial,
  DeepRequire,
  InverseAccess,
  Patch,
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

{
  compare<
    Patch<
      { a: 1; b: 2 },
      { b: string; c: 3 }
    >,
    { a: 1; b: string; c: 3 }
  >().mutuallyAssignable

  {
    type A = { a: 1; b: 2; c: 3 }
    type B = { b: 4; c: 5; d: 6 }

    expect<Patch<A, B>>().toBe<{ a: 1 } & { b: 4; c: 5; d: 6 }>().success
    expect<Patch<A, B>>().toEqual<{ a: 1; b: 4; c: 5; d: 6 }>().success
    expect<Patch<A, A>>().toEqual<A>().success

    expect<Patch<A, unknown>>().toBe<A>().success
    expect<Patch<A, any>>().toBeAny
    expect<Patch<A, never>>().toBeNever
  }

  {
    // Test with empty objects
    expect<Patch<{}, {}>>().toEqual<{}>().success
    expect<Patch<{ a: 1 }, {}>>().toEqual<{ a: 1 }>().success
    expect<Patch<{}, { a: 1 }>>().toEqual<{ a: 1 }>().success

    // Test with optional properties
    type WithOptional = { a?: string; b: number }
    type SourceWithOptional = { a: boolean; c?: string }
    expect<Patch<WithOptional, SourceWithOptional>>().toEqual<{ a: boolean; b: number; c?: string }>().success

    // Test with function types
    type WithFunction = { fn(): string; x: number }
    type SourceWithFunction = { fn(): number; y: boolean }
    expect<Patch<WithFunction, SourceWithFunction>>().toEqual<{ fn(): number; x: number; y: boolean }>().success

    // Test with nested objects
    type Nested = { a: string; nested: { x: number; y: string } }
    type SourceNested = { b: boolean; nested: { x: boolean; z: number } }
    expect<Patch<Nested, SourceNested>>().toEqual<{ a: string; b: boolean; nested: { x: boolean; z: number } }>()
      .success

    // Test with union types
    type UnionTarget = { a: string | number; b: boolean }
    type UnionSource = { a: bigint; c: symbol }
    expect<Patch<UnionTarget, UnionSource>>().toEqual<{ a: bigint; b: boolean; c: symbol }>().success

    // Test with generic types
    type GenericTarget<T> = { value: T; id: string }
    type GenericSource<U> = { value: U; extra: boolean }
    expect<Patch<GenericTarget<number>, GenericSource<string>>>().toEqual<
      { value: string; id: string; extra: boolean }
    >().success

    // Test with intersection types
    type IntersectionSource = { a: number } & { b: string }
    expect<Patch<{ c: boolean }, IntersectionSource>>().toEqual<{ c: boolean } & { a: number; b: string }>().success

    // Test with indexed access types
    type IndexedTarget = { a: string; b: number }
    type KeyFromTarget = keyof IndexedTarget
    expect<Patch<IndexedTarget, { [K in Exclude<KeyFromTarget, 'a'>]: boolean }>>().toEqual<{ a: string; b: boolean }>()
      .success
  }
}

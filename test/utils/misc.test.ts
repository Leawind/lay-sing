import { expect } from '@leawind/lay-sing'
import type { IntersectionOf, UnionOf } from '@leawind/lay-sing/utils'

type A = { a: string; b: number }
type B = { a: number; b: number; c: symbol }
type C = { b: number; c: boolean }
{
  expect<IntersectionOf<[]>>().toBeUnknown
  expect<IntersectionOf<[A]>>().toBe<A>().pass

  expect<IntersectionOf<[A, B]>>().toBe<A & B>().pass
  expect<IntersectionOf<[B, C]>>().toBe<B & C>().pass
  expect<IntersectionOf<[A, C]>>().toBe<A & C>().pass

  expect<IntersectionOf<[A, B, C]>>().toBe<A & B & C>().pass
  expect<IntersectionOf<never>>().toBeNever
}
{
  expect<UnionOf<[]>>().toBeNever

  expect<UnionOf<[A]>>().toBe<A>().pass

  expect<UnionOf<[A, B]>>().toBe<A | B>().pass
  expect<UnionOf<[B, C]>>().toBe<B | C>().pass
  expect<UnionOf<[A, C]>>().toBe<A | C>().pass

  expect<UnionOf<[A, B, C]>>().toBe<A | B | C>().pass
  expect<UnionOf<never>>().toBeNever

  expect<UnionOf<[A, B] | [A, C]>>().toBe<A | B | C>().pass
}

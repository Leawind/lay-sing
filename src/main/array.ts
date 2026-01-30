import type { AssertExtends } from './object.ts'
import type { Same } from './type/compare.ts'

export type ReadonlyArray<T = unknown> = readonly T[]

export type ConcatArray<A, B> = A extends readonly unknown[] ? (B extends readonly unknown[] ? [...A, ...B] : never)
  : never

export type TupleIncludes<
  Tuple extends readonly unknown[],
  Element,
> = Tuple extends readonly [infer First, ...infer Rest]
  ? (Same<Element, First> extends true ? true : TupleIncludes<Rest, Element>)
  : false

export type PushIfNotExists<
  Tuple extends readonly unknown[],
  Element,
> = TupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

export type UnionArray<
  A,
  B,
  R extends readonly unknown[] = AssertExtends<A, readonly unknown[]>,
> = B extends readonly [infer First, ...infer Rest] ? UnionArray<A, Rest, PushIfNotExists<R, First>> : R

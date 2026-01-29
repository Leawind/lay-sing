import type { Same } from './boolean.ts'
import type { AssertExtends } from './pure.ts'

export type ReadonlyArray<T = unknown> = readonly T[]

export type TupleIncludes<
  Tuple extends ReadonlyArray,
  Element,
> = Tuple extends readonly [infer First, ...infer Rest]
  ? (Same<Element, First> extends true ? true : TupleIncludes<Rest, Element>)
  : false

export type PushIfNotExists<
  Tuple extends ReadonlyArray,
  Element,
> = TupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

export type UnionArray<
  A,
  B,
  R extends ReadonlyArray = AssertExtends<A, ReadonlyArray>,
> = B extends readonly [infer First, ...infer Rest] ? UnionArray<A, Rest, PushIfNotExists<R, First>> : R

export type ConcatArray<A, B> = A extends ReadonlyArray ? (B extends ReadonlyArray ? [...A, ...B] : never) : never

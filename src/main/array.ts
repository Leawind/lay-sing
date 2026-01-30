import type { Same } from './type/compare.ts'

export type ReadonlyArray<T = unknown> = readonly T[]

export type ConcatTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends readonly unknown[] ? (Right extends readonly unknown[] ? [...Left, ...Right] : never) : never

export type TupleIncludes<
  Tuple extends readonly unknown[],
  Element,
> = Tuple extends readonly [infer First, ...infer Rest]
  ? (Same<Element, First> extends true ? true : TupleIncludes<Rest, Element>)
  : false

export type AppendUnique<
  Tuple extends readonly unknown[],
  Element,
> = TupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

export type ConcatUniqueTuple<
  A extends readonly unknown[],
  B extends readonly unknown[],
  R extends readonly unknown[] = A,
> = B extends readonly [infer First, ...infer Rest] ? ConcatUniqueTuple<A, Rest, AppendUnique<R, First>> : R

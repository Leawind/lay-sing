import type { Same } from './type/compare.ts'

/**
 * Represents a readonly array of type T
 */
export type ReadonlyArray<T = unknown> = readonly T[]

/**
 * Concatenates two tuples into a single tuple type
 *
 * ### Examples
 *
 * ```ts
 * type Result = ConcatTuple<[1, 2], [3, 4]> // [1, 2, 3, 4]
 * ```
 */
export type ConcatTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends readonly unknown[] ? (Right extends readonly unknown[] ? [...Left, ...Right] : never) : never

/**
 * Checks whether a tuple includes a specific element type
 *
 * ### Examples
 *
 * ```ts
 * type HasTwo = TupleIncludes<[1, 2, 3], 2> // true
 * type HasFour = TupleIncludes<[1, 2, 3], 4> // false
 * ```
 */
export type TupleIncludes<
  Tuple extends readonly unknown[],
  Element,
> = Tuple extends readonly [infer First, ...infer Rest]
  ? (Same<Element, First> extends true ? true : TupleIncludes<Rest, Element>)
  : false

/**
 * Appends an element to a tuple only if it doesn't already exist in the tuple
 *
 * ### Examples
 *
 * ```ts
 * type Result1 = AppendUnique<[1, 2, 3], 4> // [1, 2, 3, 4]
 * type Result2 = AppendUnique<[1, 2, 3], 2> // [1, 2, 3]
 * ```
 */
export type AppendUnique<
  Tuple extends readonly unknown[],
  Element,
> = TupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

/**
 * Concatenates two tuples while ensuring uniqueness of elements
 *
 * ### Examples
 *
 * ```ts
 * type Result = ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]> // [1, 2, 3, 4]
 * ```
 */
export type ConcatUniqueTuple<
  A extends readonly unknown[],
  B extends readonly unknown[],
  R extends readonly unknown[] = A,
> = B extends readonly [infer First, ...infer Rest] ? ConcatUniqueTuple<A, Rest, AppendUnique<R, First>> : R

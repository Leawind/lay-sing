// deno-lint-ignore-file no-explicit-any
import type { Same } from './type/compare.ts'

/**
 * Represents a readonly array of type T
 */
export type ReadonlyArray<T = unknown> = readonly T[]

/**
 * Concatenates two tuples into a single tuple type
 *
 * @example
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
 * @example
 * ```ts
 * type HasTwo = IfTupleIncludes<[1, 2, 3], 2> // true
 * type HasFour = IfTupleIncludes<[1, 2, 3], 4> // false
 * ```
 */
export type IfTupleIncludes<
  Tuple extends readonly unknown[],
  Element,
  Yes = true,
  No = false,
> = Same<Tuple, any> extends true ? never
  : Tuple extends readonly [infer First, ...infer Rest]
    ? (Same<Element, First> extends true ? Yes : IfTupleIncludes<Rest, Element, Yes, No>)
  : No

/**
 * Appends an element to a tuple only if it doesn't already exist in the tuple
 *
 * @example
 * ```ts
 * type Result1 = AppendUnique<[1, 2, 3], 4> // [1, 2, 3, 4]
 * type Result2 = AppendUnique<[1, 2, 3], 2> // [1, 2, 3]
 * ```
 */
export type AppendUnique<
  Tuple extends readonly unknown[],
  Element,
> = IfTupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

/**
 * Concatenates two tuples while ensuring uniqueness of elements
 *
 * @example
 * ```ts
 * type Result = ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]> // [1, 2, 3, 4]
 * ```
 */
export type ConcatUniqueTuple<
  A extends readonly unknown[],
  B extends readonly unknown[],
  R extends readonly unknown[] = A,
> = B extends readonly [infer First, ...infer Rest] ? ConcatUniqueTuple<A, Rest, AppendUnique<R, First>> : R

import type { Exact } from './type/compare.ts'

/**
 * Concatenates two tuples into a single tuple type
 *
 * @template Left - The first tuple type to concatenate
 * @template Right - The second tuple type to concatenate
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<ConcatTuple<[1, 2], [3, 4]>>().toBe<[1, 2, 3, 4]>().success
 * ```
 */
export type ConcatTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends readonly unknown[] ? (Right extends readonly unknown[] ? [...Left, ...Right] : never) : never

/**
 * Checks whether a tuple includes a specific element type
 *
 * @template Tuple - The tuple type to check
 * @template Element - The element type to look for
 * @template Yes - The result if the element is found (defaults to `true`)
 * @template No - The result if the element is not found (defaults to `false`)
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<IfTupleIncludes<[1, 2, 3], 2>>().toBeTrue
 * expect<IfTupleIncludes<[1, 2, 3], 4>>().toBeFalse
 * expect<IfTupleIncludes<[1, 2, 1], 1>>().toBeTrue
 * ```
 */
export type IfTupleIncludes<
  Tuple extends readonly unknown[],
  Element,
  Yes = true,
  No = false,
> = Exact<Tuple, any> extends true ? never
  : Tuple extends readonly [infer First, ...infer Rest]
    ? (Exact<Element, First> extends true ? Yes : IfTupleIncludes<Rest, Element, Yes, No>)
  : No

/**
 * Appends an element to a tuple only if it doesn't already exist in the tuple
 *
 * @template Tuple - The tuple type to append to
 * @template Element - The element type to append
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<AppendUnique<[1, 2, 3], 4>>().toBe<[1, 2, 3, 4]>().success
 * expect<AppendUnique<[1, 2, 3], 2>>().toBe<[1, 2, 3]>().success
 * ```
 */
export type AppendUnique<
  Tuple extends readonly unknown[],
  Element,
> = IfTupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

/**
 * Concatenates two tuples while ensuring uniqueness of elements
 *
 * @template Left - The first tuple type to concatenate
 * @template Right - The second tuple type to concatenate
 * @template R - The intermediate result tuple type (defaults to `Left`)
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]>>().toBe<[1, 2, 3, 4]>().success
 * ```
 */
export type ConcatUniqueTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
  R extends readonly unknown[] = Left,
> = Right extends readonly [infer First, ...infer Rest] ? ConcatUniqueTuple<Left, Rest, AppendUnique<R, First>> : R

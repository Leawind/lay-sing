import type { Exact } from '../index.ts'

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

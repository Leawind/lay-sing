import type { IfTupleIncludes } from '../index.ts'

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
 * expect<AppendUnique<[1, 2, 3], 4>>().to.be<[1, 2, 3, 4]>().pass
 * expect<AppendUnique<[1, 2, 3], 2>>().to.be<[1, 2, 3]>().pass
 * ```
 */
export type AppendUnique<
  Tuple extends readonly unknown[],
  Element,
> = IfTupleIncludes<Tuple, Element> extends true ? Tuple : [...Tuple, Element]

// Import needed for ConcatUniqueTuple
import type { AppendUnique } from '../index.ts'

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
 * expect<ConcatTuple<[1, 2], [3, 4]>>().to.be<[1, 2, 3, 4]>().pass
 * ```
 */
export type ConcatTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends readonly unknown[] ? (Right extends readonly unknown[] ? [...Left, ...Right] : never) : never

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
 * expect<ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]>>().to.be<[1, 2, 3, 4]>().pass
 * ```
 */
export type ConcatUniqueTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
  R extends readonly unknown[] = Left,
> = Right extends readonly [infer First, ...infer Rest] ? ConcatUniqueTuple<Left, Rest, AppendUnique<R, First>> : R

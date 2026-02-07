import type { Exact } from '../index.ts'

/**
 * Checks whether type `A` extends type `B`.
 *
 * **⚠️Important:** parameter `A` and `B` are not distributive. When they are union type, it treats them as a single entity.
 *
 * @template A - The type to check if it extends another type
 * @template B - The type to check if `A` extends
 * @template Yes - The result if `A` extends `B` (defaults to `true`)
 * @template No - The result if `A` does not extend `B` (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` is assignable to `B`
 * - `No`: Otherwise
 */
export type Extends<
  A,
  B,
  Yes = true,
  No = false,
> = [A] extends [B] ? Yes : No

/**
 * Checks whether type `A` is a *proper* subtype of type `B`.
 *
 * A proper extension means:
 * - `A` extends `B`
 * - `A` is not exactly the same type as `B`
 *
 * @template A - The type to check if it is a proper subtype
 * @template B - The type to check against
 * @template Yes - The result if `A` is a proper subtype of `B` (defaults to `true`)
 * @template No - The result if `A` is not a proper subtype of `B` (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` is a proper subtype of `B`
 * - `No`: Otherwise
 *
 * **Note:** the result will never be `boolean`.
 *
 * @example
 * ```ts
 * type T1 = ProperExtend<true, boolean> // true
 * type T2 = ProperExtend<1, number> // true
 * type F1 = ProperExtend<boolean, boolean> // false
 * type F2 = ProperExtend<number, string> // false
 * ```
 */
export type ProperExtend<
  A,
  B,
  Yes = true,
  No = false,
> = [A] extends [B] ? Exact<A, B> extends false ? Yes : No : No

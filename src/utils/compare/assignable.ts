/**
 * Checks whether two types are mutually assignable.
 *
 * This is equivalent to checking that:
 * - `A` extends `B`
 * - `B` extends `A`
 *
 * In other words, the two types describe the same set of values,
 * even if they are written differently.
 *
 * @template A - The first type to check
 * @template B - The second type to check
 * @template Yes - The result if types are mutually assignable (defaults to `true`)
 * @template No - The result if types are not mutually assignable (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` are mutually assignable
 * - `No`: Otherwise
 *
 * @example
 * ```ts
 * type T1 = MutuallyAssignable<number, number> // true
 * type T2 = MutuallyAssignable<1 | 2, 2 | 1> // true
 * type F1 = MutuallyAssignable<string, number> // false
 * type F2 = MutuallyAssignable<1, number> // false
 * ```
 */
export type MutuallyAssignable<
  A,
  B,
  Yes = true,
  No = false,
> = [A] extends [B] ? [B] extends [A] ? Yes : No : No

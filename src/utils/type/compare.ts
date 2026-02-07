/**
 * Checks whether two types are exactly the same.
 *
 * **⚠️Important:** parameter `A` and `B` are not distributive. When they are union type, it does not check each member separately.
 *
 * @template A - The first type to compare
 * @template B - The second type to compare
 * @template Yes - The result if types are exactly the same (defaults to `true`)
 * @template No - The result if types are not exactly the same (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` are exactly the same
 * - `No`: Otherwise
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<Exact<string, string>>().toBeTrue
 * expect<Exact<never, never>>().toBeTrue
 * expect<Exact<any, any>>().toBeTrue
 *
 * expect<Exact<{ a: 3 }, { a?: 3 }>>().toBeFalse
 * expect<Exact<1 | 2, 1>>().toBeFalse
 * expect<Exact<1, number>>().toBeFalse
 * expect<Exact<() => void, () => undefined>>().toBeFalse
 * ```
 */
export type Exact<
  A,
  B,
  Yes = true,
  No = false,
> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Yes : No

/**
 * Checks whether two types are not exactly the same.
 *
 * This is the logical negation of `Exact<A, B>`.
 *
 * @template A - The first type to compare
 * @template B - The second type to compare
 * @template Yes - The result if types are not exactly the same (defaults to `true`)
 * @template No - The result if types are exactly the same (defaults to `false`)
 *
 * @example
 * ```ts
 * type T1 = NotExact<number, string> // true
 * type T2 = NotExact<1, number> // true
 * type F1 = NotExact<number, number> // false
 * type F2 = NotExact<1, 1> // false
 * ```
 */
export type NotExact<
  A,
  B,
  Yes = true,
  No = false,
> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? No : Yes

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

/**
 * Checks whether two types have any overlapping members.
 *
 * @template A - The first type to check for overlap
 * @template B - The second type to check for overlap
 * @template Yes - The result if types overlap (defaults to `true`)
 * @template No - The result if types do not overlap (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` share at least one common type
 * - `No`: `A` and `B` are completely disjoint
 *
 * @example
 * ```ts
 * type T1 = Overlap<1 | 2, 2 | 3> // true
 * type T2 = Overlap<string, 'hello'> // true
 * type F1 = Overlap<string, number> // false
 * type F2 = Overlap<1, 'one'> // false
 * ```
 */
export type Overlap<
  A,
  B,
  Yes = true,
  No = false,
> = [A & B] extends [never] ? No : Yes

/**
 * Checks whether two types are disjoint.
 *
 * This is the logical negation of `Overlap<A, B>`.
 *
 * @template A - The first type to check for disjointness
 * @template B - The second type to check for disjointness
 * @template Yes - The result if types are disjoint (defaults to `true`)
 * @template No - The result if types are not disjoint (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` have no overlap
 * - `No`: `A` and `B` share at least one common type
 *
 * @example
 * ```ts
 * type T1 = Disjoint<string, number> // true
 * type T2 = Disjoint<1, 'one'> // true
 * type F1 = Disjoint<1 | 2, 2 | 3> // false
 * type F2 = Disjoint<string, 'hello'> // false
 * ```
 */
export type Disjoint<
  A,
  B,
  Yes = true,
  No = false,
> = [A & B] extends [never] ? Yes : No

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

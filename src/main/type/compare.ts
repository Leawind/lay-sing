/**
 * Checks whether two types are exactly the same.
 *
 * This performs a structural equality comparison between `A` and `B`,
 * rather than a one-way assignability check.
 *
 * ### Result
 *
 * - `true`: `A` and `B` are identical types
 * - `false`: Otherwise
 */
export type Same<
  A,
  B,
  Yes = true,
  No = false,
> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Yes : No

/**
 * Checks whether two types are different.
 *
 * This is the logical negation of `Same<A, B>`.
 *
 * ### Result
 *
 * - `true`: `A` and `B` are not identical
 * - `false`: `A` and `B` are exactly the same type
 */
export type Diff<
  A,
  B,
  Yes = true,
  No = false,
> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? No : Yes

/**
 * Checks whether type `A` extends type `B`.
 *
 * This is a non-distributive version of `extends`, ensuring
 * the result is always a concrete boolean literal.
 *
 * ### Result
 *
 * - `true`: `A` is assignable to `B`
 * - `false`: Otherwise
 *
 * **Note:** the result will never be `boolean`.
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
 * **Note:** the result will never be `boolean`.
 */
export type ProperExtend<
  A,
  B,
  Yes = true,
  No = false,
> = [A] extends [B] ? Same<A, B> extends false ? Yes : No : No

/**
 * Checks whether two types have any overlapping members.
 *
 * ### Result
 *
 * - `true`: `A` and `B` share at least one common type
 * - `false`: `A` and `B` are completely disjoint
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
 * ### Result
 *
 * - `true`: `A` and `B` have no overlap
 * - `false`: `A` and `B` share at least one common type
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
 */
export type MutuallyAssignable<
  A,
  B,
  Yes = true,
  No = false,
> = [A] extends [B] ? [B] extends [A] ? Yes : No : No

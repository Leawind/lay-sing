/**
 * Checks if two types are exactly equal (structurally identical).
 *
 * ### Result
 *
 * - `true`: A and B are exactly the same type
 * - `false`: Otherwise
 */
export type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
export type Diff<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? false : true

/**
 * ### Result
 *
 * - `true`: A extends B
 * - `false`: A does not extend B
 *
 * **Note: the result will never be `boolean`**
 */
export type Extends<A, B> = [A] extends [B] ? true : false

/**
 * **Note: the result will never be `boolean`**
 */
export type ProperExtend<A, B> = [A] extends [B] ? Same<A, B> extends false ? true : false : false

export type Overlap<A, B> = [A & B] extends [never] ? false : true
export type Disjoint<A, B> = [A & B] extends [never] ? true : false

export type MutuallyAssignable<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false

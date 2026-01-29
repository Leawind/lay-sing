export type Not<B extends true | false> = B extends true ? false : true
export type And<A extends true | false, B extends true | false> = A extends true ? B extends true ? true : false : false
export type Or<A extends true | false, B extends true | false> = A extends true ? true : B extends true ? true : false
export type Xor<A extends true | false, B extends true | false> = And<A, Not<B>> | And<B, Not<A>>
export type Nand<A extends true | false, B extends true | false> = Not<And<A, B>>
export type Nor<A extends true | false, B extends true | false> = Not<Or<A, B>>

export type Extends<A, B> = A extends B ? true : false

/**
 * Checks if two types are exactly equal (structurally identical).
 *
 * ```ts
 * // Literal vs base type
 * type T1 = Same<3, number>;            // false
 *
 * // Special types
 * type T2 = Same<never, any>;           // false
 * type T3 = Same<any, 3>;               // false
 * type T4 = Same<any, unknown>;         // false
 * type T5 = Same<unknown, any>;         // false
 *
 * // Subtype vs supertype
 * type T6 = Same<string, string | number>;  // false
 *
 * // Modifier differences
 * type T7 = Same<{a: 1}, {readonly a: 1}>;  // false
 * type T8 = Same<{a?: 1}, {a: 1 | undefined}>;  // false
 *
 * // Function type differences
 * type T9 = Same<() => void, () => undefined>;  // false
 *
 * // Equal types
 * type T10 = Same<any, any>;                    // true
 * type T11 = Same<never, never>;                // true
 * type T12 = Same<5, 5>;                        // true
 * type T13 = Same<string, string>;              // true
 * type T14 = Same<number | string, string | number>;  // true
 *
 * // Different syntax, same type
 * type T15 = Same<{a: number[]}, {a: Array<number>}>;  // true
 * ```
 */
export type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
export type Diff<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? false : true

export type ProperExtend<A, B> = And<Extends<A, B>, Not<Same<A, B>>>

export type Overlap<A, B> = [Extract<A, B>] extends [never] ? false : true

export type MutuallyAssignable<A, B> = And<Extends<A, B>, Extends<B, A>>

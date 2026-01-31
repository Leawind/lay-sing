import type { KeysOfOtherType, KeysOfType } from './key.ts'

/**
 * Access a property `K` of object `T`, with a fallback `E` if the property doesn't exist
 *
 * @example
 * ```ts
 * type Result = Access<{ a: string }, 'a'> // string
 * type Missing = Access<{ a: string }, 'x', 'default'> // 'default'
 * ```
 */
export type Access<T, K extends PropertyKey, E = never> = K extends keyof T ? T[K] : E

/**
 * Recursively makes all properties of `T` optional
 *
 * @example
 * ```ts
 * type Result = DeepPartial<{ a: string; nested: { b: number } }> // { a?: string; nested?: { b?: number } }
 * ```
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Recursively makes all properties of `T` required
 *
 * @example
 * ```ts
 * type Result = DeepRequire<{ a?: string; nested?: { b?: number } }>
 * // { a: string; nested: { b: number } }
 * ```
 */
export type DeepRequire<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequire<T[P]> : T[P]
}

/**
 * Returns `T` if `T` extends `A`, otherwise returns never
 *
 * @example
 * ```ts
 * type _1 = AssertExtends<string, string> // string
 * type _2 = AssertExtends<string, number> // never
 * ```
 */
export type AssertExtends<T, A> = T extends A ? T : never

/**
 * Safely picks keys `K` from type T, excluding non-existent keys
 *
 * @example
 * ```ts
 * type Result = SafePick<{ a: string; b: number }, 'a' | 'c'> // { a: string }
 * ```
 */
export type SafePick<T, K> = Pick<T, K & keyof T>

/**
 * Picks properties from `T` that have values of type U
 *
 * @example
 * ```ts
 * type A = { a: string; b: number; c: string }
 * type Strings = PropsOfType<A, string> // { a: string; c: string }
 * ```
 */
export type PropsOfType<T, U> = Pick<T, KeysOfType<T, U>>

/**
 * Picks properties from `T` that do not have values of type U
 *
 * @example
 * ```ts
 * type A = { a: string; b: number; c: string }
 * type NonStrings = PropsOfOtherType<A, string> // { b: number }
 * ```
 */
export type PropsOfOtherType<T, U> = Pick<T, KeysOfOtherType<T, U>>

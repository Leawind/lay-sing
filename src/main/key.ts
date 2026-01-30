import type { Same } from './type/index.ts'

/**
 * Extracts the keys of type T that have values of type U
 *
 * ### Example
 *
 * ```ts
 * type A = { a: 1; b: 2; c: 1 }
 * type Keys = KeysOfType<A, 1> // 'a' | 'c'
 * ```
 */
export type KeysOfType<T, U> = Exclude<{ [K in keyof T]: Same<T[K], U> extends true ? K : never }[keyof T], undefined>

/**
 * Extracts the keys of type T that do not have values of type U
 *
 * ### Example
 *
 * ```ts
 * type A = { a: 1; b: 2; c: 1 }
 * type Keys = KeysOfOtherType<A, 1> // 'b'
 * ```
 */
export type KeysOfOtherType<T, U> = Exclude<keyof T, KeysOfType<T, U>>

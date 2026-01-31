import type { Same } from './type/index.ts'

/**
 * Extracts the keys of type `Obj` that have values of type `ValueType`
 *
 * @example
 * ```ts
 * type A = { a: 1; b: 2; c: 1 }
 * type Keys = KeysOfType<A, 1> // 'a' | 'c'
 * ```
 */
export type KeysOfType<Obj, ValueType> = Exclude<
  { [K in keyof Obj]: Same<Obj[K], ValueType> extends true ? K : never }[keyof Obj],
  undefined
>

/**
 * Extracts the keys of type `Obj` that do not have values of type `ValueType`
 *
 * @example
 * ```ts
 * type A = { a: 1; b: 2; c: 1 }
 * type Keys = KeysOfOtherType<A, 1> // 'b'
 * ```
 */
export type KeysOfOtherType<Obj, ValueType> = Exclude<keyof Obj, KeysOfType<Obj, ValueType>>

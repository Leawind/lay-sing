import type { KeysOfExactType } from './key.ts'

/**
 * **⚠️Important:** parameter `T` and `U` are not distributive. When they are union type, it treats them as a single entity.
 *
 * @template T - The type to test (not distributed over unions)
 * @template U - The constraint type to test against
 *
 * @example
 *
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * expect<AssertExtends<string, number>>().toBeNever
 * expect<AssertExtends<1 | 2, 1>>().toBeNever
 * expect<AssertExtends<1, 1 | 2>>().toBe<1>().success
 * ```
 */
export type AssertExtends<T, U> = [T] extends [U] ? T : never

/**
 * Safely picks keys `Key` from type `Obj`, excluding non-existent keys
 *
 * @template Obj - The object type to pick keys from
 * @template Key - The keys to pick from the object
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * type Result = SafePick<{ a: string; b: number }, 'a' | 'c'>
 * expect<Result>().toBe<{ a: string }>().success
 * ```
 */
export type SafePick<Obj, Key> = Pick<Obj, Key & keyof Obj>

/**
 * Picks properties from `T` that have values of type `U`
 *
 * @template T - The object type to pick properties from
 * @template U - The value type to match against
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 * type A = { a: string; b: number; c: string }
 * type Strings = PropsOfBaseType<A, string> // { a: string; c: string }
 * expect<PropsOfBaseType<A, string>>().toBe<{ a: string; c: string }>()
 * ```
 */
export type PropsOfBaseType<T, U> = Pick<T, KeysOfExactType<Required<T>, U>>

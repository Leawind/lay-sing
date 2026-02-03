import type { KeysOfExactType } from './key.ts'

/**
 * Get property type from object, with fallback for missing keys.
 *
 * @template Obj - The object type to access
 * @template K - The key to access in the object
 * @template E - The fallback type if the key doesn't exist (defaults to `never`)
 *
 * @returns `Obj[K]` if key exists, otherwise `E`.
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * type User = { name: string; age?: number };
 *
 * expect<Access<User, 'name'>>().toBe<string>().success
 * expect<Access<User, 'age'>>().toBe<number | undefined>().success
 * expect<Access<User, 'email', 'none'>>().toBe<'none'>().success
 * ```
 */
export type Access<Obj, K extends PropertyKey, E = never> = K extends keyof Obj ? Obj[K] : E

/**
 * Inverse of `Access` - gets keys from an object that have values of a specific type
 *
 * @template T - The object type to inspect
 * @template V - The value type to match against
 * @template E - The fallback type if no keys match (defaults to `never`)
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * expect<InverseAccess<{ a: string }, string>>().toBe<'a'>().success
 * expect<InverseAccess<{ a: string; b: string }, string>>().toBe<'a' | 'b'>().success
 * expect<InverseAccess<{ a: string }, number>>().toBe<never>().success
 * ```
 */
export type InverseAccess<T, V, E = never> = { [K in keyof T]: T[K] extends V ? K : E }[keyof T]

/**
 * Recursively makes all properties of `T` optional
 *
 * @template T - The object type to make deep partial
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * type Result = DeepPartial<{ a: string; nested: { b: number } }>
 * expect<Result>().toBe<{ a?: string; nested?: { b?: number } }>().success
 * ```
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Recursively makes all properties of `T` required
 *
 * @template T - The object type to make deep required
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * expect<DeepRequire<{ _?: { _?: 1 } }>>().toBe<{ _: { _: 1 } }>().success
 * ```
 */
export type DeepRequire<T> = {
  [K in keyof T]-?: T[K] extends object | undefined ? DeepRequire<NonNullable<T[K]>> : T[K]
}

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

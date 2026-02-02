import type { KeysOfExactType } from './key.ts'

/**
 * Get property type from object, with fallback for missing keys.
 *
 * @returns `Obj[K]` if key exists, otherwise `E`.
 *
 * @example
 * type User = { name: string; age?: number };
 *
 * Access<User, 'name'>;          // string
 * Access<User, 'age'>;           // number | undefined
 * Access<User, 'email', 'none'>; // 'none'
 */
export type Access<Obj, K extends PropertyKey, E = never> = K extends keyof Obj ? Obj[K] : E

/**
 * Inverse of `Access`
 *
 * @example
 * ```ts
 * type Result = InverseAccess<{ a: string }, string> // 'a'
 * ```
 */
export type InverseAccess<T, V, E = never> = { [K in keyof T]: T[K] extends V ? K : E }[keyof T]

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
 * A non-distributive conditional type that checks if the entire type `T`
 * (treated as a single entity) is assignable to type `U`.
 *
 * Unlike the built-in distributive version (`Extract<T, U>`), this type wraps `T` and `U` in tuples to
 * prevent distribution over union types. The entire type `T` must satisfy
 * the constraint `U` for the check to pass.
 *
 * @template T - The type to test (not distributed over unions)
 * @template U - The constraint type to test against
 *
 * @example
 *
 * ```ts
 * // Non-distributive check - entire type must satisfy constraint
 * type T1 = string | number;
 * type Test1 = AssertExtends<T1, string | number>; // string | number
 * type Test2 = AssertExtends<T1, string>; // never
 *
 * // Compare distributive vs non-distributive behavior
 * type Union1 = 'a' | 'b'
 * type Dist = Extract<Union1, string> // 'a' | 'b'
 * type NonDist = AssertExtends<Union1, string> // 'a' | 'b'
 *
 * type Union2 = 'a' | 1
 * type Dist2 = Extract<Union2, string> // 'a'
 * type NonDist2 = AssertExtends<Union2, string> // never
 * ```
 */
export type AssertExtends<T, U> = [T] extends [U] ? T : never

/**
 * Safely picks keys `K` from type T, excluding non-existent keys
 *
 * @example
 * ```ts
 * type Result = SafePick<{ a: string; b: number }, 'a' | 'c'> // { a: string }
 * ```
 */
export type SafePick<Obj, Key> = Pick<Obj, Key & keyof Obj>

/**
 * Picks properties from `T` that have values of type U
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

/**
 * Patch `Source` into `Target`
 *
 * @example
 * ```ts
 * type A = { a: 1; b: 2; }
 * type B = { b: string; c: 3 }
 * Patch<A, B> // { a: 1; b: string; c: 3 }
 */
export type Patch<Target, Source> = Omit<Target, keyof Source> & Source

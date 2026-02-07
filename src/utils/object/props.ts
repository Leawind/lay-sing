import type { KeysOfBaseType } from '../index.ts'

/**
 * Picks properties from `T` that have values of type `U`
 *
 * @template T - The object type to pick properties from
 * @template U - The value type to match against
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 * type A = { a: string; b: number; c: string }
 * type Strings = PropsOfBaseType<A, string> // { a: string; c: string }
 * expect<PropsOfBaseType<A, string>>().toBe<{ a: string; c: string }>()
 * ```
 */
export type PropsOfBaseType<T, U> = Pick<T, KeysOfBaseType<Required<T>, U>>

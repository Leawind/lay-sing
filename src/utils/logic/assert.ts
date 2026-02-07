/**
 * **⚠️Important:** parameter `T` and `U` are not distributive. When they are union type, it treats them as a single entity.
 *
 * @template T - The type to test (not distributed over unions)
 * @template U - The constraint type to test against
 *
 * @example
 *
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<AssertExtends<string, number>>().toBeNever
 * expect<AssertExtends<1 | 2, 1>>().toBeNever
 * expect<AssertExtends<1, 1 | 2>>().toBe<1>().success
 * ```
 */
export type AssertExtends<T, U> = [T] extends [U] ? T : never

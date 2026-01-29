import type { ReadonlyArray } from './array.ts'

/**
 * ## `Intersects<[A, B, ... T]>` = `A & B & ... & T`
 *
 * ### Example
 *
 * ```ts
 * type A = { a: string, b: number };
 * type B = { a: number, c: boolean };
 *
 * type Result = Intersect<[A, B]>;
 * type Result = { a: never, b: number, c: boolean }
 * ```
 */
export type IntersectOf<T extends ReadonlyArray> = T extends [infer F, ...infer R] ? F & IntersectOf<R> : unknown

export type CommonKeysOf<T extends ReadonlyArray> = T extends [infer F, ...infer R] ? keyof F & CommonKeysOf<R> : never
export type DiffKeysOf<T extends ReadonlyArray> = Omit<IntersectOf<T>, CommonKeysOf<T>>

/**
 * ## `Union<[A, B, ... T]>` = `A | B | ... | T`
 *
 * ### Example
 *
 * ```ts
 * type A = { a: string, b: number };
 * type B = { a: number, c: boolean };
 *
 * type Result = Union<[A, B]>;
 * type Result = { a: string | number }
 * ```
 */
export type UnionOf<T extends ReadonlyArray> = T extends [infer F, ...infer R] ? F | UnionOf<R> : never

/**
 * ### Example
 *
 * ```ts
 *  type A = { name: string; gender: string; a: boolean }
 *  type B = { name: string; gender: symbol; b: bigint }
 *
 *  type Result = DiffPropOf<[A, B]>
 *  type Result = {
 *    a: boolean
 *    b: bigint
 *  }
 * ```
 */
export type DiffPropOf<T extends ReadonlyArray> = Omit<IntersectOf<T>, keyof UnionOf<T>>

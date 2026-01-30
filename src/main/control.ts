import type { Same } from './type/compare.ts'

export type If<C extends boolean, T, F = never> = [C] extends [never] ? never
  : C extends true ? T
  : F

export type IfFalse<C extends boolean, T, F = never> = [C] extends [never] ? never
  : C extends false ? T
  : F

/**
 * Used with:
 * - {@link Switch}
 * - {@link SwitchExtends}
 */
export type Case<T = unknown, Return = unknown> = [T, Return]
/**
 * Used with:
 *
 * - {@link Switch}
 * - {@link SwitchExtends}
 *
 * ### Example
 *
 * ```ts
 * type NameMap<id> = Switch<id, [
 *   Case<1, 'Alice'>,
 *   Case<2, 'Bob'>,
 *   Case<3, 'Charlie'>,
 * ], DefaultCase<'Steve'>>
 * ```
 */
export type DefaultCase<T> = T

/**
 * ### Example
 *
 * ```ts
 * type Result = Switch<2, [
 *   Case<1, 'Alice'>,
 *   Case<2, 'Bob'>,
 *   Case<3, 'Charlie'>,
 * ], DefaultCase<'Steve'>>
 *
 * // Result: 'Bob'
 * ```
 */
export type Switch<
  T,
  Cases extends readonly Case[],
  Default = never,
> = Cases extends [infer First, ...infer Rest] ? (
    First extends [infer C, infer R]
      ? (Same<T, C> extends true ? R : (Switch<T, Rest extends readonly Case[] ? Rest : never, Default>))
      : (never)
  )
  : Default

export type SwitchExtends<
  T,
  Cases extends readonly Case[],
  Default = never,
> = Cases extends [infer First, ...infer Rest] ? (
    First extends [infer C, infer R]
      ? ([T] extends [C] ? R : SwitchExtends<T, Rest extends readonly Case[] ? Rest : never, Default>)
      : never
  )
  : Default

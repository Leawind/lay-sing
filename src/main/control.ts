import type { Same } from './type/compare.ts'

/**
 * Conditional type - returns `T` if condition `C` is true, otherwise returns `F`
 *
 * ### Result
 *
 * - `never`: if `C` is `never`
 * - `T`: if `C` is `true`
 * - `F`: if `C` is `false`
 *
 * ### Example
 *
 * ```ts
 * type Result = If<true, 'yes', 'no'> // 'yes'
 * type Result2 = If<false, 'yes', 'no'> // 'no'
 * type NeverResult = If<never, 'yes', 'no'> // never
 * ```
 */
export type If<C extends boolean, T, F = never> = [C] extends [never] ? never
  : C extends true ? T
  : F

/**
 * Conditional type - returns `T` if condition `C` is false, otherwise returns `F`
 *
 * ### Result
 *
 * - `never`: if `C` is `never`
 * - `T`: if `C` is `false`
 * - `F`: if `C` is `true`
 *
 * ### Example
 *
 * ```ts
 * type Result = IfFalse<false, 'yes', 'no'> // 'yes'
 * type Result2 = IfFalse<true, 'yes', 'no'> // 'no'
 * type NeverResult = IfFalse<never, 'yes', 'no'> // never
 * ```
 */
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

/**
 * Switch type that uses 'extends' logic instead of 'Same' logic
 *
 * ### Example
 * ```ts
 * type Result = SwitchExtends<string | number, [
 *   Case<string, 'string type'>,
 *   Case<number, 'number type'>,
 * ], 'other'>
 * // Result: 'string type' | 'number type'
 * ```
 */
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

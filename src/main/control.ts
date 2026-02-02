import type { Exact } from './type/compare.ts'

/**
 * Conditional type - returns `T` if condition `C` is true, otherwise returns `F`
 *
 * ### Result
 *
 * - `never`: if `C` is `never`
 * - `Yes`: if `C` is `true`
 * - `No`: if `C` is `false`
 *
 * @example
 * ```ts
 * type Result = If<true, 'yes', 'no'> // 'yes'
 * type Result2 = If<false, 'yes', 'no'> // 'no'
 * type NeverResult = If<never, 'yes', 'no'> // never
 * ```
 */
export type If<
  Condition extends boolean,
  Yes,
  No = never,
> = [Condition] extends [never] ? never
  : Condition extends true ? Yes
  : No

/**
 * Conditional type - returns `T` if condition `C` is false, otherwise returns `F`
 *
 * ### Result
 *
 * - `never`: if `C` is `never`
 * - `Yes`: if `C` is `false`
 * - `No`: if `C` is `true`
 *
 * @example
 * ```ts
 * type Result = IfFalse<false, 'yes', 'no'> // 'yes'
 * type Result2 = IfFalse<true, 'yes', 'no'> // 'no'
 * type NeverResult = IfFalse<never, 'yes', 'no'> // never
 * ```
 */
export type IfFalse<
  Condition extends boolean,
  Yes,
  No = never,
> = [Condition] extends [never] ? never
  : Condition extends false ? Yes
  : No

/**
 * Used with:
 * - {@link SwitchExact}
 * - {@link SwitchExtends}
 */
export type Case<T = unknown, Result = unknown> = [T, Result]

/**
 * Used with:
 *
 * - {@link SwitchExact}
 * - {@link SwitchExtends}
 *
 * @example
 * ```ts
 * type NameMap<id> = SwitchExact<id, [
 *   Case<1, 'Alice'>,
 *   Case<2, 'Bob'>,
 *   Case<3, 'Charlie'>,
 * ], DefaultCase<'Steve'>>
 * ```
 */
export type DefaultCase<T> = T

/**
 * @example
 * ```ts
 * type Result = SwitchExact<2, [
 *   Case<1, 'Alice'>,
 *   Case<2, 'Bob'>,
 *   Case<3, 'Charlie'>,
 * ], DefaultCase<'Steve'>>
 *
 * // Result: 'Bob'
 * ```
 */
export type SwitchExact<
  T,
  Cases extends readonly Case[],
  Default = never,
> = Cases extends [infer First, ...infer Rest] ? (
    First extends [infer Condition, infer Result] ? (Exact<T, Condition> extends true ? Result
        : (SwitchExact<T, Rest extends readonly Case[] ? Rest : never, Default>))
      : (never)
  )
  : Default

/**
 * Switch type that uses 'extends' logic instead of 'Exact' logic
 *
 * @example ```ts
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

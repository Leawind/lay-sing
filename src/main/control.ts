import type { Exact } from './type/compare.ts'

/**
 * Conditional type - returns `Yes` if condition `Condition` is true, otherwise returns `No`
 *
 * @template Condition - The boolean condition to check
 * @template Yes - The type to return if condition is true
 * @template No - The type to return if condition is false (defaults to `never`)
 *
 * @example
 * ```ts
 * type Result = If<true, 'yes', 'no'> // 'yes'
 * type Result2 = If<false, 'yes', 'no'> // 'no'
 * type BoolResult = If<boolean, 'yes', 'no'> // boolean
 * ```
 */
export type If<Condition extends boolean, Yes, No = never> = Condition extends true ? Yes : No

/**
 * Conditional type - returns `Yes` if condition `Condition` is false, otherwise returns `No`
 *
 * @template Condition - The boolean condition to check
 * @template Yes - The type to return if condition is false
 * @template No - The type to return if condition is true (defaults to `never`)
 *
 * ### Result
 *
 * - `never`: if `Condition` is `never`
 * - `Yes`: if `Condition` is `false`
 * - `No`: if `Condition` is `true`
 *
 * @example
 * ```ts
 * type Result = IfFalse<false, 'yes', 'no'> // 'yes'
 * type Result2 = IfFalse<true, 'yes', 'no'> // 'no'
 * type BoolResult = IfFalse<boolean, 'yes', 'no'> // boolean
 * ```
 */
export type IfFalse<Condition extends boolean, Yes, No = never> = Condition extends false ? Yes : No

/**
 * Case tuple type used with `SwitchExact` and `SwitchExtends`
 *
 * @template T - The condition type to match against
 * @template Result - The result type to return if match is found
 *
 * @example
 * ```ts
 * type MyCase = Case<1, 'one'>
 * // Equivalent to: [1, 'one']
 * ```
 *
 * @see SwitchExact
 */
export type Case<T = unknown, Result = unknown> = [T, Result]

/**
 * Default case type used with `SwitchExact` and `SwitchExtends`
 *
 * @template T - The default result type
 *
 * @example
 * ```ts
 * type NameMap<id> = SwitchExact<id, [
 *   [1, 'Alice'],
 *   [2, 'Bob'],
 * ], DefaultCase<'Steve'>>
 * ```
 *
 * @see SwitchExact
 */
export type DefaultCase<T> = T

/**
 * Switch type that uses exact matching logic
 *
 * **⚠️Important:** `T` parameter is not distributive. When `T` is a union type, it does not check each member separately.
 *
 * @template T - The type to match against cases
 * @template Cases - Array of case tuples, each tuple has the form [Condition, Result]
 * @template Default - Default result if no exact match is found (defaults to `never`)
 *
 * @example
 * ```ts
 * type Result = SwitchExact<2, [
 *   [1, 'Alice'],
 *   [2, 'Bob'],
 *   [3, 'Charlie'],
 * ], DefaultCase<'Steve'>>
 *
 * // Result: 'Bob'
 * ```
 */
export type SwitchExact<
  T,
  Cases extends readonly [unknown, unknown][],
  Default = never,
> = Cases extends [infer First, ...infer Rest] ? (
    First extends [infer Condition, infer Result] ? (Exact<T, Condition> extends true ? Result
        : (SwitchExact<T, Rest extends readonly [unknown, unknown][] ? Rest : never, Default>))
      : (never)
  )
  : Default

/**
 * Switch type that uses 'extends' logic instead of 'Exact' logic
 *
 * **⚠️Important:** `T` parameter is not distributive. When `T` is a union type, it does not check each member separately.
 *
 * @template T - The type to match against cases
 * @template Cases - Array of case tuples, each tuple has the form [Condition, Result]
 * @template Default - Default result if no match is found (defaults to `never`)
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * expect<
 *   SwitchExtends<string, [
 *     [number, boolean],
 *     [string, boolean],
 *   ], Error>
 * >().toBe<boolean>().success
 * ```
 */
export type SwitchExtends<
  T,
  Cases extends readonly [unknown, unknown][],
  Default = never,
> = Cases extends [infer First, ...infer Rest] ? (
    First extends [infer C, infer R]
      ? ([T] extends [C] ? R : SwitchExtends<T, Rest extends readonly [unknown, unknown][] ? Rest : never, Default>)
      : never
  )
  : Default

import type { Exact, IntersectionOf } from '@leawind/lay-sing/utils'
import type { BuiltInComponents } from './builtin/index.ts'

/**
 * Represents the result of a type assertion based on a boolean condition.
 *
 * - If `true`, the result has a `success` property;
 * - If `false`, the result has a `fail` property;
 * - Otherwise, the result is `never`
 *
 * @template B The boolean condition result (true or false)
 * @template R The type of the result value (default is void)
 */
export type TypeAssertionResult<B extends boolean, R = void> = Exact<B, never> extends true ? never
  : [boolean] extends [B] ? never
  : [B] extends [true] ? {
      /**
       * This field exist only when this type assertion succeed
       *
       * If you expect this assertion to fail, use `.fail`
       */
      success: R
    }
  : [B] extends [false] ? {
      /**
       * This field exist only when this type assertion failed
       *
       * If you expect this assertion to success, use `.success`
       */
      fail: R
    }
  : never

/**
 * Type-level testing utility that allows checking various relationships between types.
 * Provides methods to test type equality, extension, properties, and more.
 *
 * @template T The type being tested
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * // Test if two types are identical
 * expect<number>().toBe<number>().success
 * expect<number>().toBe<string>().fail
 * // Test if one type extends another
 * expect<2>().toExtend<number>().success
 * expect<2>().toExtend<string>().fail
 * // Test if type has a specific property
 * expect<{name: string}>().toHaveKey<'name'>().success
 * ```
 */
export type ExpectType<
  T,
  C extends {}[] = BuiltInComponents<T>,
> = IntersectionOf<C>

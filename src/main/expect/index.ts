import type { Exact } from '@leawind/lay-sing/utils'
import type { To } from './to/index.ts'

/**
 * Represents the result of a type assertion based on a boolean condition.
 *
 * - If `true`, the result has a `pass` property;
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
      pass: R
    }
  : [B] extends [false] ? {
      /**
       * This field exist only when this type assertion failed
       *
       * If you expect this assertion to pass, use `.pass`
       */
      fail: R
    }
  : never

export type ExpectType<T> = {
  to: To<T>
}

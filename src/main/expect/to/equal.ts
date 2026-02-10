import type { MutuallyAssignable } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

export type Equal<T> = {
  /**
   * Tests if the current type is mutually assignable with the provided type U.
   *
   * It's like:
   *
   * ```ts ignore
   * [T] extends [U] ? [U] extends [T] ? Yes : No : No
   * ```
   *
   * @template U The type to compare with
   *
   * @example
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * expect<{ a: 1; b: 2 }>().to.equal<{ a: 1 } & { b: 2 }>().pass
   * expect<1>().to.equal<1 | 2>().fail
   * ```
   */
  <U>(): TypeAssertionResult<T, MutuallyAssignable<T, U>>
  <U>(_: U): TypeAssertionResult<T, MutuallyAssignable<T, U>>
}

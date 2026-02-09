import type { MutuallyAssignable } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../expect.ts'

export type ToEqual<T> = {
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
   * expect<{ a: 1; b: 2 }>().toEqual<{ a: 1 } & { b: 2 }>().pass
   * expect<1>().toEqual<1 | 2>().fail
   * ```
   */
  toEqual<U>(): TypeAssertionResult<MutuallyAssignable<T, U>>
  toEqual<U>(_: U): TypeAssertionResult<MutuallyAssignable<T, U>>
}

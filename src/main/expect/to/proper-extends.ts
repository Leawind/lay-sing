import type { ProperExtend } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

export type ProperExtends<T> = {
  /**
   * Tests if the current type T properly extends the provided type U (extends but is not the same).
   *
   * @template U The type to check proper extension against
   *
   * @example
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * expect<2>().to.properExtend<number>().pass
   * expect<'a' | 'b'>().to.properExtend<string>().pass
   * expect<number>().to.properExtend<number>().fail
   * ```
   */
  <U>(): TypeAssertionResult<ProperExtend<T, U>>
  <U>(_: U): TypeAssertionResult<ProperExtend<T, U>>
}

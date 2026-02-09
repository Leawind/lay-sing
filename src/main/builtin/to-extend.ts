import type { Extends, If, ProperExtend } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../expect.ts'

export type ToExtend<T> =
  & {
    /**
     * Tests if the current type T extends the provided type U.
     *
     * @template U The type to check extension against
     *
     * @example
     * ```ts
     * import { expect } from '@leawind/lay-sing'
     *
     * expect<3.14>().toExtend<number>().success
     * expect<2>().toExtend<string>().fail
     * expect<'hello'>().toExtend<string>().success
     * ```
     */
    toExtend<U>(): TypeAssertionResult<Extends<T, U>>
    toExtend<U>(_: U): TypeAssertionResult<Extends<T, U>>

    /**
     * Tests if the current type T properly extends the provided type U (extends but is not the same).
     *
     * @template U The type to check proper extension against
     *
     * @example
     * ```ts
     * import { expect } from '@leawind/lay-sing'
     *
     * expect<2>().toProperExtend<number>().success
     * expect<'a' | 'b'>().toProperExtend<string>().success
     * expect<number>().toProperExtend<number>().fail
     * ```
     */
    toProperExtend<U>(): TypeAssertionResult<ProperExtend<T, U>>
    toProperExtend<U>(_: U): TypeAssertionResult<ProperExtend<T, U>>
  }
  & If<Extends<T, number>, { toExtendNumber: void }, {}>
  & If<Extends<T, bigint>, { toExtendBigInt: void }, {}>
  & If<Extends<T, string>, { toExtendString: void }, {}>
  & If<Extends<T, boolean>, { toExtendBoolean: void }, {}>
  & If<Extends<T, symbol>, { toExtendSymbol: void }, {}>

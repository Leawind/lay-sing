import type { Extends, If, Xor } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

export type Extend<T, Inv extends boolean = false> =
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
     * expect<3.14>().to.extend<number>().pass
     * expect<2>().to.extend<string>().fail
     * expect<'hello'>().to.extend<string>().pass
     * ```
     */
    <U>(): TypeAssertionResult<T, Xor<Inv, Extends<T, U>>>
    <U>(_: U): TypeAssertionResult<T, Xor<Inv, Extends<T, U>>>
  }
  & If<Xor<Inv, Extends<T, number>>, { number: void }, {}>
  & If<Xor<Inv, Extends<T, bigint>>, { bigint: void }, {}>
  & If<Xor<Inv, Extends<T, string>>, { string: void }, {}>
  & If<Xor<Inv, Extends<T, boolean>>, { boolean: void }, {}>
  & If<Xor<Inv, Extends<T, symbol>>, { symbol: void }, {}>

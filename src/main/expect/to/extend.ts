import type { Extends, If, Xor } from '@leawind/lay-sing/utils'
import type { ExpectType, TypeAssertionResult } from '../index.ts'

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
  & Special<T, Inv, number, 'number'>
  & Special<T, Inv, bigint, 'bigint'>
  & Special<T, Inv, string, 'string'>
  & Special<T, Inv, boolean, 'boolean'>
  & Special<T, Inv, symbol, 'symbol'>

type Special<
  T,
  Inv extends boolean,
  U,
  Key extends PropertyKey,
> = If<Xor<Inv, Extends<T, U>>, { [_ in Key]: ExpectType<T> }, {}>

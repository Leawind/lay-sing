import type { Extends, If } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

export type Extend<T> =
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
    <U>(): TypeAssertionResult<Extends<T, U>>
    <U>(_: U): TypeAssertionResult<Extends<T, U>>
  }
  & If<Extends<T, number>, { number: void }, {}>
  & If<Extends<T, bigint>, { bigint: void }, {}>
  & If<Extends<T, string>, { string: void }, {}>
  & If<Extends<T, boolean>, { boolean: void }, {}>
  & If<Extends<T, symbol>, { symbol: void }, {}>

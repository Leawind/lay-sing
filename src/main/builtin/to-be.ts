import type { Exact, If } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../expect.ts'

export type ToBe<T> =
  & {
    /**
     * Tests if the current type is exactly the same as the provided type U.
     *
     * @template U The type to compare with
     *
     * @example
     * ```ts
     * import { expect } from '@leawind/lay-sing'
     *
     * expect<any>().toBe<any>().success
     * expect<never>().toBe<never>().success
     * expect<false>().toBe<true>().fail
     * ```
     */
    toBe<U>(): TypeAssertionResult<Exact<T, U>>
    toBe<U>(_: U): TypeAssertionResult<Exact<T, U>>
  }
  & If<Exact<T, any>, { toBeAny: void }, {}>
  & If<Exact<T, never>, { toBeNever: void }, {}>
  & If<Exact<T, unknown>, { toBeUnknown: void }, {}>
  & If<Exact<T, void>, { toBeVoid: void }, {}>
  & If<Exact<T, null>, { toBeNull: void }, {}>
  & If<Exact<T, undefined>, { toBeUndefined: void }, {}>
  & If<Exact<T, true>, { toBeTrue: void }, {}>
  & If<Exact<T, false>, { toBeFalse: void }, {}>

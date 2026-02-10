import type { Exact, If, Xor } from '@leawind/lay-sing/utils'
import type { ExpectType, TypeAssertionResult } from '../index.ts'

export type Be<T, Inv extends boolean = false> =
  & {
    <U>(): TypeAssertionResult<T, Xor<Inv, Exact<T, U>>>
    <U>(_: U): TypeAssertionResult<T, Xor<Inv, Exact<T, U>>>
  }
  & Special<T, Inv, any, 'any'>
  & Special<T, Inv, never, 'never'>
  & Special<T, Inv, unknown, 'unknown'>
  & Special<T, Inv, void, 'void'>
  & Special<T, Inv, null, 'null'>
  & Special<T, Inv, undefined, 'undefined'>
  & Special<T, Inv, true, 'true'>
  & Special<T, Inv, false, 'false'>

type Special<
  T,
  Inv extends boolean,
  U,
  Key extends PropertyKey,
> = If<Xor<Inv, Exact<T, U>>, { [_ in Key]: ExpectType<T> }, {}>

import type { Exact, If, Xor } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

export type Be<T, Inv extends boolean = false> =
  & {
    <U>(): TypeAssertionResult<T, Xor<Inv, Exact<T, U>>>
    <U>(_: U): TypeAssertionResult<T, Xor<Inv, Exact<T, U>>>
  }
  & If<Xor<Inv, Exact<T, any>>, { any: void }, {}>
  & If<Xor<Inv, Exact<T, never>>, { never: void }, {}>
  & If<Xor<Inv, Exact<T, unknown>>, { unknown: void }, {}>
  & If<Xor<Inv, Exact<T, void>>, { void: void }, {}>
  & If<Xor<Inv, Exact<T, null>>, { null: void }, {}>
  & If<Xor<Inv, Exact<T, undefined>>, { undefined: void }, {}>
  & If<Xor<Inv, Exact<T, true>>, { true: void }, {}>
  & If<Xor<Inv, Exact<T, false>>, { false: void }, {}>

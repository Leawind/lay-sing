import type { Exact, If } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

export type Be<T> =
  & {
    <U>(): TypeAssertionResult<Exact<T, U>>
    <U>(_: U): TypeAssertionResult<Exact<T, U>>
  }
  & If<Exact<T, any>, { any: void }, {}>
  & If<Exact<T, never>, { never: void }, {}>
  & If<Exact<T, unknown>, { unknown: void }, {}>
  & If<Exact<T, void>, { void: void }, {}>
  & If<Exact<T, null>, { null: void }, {}>
  & If<Exact<T, undefined>, { undefined: void }, {}>
  & If<Exact<T, true>, { true: void }, {}>
  & If<Exact<T, false>, { false: void }, {}>

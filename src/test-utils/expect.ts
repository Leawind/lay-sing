import type { Extends, ProperExtend, Same } from '../core/boolean.ts'
import type { Case, Switch, SwitchExtends } from '../core/branch.ts'
import type { EmptyProps, Result } from './utils.ts'

/**
 * - `T`: Type
 * - `H`: History
 * - `K`: Key
 * - `C`: Condition
 */
export type Attr<T, H extends PropertyKey, K extends PropertyKey> = {
  [key in Exclude<K, H>]: ExpectType<T, H | key>
}

export type ExpectType<T, History extends PropertyKey = never> =
  & Switch<T, [
    // deno-lint-ignore no-explicit-any
    Case<any, Attr<T, History | 'toBe', 'toBeAny'>>,
    Case<never, Attr<T, History | 'toBe', 'toBeNever'>>,
    Case<unknown, Attr<T, History | 'toBe', 'toBeUnknown'>>,
    Case<void, Attr<T, History | 'toBe', 'toBeVoid'>>,
    Case<true, Attr<T, History | 'toBe', 'toBeTrue'>>,
    Case<false, Attr<T, History | 'toBe', 'toBeFalse'>>,
  ], EmptyProps>
  & SwitchExtends<T, [
    Case<number, Attr<T, History, 'toExtendNumber'>>,
    Case<string, Attr<T, History, 'toExtendString'>>,
    Case<boolean, Attr<T, History, 'toExtendBoolean'>>,
  ], EmptyProps>
  & Omit<{
    toBe<U>(): Result<Same<T, U>, ExpectType<T, History | 'toBe'>>
    toExtend<U>(): Result<Extends<T, U>>
    toProperExtend<U>(): Result<ProperExtend<T, U>>
    toHaveProperty<K extends PropertyKey>(): Result<Extends<K, keyof T>>
  }, History>

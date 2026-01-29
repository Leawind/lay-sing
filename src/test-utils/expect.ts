import type { Extends, ProperExtend, Same } from '../core/boolean.ts'
import type { Case, Switch, SwitchExtends } from '../core/branch.ts'
import type { NoProps, Result } from './utils.ts'

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
    Case<any, Attr<T, History, 'toBeAny'>>,
    Case<never, Attr<T, History, 'toBeNever'>>,
    Case<unknown, Attr<T, History, 'toBeUnknown'>>,
    Case<void, Attr<T, History, 'toBeVoid'>>,
    Case<true, Attr<T, History, 'toBeTrue'>>,
    Case<false, Attr<T, History, 'toBeFalse'>>,
  ], NoProps>
  & SwitchExtends<T, [
    Case<number, Attr<T, History, 'toExtendNumber'>>,
    Case<string, Attr<T, History, 'toExtendString'>>,
    Case<boolean, Attr<T, History, 'toExtendBoolean'>>,
  ], NoProps>
  & {
    toBe<U>(): Result<Same<T, U>>
    toExtend<U>(): Result<Extends<T, U>>
    toProperExtend<U>(): Result<ProperExtend<T, U>>
  }

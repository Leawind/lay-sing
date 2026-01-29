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

export type ExpectType<T, H extends PropertyKey = never> =
  & Switch<T, [
    // deno-lint-ignore no-explicit-any
    Case<any, Attr<T, H | 'toBe', 'toBeAny'>>,
    Case<never, Attr<T, H | 'toBe', 'toBeNever'>>,
    Case<unknown, Attr<T, H | 'toBe', 'toBeUnknown'>>,
    Case<void, Attr<T, H | 'toBe', 'toBeVoid'>>,
    Case<true, Attr<T, H | 'toBe', 'toBeTrue'>>,
    Case<false, Attr<T, H | 'toBe', 'toBeFalse'>>,
  ], EmptyProps>
  & SwitchExtends<T, [
    Case<number, Attr<T, H, 'toExtendNumber'>>,
    Case<string, Attr<T, H, 'toExtendString'>>,
    Case<boolean, Attr<T, H, 'toExtendBoolean'>>,
  ], EmptyProps>
  & Omit<{
    toBe<U>(): Result<Same<T, U>, ExpectType<T, H | 'toBe'>>
    toExtend<U>(): Result<Extends<T, U>>
    toProperExtend<U>(): Result<ProperExtend<T, U>>
    toHaveProperty<K extends PropertyKey>(): Result<Extends<K, keyof T>>
  }, H>

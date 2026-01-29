import type { Extends, ProperExtend, Same } from '../core/boolean.ts'
import type { If } from '../core/branch.ts'
import type { SafePick } from '../core/pure.ts'
import type { Result } from './utils.ts'

export type ExpectType<T, H extends PropertyKey = never> = Omit<
  (
    & {
      /** toBe */
      toBe<U>(): Result<Same<T, U>, ExpectType<T, H | 'toBe'>>
      toExtend<U>(): Result<Extends<T, U>>
      toProperExtend<U>(): Result<ProperExtend<T, U>>
      toHaveProperty<K extends PropertyKey>(): Result<Extends<K, keyof T>>
    }
    & SafePick<
      {
        /** toExtendNumber */
        toExtendNumber: ExpectType<T, H | 'toExtendNumber' | 'toExtend'>
        toExtendString: ExpectType<T, H | 'toExtendString' | 'toExtend'>
        toExtendBoolean: ExpectType<T, H | 'toExtendBoolean' | 'toExtend'>
      },
      | If<Extends<T, number>, 'toExtendNumber'>
      | If<Extends<T, string>, 'toExtendString'>
      | If<Extends<T, boolean>, 'toExtendBoolean'>
    >
    & SafePick<
      {
        /** toBeAny */
        toBeAny: ExpectType<T, H | 'toBeAny' | 'toBe'>
        toBeNever: ExpectType<T, H | 'toBeNever' | 'toBe'>
        toBeUnknown: ExpectType<T, H | 'toBeUnknown' | 'toBe'>
        toBeVoid: ExpectType<T, H | 'toBeVoid' | 'toBe'>

        toBeTrue: ExpectType<T, H | 'toBeTrue' | 'toBe' | 'toExtendBoolean'>
        toBeFalse: ExpectType<T, H | 'toBeFalse' | 'toBe' | 'toExtendBoolean'>
      },
      // deno-lint-ignore no-explicit-any
      | If<Same<T, any>, 'toBeAny'>
      | If<Same<T, never>, 'toBeNever'>
      | If<Same<T, unknown>, 'toBeUnknown'>
      | If<Same<T, void>, 'toBeVoid'>
      | If<Same<T, true>, 'toBeTrue'>
      | If<Same<T, false>, 'toBeFalse'>
    >
  ),
  H
>

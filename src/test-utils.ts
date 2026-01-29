import type { Diff, Disjoint, Extends, MutuallyAssignable, Overlap, ProperExtend, Same } from './core/boolean.ts'
import type { If } from './core/branch.ts'
import type { SafePick } from './core/pure.ts'

type Result<B extends true | false, R = void> = B extends true ? {
    /**
     * ## Expect to succeed without type error
     */
    success: R
  }
  : {
    /**
     * ## Expect to fail with type error
     */
    fail: R
  }

// deno-lint-ignore no-explicit-any
const NOOP: any = new Proxy(
  function () {
    return NOOP
  },
  {
    get(_, prop) {
      switch (prop) {
        case 'then':
          return undefined
        case 'valueOf':
        case 'toString':
        case Symbol.toPrimitive:
          return () => '[NOOP]'
        default:
          return NOOP
      }
    },
  },
)

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

/**
 * ## Expect type
 */
export function expect<T>(): ExpectType<T> {
  return NOOP
}

export type CompareTypes<T, U, H extends PropertyKey = never> = SafePick<
  Omit<{
    same: CompareTypes<T, U, H | 'same'>
    different: CompareTypes<T, U, H | 'different'>
    overlap: CompareTypes<T, U, H | 'overlap'>
    disjoint: CompareTypes<T, U, H | 'disjoint'>
    mutuallyAssignable: CompareTypes<T, U, H | 'mutuallyAssignable'>
  }, H>,
  | If<Same<T, U>, 'same'>
  | If<Diff<T, U>, 'different'>
  | If<Overlap<T, U>, 'overlap'>
  | If<Disjoint<T, U>, 'disjoint'>
  | If<MutuallyAssignable<T, U>, 'mutuallyAssignable'>
>

/**
 * ## Compare types
 */
export function compare<T, U>(): CompareTypes<T, U> {
  return NOOP
}

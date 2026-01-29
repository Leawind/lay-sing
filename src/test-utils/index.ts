import type { CompareTypes } from './compare.ts'
import type { ExpectType } from './expect.ts'
import { NOOP } from './utils.ts'

/**
 * ## Expect type
 */
export function expect<T>(): ExpectType<T> {
  return NOOP
}

/**
 * ## Compare types
 */
export function compare<T, U>(): CompareTypes<T, U> {
  return NOOP
}

import type { CompareTypes } from './compare.ts'
import type { ExpectType } from './expect.ts'
import { NOOP } from './utils.ts'

/**
 * ## Expect type
 */
export function expect<T>(): ExpectType<T>
/**
 * ## Compare types
 */
export function expect<T, U>(): CompareTypes<T, U>
export function expect() {
  return NOOP
}

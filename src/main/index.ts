/**
 * [Full API documentation is available on JSR](https://jsr.io/@leawind/lay-sing/doc)
 *
 * @module
 */

import type { ExpectType } from './expect.ts'
import { NOOP } from './noop.ts'

export type { ExpectType } from './expect.ts'
export { NOOP } from './noop.ts'

/**
 * Creates an instance of ExpectType to perform type-level assertions on the given type.
 * This function enables testing various type relationships at compile time.
 * NOTE: This function does nothing at runtime and is purely for type-level testing.
 *
 * @template T The type to be tested
 *
 * @returns An ExpectType instance with methods to test type relationships
 *
 * @example
 * ```ts
 * // Test exact type equality
 * expect<number>().toBe<number>().success
 * expect<number>().toBe<string>().fail
 * // Test if one type extends another
 * expect<3.14>().toExtend<number>().success
 * expect<2>().toExtend<string>().fail
 * ```
 */
export function expect<T>(): ExpectType<T>
export function expect<T>(_: T): ExpectType<T>
export function expect<T>(): ExpectType<T> {
  return NOOP
}

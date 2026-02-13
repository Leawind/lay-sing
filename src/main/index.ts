/**
 * [Full API documentation is available on JSR](https://jsr.io/@leawind/lay-sing/doc)
 *
 * @module
 */

import type { ExpectType } from './expect/index.ts'
import { NOOP } from './noop.ts'

export type { ExpectType } from './expect/index.ts'
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
 * expect<number>().to.be<number>().pass
 * expect<number>().to.be<string>().fail
 * // Test if one type extends another
 * expect<3.14>().to.extend<number>().pass
 * expect<2>().to.extend<string>().fail
 * ```
 */
export const expect: {
  <const T>(): ExpectType<T>
  <const T>(_: T): ExpectType<T>
} = NOOP

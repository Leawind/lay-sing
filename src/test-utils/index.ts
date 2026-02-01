/**
 * [Full API documentation is available on JSR](https://jsr.io/@leawind/lay-sing/doc)
 *
 * @module
 */

import type { CompareTypes } from './compare.ts'
import type { ExpectType } from './expect.ts'

export type { CompareTypes } from './compare.ts'
export type { ExpectType } from './expect.ts'

/**
 * A universal no-op placeholder implemented via `Proxy`.
 *
 * `NOOP` can be accessed, called, or chained indefinitely without throwing.
 * Every operation returns itself, making it safe to use as a dummy fallback
 * for APIs, optional hooks, or unimplemented interfaces.
 *
 * ### Special behaviors
 *
 * - Callable: invoking `NOOP()` returns `NOOP`
 * - Property access: `NOOP.anything` returns `NOOP`
 * - Promise-safe: `NOOP.then` is `undefined`, so it is not treated as a Promise
 * - Primitive coercion (`toString`, `valueOf`, `Symbol.toPrimitive`) yields
 *   a stable string representation: `"[NOOP]"`
 *
 * This is useful in scenarios where a value is required syntactically but
 * should perform no action and never fail at runtime.
 *
 * @example
 * ```ts
 * NOOP.foo.bar().baz.qux; // safe, returns NOOP
 * String(NOOP); // "[NOOP]"
 * await NOOP; // does not await (not thenable)
 * ```
 */
// deno-lint-ignore no-explicit-any
export const NOOP: any = new Proxy(
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
    set: () => true,
    getOwnPropertyDescriptor: () => ({
      configurable: true,
      value: NOOP,
    }),
    getPrototypeOf: () => null,
    has: () => true,
    ownKeys: () => ['prototype'],
  },
)

/**
 * Creates an instance of CompareTypes to perform type-level comparisons between two types.
 * This function enables testing various relationships between types at compile time.
 * NOTE: This function does nothing at runtime and is purely for type-level testing.
 *
 * @template T First type to compare
 * @template U Second type to compare
 *
 * @returns A CompareTypes instance with methods to test relationships between T and U
 *
 * @example
 * ```ts
 * // Compare two identical types
 * compare<number, number>().same // Results in an available property
 * // Compare two different but overlapping types
 * compare<4, number>().overlap.different // Results in available properties
 * ```
 */
export function compare<T, U>(): CompareTypes<T, U>
export function compare<T, U>(t: T, u: U): CompareTypes<T, U>
export function compare<T, U>(): CompareTypes<T, U> {
  return NOOP
}

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

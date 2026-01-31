// deno-lint-ignore-file no-explicit-any
import type {
  Diff,
  Disjoint,
  Extends,
  If,
  MutuallyAssignable,
  Overlap,
  ProperExtend,
  SafePick,
  Same,
} from './main/index.ts'

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
 * Represents the result of a type assertion based on a boolean condition.
 *
 * - If `true`, the result has a `success` property;
 * - If `false`, the result has a `fail` property;
 * - Otherwise, the result is `never`
 *
 * @template B The boolean condition result (true or false)
 * @template R The type of the result value (default is void)
 */
export type TypeAssertionResult<B extends boolean, R = void> = Same<B, never> extends true ? never
  : [boolean] extends [B] ? never
  : [B] extends [true] ? {
      /**
       * This field exist only when this type assertion succeed
       *
       * If you expect this assertion to fail, use `.fail`
       */
      success: R
    }
  : [B] extends [false] ? {
      /**
       * This field exist only when this type assertion failed
       *
       * If you expect this assertion to success, use `.success`
       */
      fail: R
    }
  : never

type ExpectTypeMethods<T, H extends PropertyKey = never> = {
  /**
   * Tests if the current type is exactly the same as the provided type U.
   *
   * @template U The type to compare with
   *
   * @example
   * ```ts
   * expect<any>().toBe<any>().success
   * expect<never>().toBe<never>().success
   * expect<false>().toBe<true>().fail
   * ```
   */
  toBe<U>(): TypeAssertionResult<Same<T, U>>

  /**
   * Tests if the current type T extends the provided type U.
   *
   * @template U The type to check extension against
   *
   * @example
   * ```ts
   * expect<3.14>().toExtend<number>().success
   * expect<2>().toExtend<string>().fail
   * expect<'hello'>().toExtend<string>().success
   * ```
   */
  toExtend<U>(): TypeAssertionResult<Extends<T, U>>

  /**
   * Tests if the current type T properly extends the provided type U (extends but is not the same).
   *
   * @template U The type to check proper extension against
   *
   * @example
   * ```ts
   * expect<2>().toProperExtend<number>().success
   * expect<'a' | 'b'>().toProperExtend<string>().success
   * expect<number>().toProperExtend<number>().fail
   * ```
   */
  toProperExtend<U>(): TypeAssertionResult<ProperExtend<T, U>>

  /**
   * Tests if the current type T has a property with key K.
   *
   * @template K The property key to check for
   *
   * @example
   * ```ts
   * type WithProp = { prop: string; another: number }
   * expect<WithProp>().toHaveKey<'prop'>().success
   * expect<WithProp>().toHaveKey<'another'>().success
   * expect<WithProp>().toHaveKey<'missing'>().fail
   * ```
   */
  toHaveKey<K extends PropertyKey>(): TypeAssertionResult<Extends<K, keyof T>>
}

/**
 * Type-level testing utility that allows checking various relationships between types.
 * Provides methods to test type equality, extension, properties, and more.
 *
 * @template T The type being tested
 * @template H Hidden property keys that are already used (internal tracking)
 *
 * @example
 * ```ts
 * // Test if two types are identical
 * expect<number>().toBe<number>().success
 * expect<number>().toBe<string>().fail
 * // Test if one type extends another
 * expect<2>().toExtend<number>().success
 * expect<2>().toExtend<string>().fail
 * // Test if type has a specific property
 * expect<{name: string}>().toHaveKey<'name'>().success
 * ```
 */
export type ExpectType<T, H extends PropertyKey = never> = Omit<
  (
    & ExpectTypeMethods<T, H>
    & {
      T: T
      inspect: { [K in keyof T]: T[K] }
    }
    & SafePick<
      {
        /**
         * Tests if the current type extends the Number primitive type.
         * Available only if the current type extends number.
         *
         * @example
         * ```ts
         * expect<3.14>().toExtendNumber // Available and would succeed
         * ```
         */
        toExtendNumber: ExpectType<T, H | 'toExtendNumber' | 'toExtend'>

        /**
         * Tests if the current type extends the String primitive type.
         * Available only if the current type extends string.
         *
         * @example
         * ```ts
         * expect<'hello'>().toExtendString // Available and would succeed
         * ```
         */
        toExtendString: ExpectType<T, H | 'toExtendString' | 'toExtend'>

        /**
         * Tests if the current type extends the Boolean primitive type.
         * Available only if the current type extends boolean.
         *
         * @example
         * ```ts
         * expect<true>().toExtendBoolean // Available and would succeed
         * ```
         */
        toExtendBoolean: ExpectType<T, H | 'toExtendBoolean' | 'toExtend'>
      },
      | If<Extends<T, number>, 'toExtendNumber'>
      | If<Extends<T, string>, 'toExtendString'>
      | If<Extends<T, boolean>, 'toExtendBoolean'>
    >
    & SafePick<
      {
        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = any`
         *
         * ```ts
         * expect<any>().toBeAny
         * expect<any>().toBe<any>().success
         * ```
         */
        toBeAny: ExpectType<T, H | 'toBeAny' | 'toBe'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = never`
         *
         * ```ts
         * expect<never>().toBeNever
         * expect<never>().toBe<never>().success
         * ```
         */
        toBeNever: ExpectType<T, H | 'toBeNever' | 'toBe'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = unknown`
         *
         * ```ts
         * expect<unknown>().toBeUnknown
         * expect<unknown>().toBe<unknown>().success
         * ```
         */
        toBeUnknown: ExpectType<T, H | 'toBeUnknown' | 'toBe'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = void`
         *
         * ```ts
         * expect<void>().toBeVoid
         * expect<void>().toBe<void>().success
         * ```
         */
        toBeVoid: ExpectType<T, H | 'toBeVoid' | 'toBe'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = null`
         *
         * ```ts
         * expect<null>().toBeNull
         * expect<null>().toBe<null>().success
         * ```
         */
        toBeNull: ExpectType<T, H | 'toBeNull' | 'toBe'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = undefined`
         *
         * ```ts
         * expect<undefined>().toBeUndefined
         * expect<undefined>().toBe<undefined>().success
         * ```
         */
        toBeUndefined: ExpectType<T, H | 'toBeUndefined' | 'toBe'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = true`
         *
         * ```ts
         * expect<true>().toBeTrue
         * expect<true>().toBe<true>().success
         * ```
         */
        toBeTrue: ExpectType<T, H | 'toBeTrue' | 'toBe' | 'toExtendBoolean'>

        /**
         * Alias for {@link ExpectTypeMethods.toBe} where `U = false`
         *
         * ```ts
         * expect<false>().toBeFalse
         * expect<false>().toBe<false>().success
         * ```
         */
        toBeFalse: ExpectType<T, H | 'toBeFalse' | 'toBe' | 'toExtendBoolean'>
      },
      | If<Same<T, any>, 'toBeAny'>
      | If<Same<T, never>, 'toBeNever'>
      | If<Same<T, unknown>, 'toBeUnknown'>
      | If<Same<T, void>, 'toBeVoid'>
      | If<Same<T, null>, 'toBeNull'>
      | If<Same<T, undefined>, 'toBeUndefined'>
      | If<Same<T, true>, 'toBeTrue'>
      | If<Same<T, false>, 'toBeFalse'>
    >
  ),
  H
>

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

/**
 * Type-level utility that compares two types and provides methods to test their relationship.
 * Offers options to check if types are same, different, overlapping, disjoint, or mutually assignable.
 *
 * @template T First type to compare
 * @template U Second type to compare
 * @template H Hidden property keys that are already used (internal tracking)
 *
 * @example
 * ```ts
 * // Check if two types are the same
 * compare<number, number>().same // Available
 * // Check if two types are different
 * compare<number, string>().different // Available
 * // Check if two types overlap
 * compare<4, number>().overlap.different // Available
 * ```
 */
export type CompareTypes<T, U, H extends PropertyKey = never> = Omit<
  SafePick<
    {
      /**
       * Available when types T and U are exactly the same.
       *
       * @example
       * ```ts
       * compare<3, 3>().same // Available
       * compare<boolean, boolean>().same // Available
       * ```
       */
      same: CompareTypes<T, U, H | 'same'>

      /**
       * Available when types T and U are different.
       *
       * @example
       * ```ts
       * compare<4, 'abc'>().different // Available
       * compare<number, 4>().different // Available
       * ```
       */
      different: CompareTypes<T, U, H | 'different'>

      /**
       * Available when types T and U have some overlap.
       *
       * @example
       * ```ts
       * compare<4, number>().overlap // Available since 4 overlaps with number
       * ```
       */
      overlap: CompareTypes<T, U, H | 'overlap'>

      /**
       * Available when types T and U have no overlap (are disjoint).
       *
       * @example
       * ```ts
       * compare<4, 'abc'>().different.disjoint // Available since 4 and 'abc' are disjoint
       * ```
       */
      disjoint: CompareTypes<T, U, H | 'disjoint'>

      /**
       * Available when types T and U are mutually assignable (each type can be assigned to the other).
       *
       * @example
       * ```ts
       * compare<1 | 2, 1 | 2>().mutuallyAssignable // Available since identical union types are mutually assignable
       * ```
       */
      mutuallyAssignable: CompareTypes<T, U, H | 'mutuallyAssignable'>
    },
    | If<Same<T, U>, 'same'>
    | If<Diff<T, U>, 'different'>
    | If<Overlap<T, U>, 'overlap'>
    | If<Disjoint<T, U>, 'disjoint'>
    | If<MutuallyAssignable<T, U>, 'mutuallyAssignable'>
  >,
  H
>

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

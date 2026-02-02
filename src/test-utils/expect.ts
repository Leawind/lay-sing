import type { Exact, Extends, If, IfTupleIncludes, MutuallyAssignable, ProperExtend, SafePick } from '@leawind/lay-sing'

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
export type TypeAssertionResult<B extends boolean, R = void> = Exact<B, never> extends true ? never
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
  toBe<U>(): TypeAssertionResult<Exact<T, U>, ExpectType<T, H>>

  /**
   * Tests if the current type is mutually assignable with the provided type U.
   *
   * It's like:
   *
   * ```ts
   * [T] extends [U] ? [U] extends [T] ? Yes : No : No
   * ```
   *
   * @template U The type to compare with
   *
   * @example
   * ```ts
   * expect<{ a: 1; b: 2 }>().toEqual<{ a: 1 } & { b: 2 }>().success
   * expect<1>().toEqual<1 | 2>().fail
   * ```
   */
  toEqual<U>(): TypeAssertionResult<MutuallyAssignable<T, U>, ExpectType<T, H>>

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
  toExtend<U>(): TypeAssertionResult<Extends<T, U>, ExpectType<T, H>>

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
  toProperExtend<U>(): TypeAssertionResult<ProperExtend<T, U>, ExpectType<T, H>>

  /**
   * Tests if the current type `T` has a property with key `K`.
   *
   * @template K The property key to check for
   *
   * ### Behavior
   *
   * - For single keys: succeeds if the key exists in `T`
   * - For union types: succeeds only if **all** keys in the union exist in `T`
   *
   * ### Examples
   *
   * ```ts
   * type WithProp = { prop: string; another: number; may?: 5 }
   *
   * // Single key checks
   * expect<WithProp>().toHaveKey<'prop'>().success
   * expect<WithProp>().toHaveKey<'missing'>().fail
   *
   * // Union type checks
   * expect<WithProp>().toHaveKey<'prop' | 'another'>().success
   * expect<WithProp>().toHaveKey<'may' | 'unexist'>().fail
   * ```
   */
  toHaveKey<K extends PropertyKey>(): IfTupleIncludes<
    [never, any],
    K,
    never,
    TypeAssertionResult<Extends<K, keyof T>, ExpectType<T, H>>
  >
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
      | If<Exact<T, any>, 'toBeAny'>
      | If<Exact<T, never>, 'toBeNever'>
      | If<Exact<T, unknown>, 'toBeUnknown'>
      | If<Exact<T, void>, 'toBeVoid'>
      | If<Exact<T, null>, 'toBeNull'>
      | If<Exact<T, undefined>, 'toBeUndefined'>
      | If<Exact<T, true>, 'toBeTrue'>
      | If<Exact<T, false>, 'toBeFalse'>
    >
  ),
  H
>

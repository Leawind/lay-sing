import type {
  Exact,
  Extends,
  If,
  IfTupleIncludes,
  MutuallyAssignable,
  ProperExtend,
  SafePick,
} from '@leawind/lay-sing/utils'

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

type ExpectTypeMethods<T> = {
  /**
   * Tests if the current type is exactly the same as the provided type U.
   *
   * @template U The type to compare with
   *
   * @example
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * expect<any>().toBe<any>().success
   * expect<never>().toBe<never>().success
   * expect<false>().toBe<true>().fail
   * ```
   */
  toBe<U>(): TypeAssertionResult<Exact<T, U>>
  toBe<U>(_: U): TypeAssertionResult<Exact<T, U>>

  /**
   * Tests if the current type is mutually assignable with the provided type U.
   *
   * It's like:
   *
   * ```ts ignore
   * [T] extends [U] ? [U] extends [T] ? Yes : No : No
   * ```
   *
   * @template U The type to compare with
   *
   * @example
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * expect<{ a: 1; b: 2 }>().toEqual<{ a: 1 } & { b: 2 }>().success
   * expect<1>().toEqual<1 | 2>().fail
   * ```
   */
  toEqual<U>(): TypeAssertionResult<MutuallyAssignable<T, U>>
  toEqual<U>(_: U): TypeAssertionResult<MutuallyAssignable<T, U>>

  /**
   * Tests if the current type T extends the provided type U.
   *
   * @template U The type to check extension against
   *
   * @example
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * expect<3.14>().toExtend<number>().success
   * expect<2>().toExtend<string>().fail
   * expect<'hello'>().toExtend<string>().success
   * ```
   */
  toExtend<U>(): TypeAssertionResult<Extends<T, U>>
  toExtend<U>(_: U): TypeAssertionResult<Extends<T, U>>

  /**
   * Tests if the current type T properly extends the provided type U (extends but is not the same).
   *
   * @template U The type to check proper extension against
   *
   * @example
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * expect<2>().toProperExtend<number>().success
   * expect<'a' | 'b'>().toProperExtend<string>().success
   * expect<number>().toProperExtend<number>().fail
   * ```
   */
  toProperExtend<U>(): TypeAssertionResult<ProperExtend<T, U>>
  toProperExtend<U>(_: U): TypeAssertionResult<ProperExtend<T, U>>

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
   * import { expect } from '@leawind/lay-sing'
   *
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
    TypeAssertionResult<Extends<K, keyof T>>
  >
  toHaveKey<K extends PropertyKey>(_: K): IfTupleIncludes<
    [never, any],
    K,
    never,
    TypeAssertionResult<Extends<K, keyof T>>
  >
}

type ExpectFunction<T> = Exact<T, any> extends true ? unknown
  : Exact<T, never> extends true ? unknown
  : [T] extends [(...args: infer Args) => infer R] ? {
      argsType(): ExpectType<Args>
      returnType(): ExpectType<R>
    }
  : [T] extends [new (...args: infer Args) => infer R] ? {
      argsType(): ExpectType<Args>
      returnType(): ExpectType<R>
    }
  : unknown

/**
 * Type-level testing utility that allows checking various relationships between types.
 * Provides methods to test type equality, extension, properties, and more.
 *
 * @template T The type being tested
 * @template H Hidden property keys that are already used (internal tracking)
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
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
export type ExpectType<T> =
  & ExpectTypeMethods<T>
  & ExpectFunction<T>
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
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<3.14>().toExtendNumber
       * ```
       */
      toExtendNumber: void

      /**
       * Tests if the current type extends the String primitive type.
       * Available only if the current type extends string.
       *
       * @example
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<'hello'>().toExtendString
       * ```
       */
      toExtendString: void

      /**
       * Tests if the current type extends the Boolean primitive type.
       * Available only if the current type extends boolean.
       *
       * @example
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<true>().toExtendBoolean
       * ```
       */
      toExtendBoolean: void
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
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<any>().toBeAny
       * expect<any>().toBe<any>().success
       * ```
       */
      toBeAny: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = never`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<never>().toBeNever
       * expect<never>().toBe<never>().success
       * ```
       */
      toBeNever: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = unknown`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<unknown>().toBeUnknown
       * expect<unknown>().toBe<unknown>().success
       * ```
       */
      toBeUnknown: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = void`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<void>().toBeVoid
       * expect<void>().toBe<void>().success
       * ```
       */
      toBeVoid: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = null`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<null>().toBeNull
       * expect<null>().toBe<null>().success
       * ```
       */
      toBeNull: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = undefined`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<undefined>().toBeUndefined
       * expect<undefined>().toBe<undefined>().success
       * ```
       */
      toBeUndefined: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = true`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<true>().toBeTrue
       * expect<true>().toBe<true>().success
       * ```
       */
      toBeTrue: void

      /**
       * Alias for {@link ExpectTypeMethods.toBe} where `U = false`
       *
       * ```ts
       * import { expect } from '@leawind/lay-sing'
       *
       * expect<false>().toBeFalse
       * expect<false>().toBe<false>().success
       * ```
       */
      toBeFalse: void
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

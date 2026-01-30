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
 * Represents the result of a type assertion based on a boolean condition.
 * If the condition is true, the result has a `success` property; otherwise, it has a `fail` property.
 *
 * @template B The boolean condition result (true or false)
 * @template R The type of the result value (default is void)
 */
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

/**
 * Type-level testing utility that allows checking various relationships between types.
 * Provides methods to test type equality, extension, properties, and more.
 *
 * @template T The type being tested
 * @template H Hidden property keys that are already used (internal tracking)
 *
 * @example
 * ```typescript
 * // Test if two types are identical
 * expect<number>().toBe<number>().success
 * expect<number>().toBe<string>().fail
 *
 * // Test if one type extends another
 * expect<2>().toExtend<number>().success
 * expect<2>().toExtend<string>().fail
 *
 * // Test if type has a specific property
 * expect<{name: string}>().toHaveProperty<'name'>().success
 * ```
 */
export type ExpectType<T, H extends PropertyKey = never> = Omit<
  (
    & {
      /**
       * Tests if the current type is exactly the same as the provided type U.
       *
       * @template U The type to compare with
       *
       * @example
       * ```typescript
       * expect<any>().toBe<any>().success
       * expect<never>().toBe<never>().success
       * expect<false>().toBe<true>().fail
       * ```
       */
      toBe<U>(): Result<Same<T, U>>

      /**
       * Tests if the current type T extends the provided type U.
       *
       * @template U The type to check extension against
       *
       * @example
       * ```typescript
       * expect<3.14>().toExtend<number>().success
       * expect<2>().toExtend<string>().fail
       * expect<'hello'>().toExtend<string>().success
       * ```
       */
      toExtend<U>(): Result<Extends<T, U>>

      /**
       * Tests if the current type T properly extends the provided type U (extends but is not the same).
       *
       * @template U The type to check proper extension against
       *
       * @example
       * ```typescript
       * expect<2>().toProperExtend<number>().success
       * expect<'a' | 'b'>().toProperExtend<string>().success
       * expect<number>().toProperExtend<number>().fail
       * ```
       */
      toProperExtend<U>(): Result<ProperExtend<T, U>>

      /**
       * Tests if the current type T has a property with key K.
       *
       * @template K The property key to check for
       *
       * @example
       * ```typescript
       * type WithProp = { prop: string; another: number }
       * expect<WithProp>().toHaveProperty<'prop'>().success
       * expect<WithProp>().toHaveProperty<'another'>().success
       * expect<WithProp>().toHaveProperty<'missing'>().fail
       * ```
       */
      toHaveProperty<K extends PropertyKey>(): Result<Extends<K, keyof T>>
    }
    & SafePick<
      {
        /**
         * Tests if the current type extends the Number primitive type.
         * Available only if the current type extends number.
         *
         * @example
         * ```typescript
         * expect<3.14>().toExtendNumber // Available and would succeed
         * ```
         */
        toExtendNumber: ExpectType<T, H | 'toExtendNumber' | 'toExtend'>

        /**
         * Tests if the current type extends the String primitive type.
         * Available only if the current type extends string.
         *
         * @example
         * ```typescript
         * expect<'hello'>().toExtendString // Available and would succeed
         * ```
         */
        toExtendString: ExpectType<T, H | 'toExtendString' | 'toExtend'>

        /**
         * Tests if the current type extends the Boolean primitive type.
         * Available only if the current type extends boolean.
         *
         * @example
         * ```typescript
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
         * Tests if the current type is exactly `any`.
         * Available only if the current type is `any`.
         *
         * @example
         * ```typescript
         * expect<any>().toBeAny // Available and would succeed
         * ```
         */
        toBeAny: ExpectType<T, H | 'toBeAny' | 'toBe'>

        /**
         * Tests if the current type is exactly `never`.
         * Available only if the current type is `never`.
         *
         * @example
         * ```typescript
         * expect<never>().toBeNever // Available and would succeed
         * ```
         */
        toBeNever: ExpectType<T, H | 'toBeNever' | 'toBe'>

        /**
         * Tests if the current type is exactly `unknown`.
         * Available only if the current type is `unknown`.
         *
         * @example
         * ```typescript
         * expect<unknown>().toBeUnknown // Available and would succeed
         * ```
         */
        toBeUnknown: ExpectType<T, H | 'toBeUnknown' | 'toBe'>

        /**
         * Tests if the current type is exactly `void`.
         * Available only if the current type is `void`.
         *
         * @example
         * ```typescript
         * expect<void>().toBeVoid // Available and would succeed
         * ```
         */
        toBeVoid: ExpectType<T, H | 'toBeVoid' | 'toBe'>

        /**
         * Tests if the current type is exactly `true` (boolean literal).
         * Available only if the current type is `true`.
         *
         * @example
         * ```typescript
         * expect<true>().toBeTrue // Available and would succeed
         * ```
         */
        toBeTrue: ExpectType<T, H | 'toBeTrue' | 'toBe' | 'toExtendBoolean'>

        /**
         * Tests if the current type is exactly `false` (boolean literal).
         * Available only if the current type is `false`.
         *
         * @example
         * ```typescript
         * expect<false>().toBeFalse // Available and would succeed
         * ```
         */
        toBeFalse: ExpectType<T, H | 'toBeFalse' | 'toBe' | 'toExtendBoolean'>
      },
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
 * Creates an instance of ExpectType to perform type-level assertions on the given type.
 * This function enables testing various type relationships at compile time.
 * NOTE: This function does nothing at runtime and is purely for type-level testing.
 *
 * @template T The type to be tested
 *
 * @returns An ExpectType instance with methods to test type relationships
 *
 * @example
 * ```typescript
 * // Test exact type equality
 * expect<number>().toBe<number>().success
 * expect<number>().toBe<string>().fail
 *
 * // Test if one type extends another
 * expect<3.14>().toExtend<number>().success
 * expect<2>().toExtend<string>().fail
 * ```
 */
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
 * ```typescript
 * // Check if two types are the same
 * compare<number, number>().same // Available
 *
 * // Check if two types are different
 * compare<number, string>().different // Available
 *
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
       * ```typescript
       * compare<3, 3>().same // Available
       * compare<boolean, boolean>().same // Available
       * ```
       */
      same: CompareTypes<T, U, H | 'same'>

      /**
       * Available when types T and U are different.
       *
       * @example
       * ```typescript
       * compare<4, 'abc'>().different // Available
       * compare<number, 4>().different // Available
       * ```
       */
      different: CompareTypes<T, U, H | 'different'>

      /**
       * Available when types T and U have some overlap.
       *
       * @example
       * ```typescript
       * compare<4, number>().overlap // Available since 4 overlaps with number
       * ```
       */
      overlap: CompareTypes<T, U, H | 'overlap'>

      /**
       * Available when types T and U have no overlap (are disjoint).
       *
       * @example
       * ```typescript
       * compare<4, 'abc'>().different.disjoint // Available since 4 and 'abc' are disjoint
       * ```
       */
      disjoint: CompareTypes<T, U, H | 'disjoint'>

      /**
       * Available when types T and U are mutually assignable (each type can be assigned to the other).
       *
       * @example
       * ```typescript
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
 * ```typescript
 * // Compare two identical types
 * compare<number, number>().same // Results in an available property
 *
 * // Compare two different but overlapping types
 * compare<4, number>().overlap.different // Results in available properties
 * ```
 */
export function compare<T, U>(): CompareTypes<T, U> {
  return NOOP
}

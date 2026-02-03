import type { Disjoint, Exact, If, MutuallyAssignable, NotExact, Overlap, SafePick } from '@leawind/lay-sing'

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
 * import { compare } from '@leawind/lay-sing/test-utils'
 *
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
       * import { compare } from '@leawind/lay-sing/test-utils'
       *
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
       * import { compare } from '@leawind/lay-sing/test-utils'
       *
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
       * import { compare } from '@leawind/lay-sing/test-utils'
       *
       * compare<4, number>().overlap // Available since 4 overlaps with number
       * ```
       */
      overlap: CompareTypes<T, U, H | 'overlap'>

      /**
       * Available when types T and U have no overlap (are disjoint).
       *
       * @example
       * ```ts
       * import { compare } from '@leawind/lay-sing/test-utils'
       *
       * compare<4, 'abc'>().different.disjoint // Available since 4 and 'abc' are disjoint
       * ```
       */
      disjoint: CompareTypes<T, U, H | 'disjoint'>

      /**
       * Available when types T and U are mutually assignable (each type can be assigned to the other).
       *
       * @example
       * ```ts
       * import { compare } from '@leawind/lay-sing/test-utils'
       *
       * compare<1 | 2, 1 | 2>().mutuallyAssignable // Available since identical union types are mutually assignable
       * ```
       */
      mutuallyAssignable: CompareTypes<T, U, H | 'mutuallyAssignable'>
    },
    | If<Exact<T, U>, 'same'>
    | If<NotExact<T, U>, 'different'>
    | If<Overlap<T, U>, 'overlap'>
    | If<Disjoint<T, U>, 'disjoint'>
    | If<MutuallyAssignable<T, U>, 'mutuallyAssignable'>
  >,
  H
>

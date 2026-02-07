/**
 * Checks whether two types have any overlapping members.
 *
 * @template A - The first type to check for overlap
 * @template B - The second type to check for overlap
 * @template Yes - The result if types overlap (defaults to `true`)
 * @template No - The result if types do not overlap (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` share at least one common type
 * - `No`: `A` and `B` are completely disjoint
 *
 * @example
 * ```ts
 * type T1 = Overlap<1 | 2, 2 | 3> // true
 * type T2 = Overlap<string, 'hello'> // true
 * type F1 = Overlap<string, number> // false
 * type F2 = Overlap<1, 'one'> // false
 * ```
 */
export type Overlap<
  A,
  B,
  Yes = true,
  No = false,
> = [A & B] extends [never] ? No : Yes

/**
 * Checks whether two types are disjoint.
 *
 * This is the logical negation of `Overlap<A, B>`.
 *
 * @template A - The first type to check for disjointness
 * @template B - The second type to check for disjointness
 * @template Yes - The result if types are disjoint (defaults to `true`)
 * @template No - The result if types are not disjoint (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` have no overlap
 * - `No`: `A` and `B` share at least one common type
 *
 * @example
 * ```ts
 * type T1 = Disjoint<string, number> // true
 * type T2 = Disjoint<1, 'one'> // true
 * type F1 = Disjoint<1 | 2, 2 | 3> // false
 * type F2 = Disjoint<string, 'hello'> // false
 * ```
 */
export type Disjoint<
  A,
  B,
  Yes = true,
  No = false,
> = [A & B] extends [never] ? Yes : No

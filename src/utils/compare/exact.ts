/**
 * Checks whether two types are exactly the same.
 *
 * **⚠️Important:** parameter `A` and `B` are not distributive. When they are union type, it does not check each member separately.
 *
 * @template A - The first type to compare
 * @template B - The second type to compare
 * @template Yes - The result if types are exactly the same (defaults to `true`)
 * @template No - The result if types are not exactly the same (defaults to `false`)
 *
 * ### Result
 *
 * - `Yes`: `A` and `B` are exactly the same
 * - `No`: Otherwise
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * expect<Exact<string, string>>().to.be.true
 * expect<Exact<never, never>>().to.be.true
 * expect<Exact<any, any>>().to.be.true
 *
 * expect<Exact<{ a: 3 }, { a?: 3 }>>().to.be.false
 * expect<Exact<1 | 2, 1>>().to.be.false
 * expect<Exact<1, number>>().to.be.false
 * expect<Exact<() => void, () => undefined>>().to.be.false
 * ```
 */
export type Exact<
  A,
  B,
  Yes = true,
  No = false,
> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Yes : No

/**
 * Checks whether two types are not exactly the same.
 *
 * This is the logical negation of `Exact<A, B>`.
 *
 * @template A - The first type to compare
 * @template B - The second type to compare
 * @template Yes - The result if types are not exactly the same (defaults to `true`)
 * @template No - The result if types are exactly the same (defaults to `false`)
 *
 * @example
 * ```ts
 * type T1 = NotExact<number, string> // true
 * type T2 = NotExact<1, number> // true
 * type F1 = NotExact<number, number> // false
 * type F2 = NotExact<1, 1> // false
 * ```
 */
export type NotExact<
  A,
  B,
  Yes = true,
  No = false,
> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? No : Yes

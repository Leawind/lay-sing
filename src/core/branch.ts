import type { Same } from './boolean.ts'
import type { AssertExtends } from './pure.ts'

/**
 * Use with {@link Switch}
 */
export type Case<T, Return> = [T, Return]
export type DefaultCase<T> = T
/**
 * ### Example
 *
 * ```ts
 * const _: boolean = any as Switch<4, [
 *   Case<3, string>,
 *   Case<4, boolean>,
 *   Case<5, number>,
 * ], `Error: fail to match any condition`>;
 * ```
 */
export type Switch<T, Cases extends readonly [unknown, unknown][], Default = never> = Cases extends [
  infer First,
  ...infer Rest,
] ? First extends [infer C, infer R] ? Same<T, C> extends true ? R
    : Switch<T, Rest extends readonly [unknown, unknown][] ? Rest : never, Default>
  : never
  : Default

export type SwitchExtends<T, Cases extends readonly [unknown, unknown][], Default = never> = Cases extends [
  infer First,
  ...infer Rest,
] ? First extends [infer C, infer R] ? [T] extends [C] ? R
    : SwitchExtends<T, Rest extends readonly [unknown, unknown][] ? Rest : never, Default>
  : never
  : Default

export type Branch<Branches extends readonly [unknown, unknown][]> = Branches extends [infer First, ...infer Rest] ? (
    First extends [infer C, infer R]
      ? ([C] extends [true] ? R : Branch<AssertExtends<Rest, readonly [unknown, unknown][]>>)
      : never
  )
  : never

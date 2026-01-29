import type { Diff, Disjoint, MutuallyAssignable, Overlap, Same } from '../core/boolean.ts'
import type { EmptyProps } from './utils.ts'

export type Attr<T, U, H extends PropertyKey, K extends PropertyKey, C extends boolean = true> = C extends true
  ? { [key in Exclude<K, H>]: CompareTypes<T, U, H | key> }
  : EmptyProps
/**
 * - `T`: Type 1
 * - `U`: Type 2
 * - `H`: History
 * - `K`: Key
 * - `C`: Condition
 */
export type CompareTypes<T, U, History extends PropertyKey = never> =
  & Attr<T, U, History, 'same', Same<T, U>>
  & Attr<T, U, History, 'different', Diff<T, U>>
  & Attr<T, U, History, 'overlap', Overlap<T, U>>
  & Attr<T, U, History, 'disjoint', Disjoint<T, U>>
  & Attr<T, U, History, 'mutuallyAssignable', MutuallyAssignable<T, U>>

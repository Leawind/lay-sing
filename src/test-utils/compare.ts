import type { Diff, Disjoint, MutuallyAssignable, Overlap, Same } from '../core/boolean.ts'
import type { If } from '../core/branch.ts'
import type { SafePick } from '../core/pure.ts'

export type CompareTypes<T, U, H extends PropertyKey = never> = SafePick<
  Omit<{
    same: CompareTypes<T, U, H | 'same'>
    different: CompareTypes<T, U, H | 'different'>
    overlap: CompareTypes<T, U, H | 'overlap'>
    disjoint: CompareTypes<T, U, H | 'disjoint'>
    mutuallyAssignable: CompareTypes<T, U, H | 'mutuallyAssignable'>
  }, H>,
  | If<Same<T, U>, 'same'>
  | If<Diff<T, U>, 'different'>
  | If<Overlap<T, U>, 'overlap'>
  | If<Disjoint<T, U>, 'disjoint'>
  | If<MutuallyAssignable<T, U>, 'mutuallyAssignable'>
>

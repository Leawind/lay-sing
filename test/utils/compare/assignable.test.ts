import { expect } from '@leawind/lay-sing'
import type { MutuallyAssignable } from '@leawind/lay-sing/utils'

{
  expect<MutuallyAssignable<number, number>>().toBeTrue
  expect<MutuallyAssignable<1, 1 | 2>>().toBeFalse

  // More MutuallyAssignable tests
  expect<MutuallyAssignable<1 | 2, 2 | 1>>().toBeTrue
  expect<MutuallyAssignable<string, string>>().toBeTrue
  expect<MutuallyAssignable<never, never>>().toBeTrue
  expect<MutuallyAssignable<any, any>>().toBeTrue
  expect<MutuallyAssignable<unknown, unknown>>().toBeTrue
  expect<MutuallyAssignable<1 | 2, 2>>().toBeFalse
  expect<MutuallyAssignable<2, 1 | 2>>().toBeFalse
  expect<MutuallyAssignable<1, string>>().toBeFalse
  expect<MutuallyAssignable<{}, unknown>>().toBeFalse
  expect<MutuallyAssignable<unknown, {}>>().toBeFalse
}

import { expect } from '@leawind/lay-sing'
import type { MutuallyAssignable } from '@leawind/lay-sing/utils'

{
  expect<MutuallyAssignable<number, number>>().to.be.true
  expect<MutuallyAssignable<1, 1 | 2>>().to.be.false

  // More MutuallyAssignable tests
  expect<MutuallyAssignable<1 | 2, 2 | 1>>().to.be.true
  expect<MutuallyAssignable<string, string>>().to.be.true
  expect<MutuallyAssignable<never, never>>().to.be.true
  expect<MutuallyAssignable<any, any>>().to.be.true
  expect<MutuallyAssignable<unknown, unknown>>().to.be.true
  expect<MutuallyAssignable<1 | 2, 2>>().to.be.false
  expect<MutuallyAssignable<2, 1 | 2>>().to.be.false
  expect<MutuallyAssignable<1, string>>().to.be.false
  expect<MutuallyAssignable<{}, unknown>>().to.be.false
  expect<MutuallyAssignable<unknown, {}>>().to.be.false
}

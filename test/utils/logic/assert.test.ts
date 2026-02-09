import { expect } from '@leawind/lay-sing'
import type { AssertExtends } from '@leawind/lay-sing/utils'

{
  expect<AssertExtends<string, number>>().to.be.never
  expect<AssertExtends<string, string>>().to.be<string>().pass
  expect<AssertExtends<boolean, true>>().to.be.never

  // distributive check
  expect<AssertExtends<1 | 2, 1>>().to.be.never
  expect<AssertExtends<1, 1 | 2>>().to.be<1>().pass
  expect<AssertExtends<1 | 2, 1 | 2>>().to.be<1 | 2>().pass
}

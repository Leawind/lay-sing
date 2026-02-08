import { expect } from '@leawind/lay-sing'
import type { AssertExtends } from '@leawind/lay-sing/utils'

{
  expect<AssertExtends<string, number>>().toBeNever
  expect<AssertExtends<string, string>>().toBe<string>().success
  expect<AssertExtends<boolean, true>>().toBeNever

  // distributive check
  expect<AssertExtends<1 | 2, 1>>().toBeNever
  expect<AssertExtends<1, 1 | 2>>().toBe<1>().success
  expect<AssertExtends<1 | 2, 1 | 2>>().toBe<1 | 2>().success
}

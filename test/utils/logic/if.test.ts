import { expect } from '@leawind/lay-sing'
import type { If, IfFalse } from '@leawind/lay-sing/utils'

{
  expect<If<true, 'yes', 'no'>>().toBe<'yes'>().success
  expect<If<false, 'yes', 'no'>>().toBe<'no'>().success

  expect<If<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
  expect<If<never, 'yes', 'no'>>().toBeNever

  expect<If<true | false, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
}

{
  expect<IfFalse<false, 'yes', 'no'>>().toBe<'yes'>().success
  expect<IfFalse<true, 'yes', 'no'>>().toBe<'no'>().success

  expect<IfFalse<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
  expect<IfFalse<never, 'yes', 'no'>>().toBeNever

  expect<IfFalse<true | false, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
}

import { expect } from '@leawind/lay-sing'
import type { If, IfFalse } from '@leawind/lay-sing/utils'

{
  expect<If<true, 'yes', 'no'>>().toBe<'yes'>().pass
  expect<If<false, 'yes', 'no'>>().toBe<'no'>().pass

  expect<If<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().pass
  expect<If<never, 'yes', 'no'>>().toBeNever

  expect<If<true | false, 'yes', 'no'>>().toBe<'yes' | 'no'>().pass
}

{
  expect<IfFalse<false, 'yes', 'no'>>().toBe<'yes'>().pass
  expect<IfFalse<true, 'yes', 'no'>>().toBe<'no'>().pass

  expect<IfFalse<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().pass
  expect<IfFalse<never, 'yes', 'no'>>().toBeNever

  expect<IfFalse<true | false, 'yes', 'no'>>().toBe<'yes' | 'no'>().pass
}

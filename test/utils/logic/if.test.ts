import { expect } from '@leawind/lay-sing'
import type { If, IfFalse } from '@leawind/lay-sing/utils'

{
  expect<If<true, 'yes', 'no'>>().to.be<'yes'>().pass
  expect<If<false, 'yes', 'no'>>().to.be<'no'>().pass

  expect<If<any, 'yes', 'no'>>().to.be<'yes' | 'no'>().pass
  expect<If<never, 'yes', 'no'>>().to.be.never

  expect<If<true | false, 'yes', 'no'>>().to.be<'yes' | 'no'>().pass
}

{
  expect<IfFalse<false, 'yes', 'no'>>().to.be<'yes'>().pass
  expect<IfFalse<true, 'yes', 'no'>>().to.be<'no'>().pass

  expect<IfFalse<any, 'yes', 'no'>>().to.be<'yes' | 'no'>().pass
  expect<IfFalse<never, 'yes', 'no'>>().to.be.never

  expect<IfFalse<true | false, 'yes', 'no'>>().to.be<'yes' | 'no'>().pass
}

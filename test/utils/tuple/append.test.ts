import { expect } from '@leawind/lay-sing'
import type { AppendUnique } from '@leawind/lay-sing/utils'

{
  // Element does not exist in tuple
  expect<AppendUnique<[1, 2, 3], 4>>().to.be<[1, 2, 3, 4]>().pass

  // Element already exists in tuple
  expect<AppendUnique<[1, 2, 3], 2>>().to.be<[1, 2, 3]>().pass

  // Empty tuple
  expect<AppendUnique<[], 1>>().to.be<[1]>().pass

  // Single element tuple
  expect<AppendUnique<[1], 1>>().to.be<[1]>().pass

  expect<AppendUnique<[1], 2>>().to.be<[1, 2]>().pass

  // With literal strings
  expect<AppendUnique<['a', 'b'], 'c'>>().to.be<['a', 'b', 'c']>().pass

  expect<AppendUnique<['a', 'b'], 'a'>>().to.be<['a', 'b']>().pass

  expect<AppendUnique<[any, unknown, never, void], unknown>>().to.be<[any, unknown, never, void]>().pass

  expect<AppendUnique<['a', 'b'], never>>().to.be<['a', 'b', never]>().pass
  expect<AppendUnique<[never], never>>().to.be<[never]>().pass
  expect<AppendUnique<never, never>>().to.be.never
  expect<AppendUnique<never, unknown>>().to.be.never
}

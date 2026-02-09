import { expect } from '@leawind/lay-sing'
import type { AppendUnique } from '@leawind/lay-sing/utils'

{
  // Element does not exist in tuple
  expect<AppendUnique<[1, 2, 3], 4>>().toBe<[1, 2, 3, 4]>().pass

  // Element already exists in tuple
  expect<AppendUnique<[1, 2, 3], 2>>().toBe<[1, 2, 3]>().pass

  // Empty tuple
  expect<AppendUnique<[], 1>>().toBe<[1]>().pass

  // Single element tuple
  expect<AppendUnique<[1], 1>>().toBe<[1]>().pass

  expect<AppendUnique<[1], 2>>().toBe<[1, 2]>().pass

  // With literal strings
  expect<AppendUnique<['a', 'b'], 'c'>>().toBe<['a', 'b', 'c']>().pass

  expect<AppendUnique<['a', 'b'], 'a'>>().toBe<['a', 'b']>().pass

  expect<AppendUnique<[any, unknown, never, void], unknown>>().toBe<[any, unknown, never, void]>().pass

  expect<AppendUnique<['a', 'b'], never>>().toBe<['a', 'b', never]>().pass
  expect<AppendUnique<[never], never>>().toBe<[never]>().pass
  expect<AppendUnique<never, never>>().toBeNever
  expect<AppendUnique<never, unknown>>().toBeNever
}

import { expect } from '@leawind/lay-sing'
import type { AppendUnique } from '@leawind/lay-sing/utils'

{
  // Element does not exist in tuple
  expect<AppendUnique<[1, 2, 3], 4>>().toBe<[1, 2, 3, 4]>().success

  // Element already exists in tuple
  expect<AppendUnique<[1, 2, 3], 2>>().toBe<[1, 2, 3]>().success

  // Empty tuple
  expect<AppendUnique<[], 1>>().toBe<[1]>().success

  // Single element tuple
  expect<AppendUnique<[1], 1>>().toBe<[1]>().success

  expect<AppendUnique<[1], 2>>().toBe<[1, 2]>().success

  // With literal strings
  expect<AppendUnique<['a', 'b'], 'c'>>().toBe<['a', 'b', 'c']>().success

  expect<AppendUnique<['a', 'b'], 'a'>>().toBe<['a', 'b']>().success

  expect<AppendUnique<[any, unknown, never, void], unknown>>().toBe<[any, unknown, never, void]>().success

  expect<AppendUnique<['a', 'b'], never>>().toBe<['a', 'b', never]>().success
  expect<AppendUnique<[never], never>>().toBe<[never]>().success
  expect<AppendUnique<never, never>>().toBeNever
  expect<AppendUnique<never, unknown>>().toBeNever
}

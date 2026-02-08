import { expect } from '@leawind/lay-sing'
import type { Disjoint, Overlap } from '@leawind/lay-sing/utils'

// Overlap
{
  expect<Overlap<1 | 2, 2 | 3>>().toBeTrue
  expect<Overlap<1, string>>().toBeFalse

  // More Overlap tests
  expect<Overlap<number, 1>>().toBeTrue
  expect<Overlap<1, number>>().toBeTrue
  expect<Overlap<string, 'hello'>>().toBeTrue
  expect<Overlap<'hello', string>>().toBeTrue

  expect<Overlap<boolean, true>>().toBeTrue
  expect<Overlap<1, 2>>().toBeFalse
  expect<Overlap<string, number>>().toBeFalse
  expect<Overlap<'a' | 'b', 'b' | 'c'>>().toBeTrue
  expect<Overlap<'a' | 'b', 'c' | 'd'>>().toBeFalse
}

// Disjoint
{
  expect<Disjoint<1, string>>().toBeTrue
  expect<Disjoint<1, number>>().toBeFalse

  // More Disjoint tests
  expect<Disjoint<number, string>>().toBeTrue
  expect<Disjoint<1, 2>>().toBeTrue
  expect<Disjoint<'a', 'b'>>().toBeTrue
  expect<Disjoint<1, number>>().toBeFalse
  expect<Disjoint<'a', string>>().toBeFalse
  expect<Disjoint<1 | 2, 3 | 4>>().toBeTrue
  expect<Disjoint<1 | 2, 2 | 3>>().toBeFalse
}

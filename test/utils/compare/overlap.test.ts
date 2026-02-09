import { expect } from '@leawind/lay-sing'
import type { Disjoint, Overlap } from '@leawind/lay-sing/utils'

// Overlap
{
  expect<Overlap<1 | 2, 2 | 3>>().to.be.true
  expect<Overlap<1, string>>().to.be.false

  // More Overlap tests
  expect<Overlap<number, 1>>().to.be.true
  expect<Overlap<1, number>>().to.be.true
  expect<Overlap<string, 'hello'>>().to.be.true
  expect<Overlap<'hello', string>>().to.be.true

  expect<Overlap<boolean, true>>().to.be.true
  expect<Overlap<1, 2>>().to.be.false
  expect<Overlap<string, number>>().to.be.false
  expect<Overlap<'a' | 'b', 'b' | 'c'>>().to.be.true
  expect<Overlap<'a' | 'b', 'c' | 'd'>>().to.be.false
}

// Disjoint
{
  expect<Disjoint<1, string>>().to.be.true
  expect<Disjoint<1, number>>().to.be.false

  // More Disjoint tests
  expect<Disjoint<number, string>>().to.be.true
  expect<Disjoint<1, 2>>().to.be.true
  expect<Disjoint<'a', 'b'>>().to.be.true
  expect<Disjoint<1, number>>().to.be.false
  expect<Disjoint<'a', string>>().to.be.false
  expect<Disjoint<1 | 2, 3 | 4>>().to.be.true
  expect<Disjoint<1 | 2, 2 | 3>>().to.be.false
}

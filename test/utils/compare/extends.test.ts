import { expect } from '@leawind/lay-sing'
import type { Extends, ProperExtend } from '@leawind/lay-sing/utils'

{
  // any, never, unknown, void, number, 1|2

  expect<Extends<any, any>>().to.be.true
  expect<Extends<any, never>>().to.be.false
  expect<Extends<any, unknown>>().to.be.true
  expect<Extends<any, void>>().to.be.true
  expect<Extends<any, number>>().to.be.true
  expect<Extends<any, 1 | 2>>().to.be.true

  expect<Extends<never, any>>().to.be.true
  expect<Extends<never, never>>().to.be.true
  expect<Extends<never, unknown>>().to.be.true
  expect<Extends<never, void>>().to.be.true
  expect<Extends<never, number>>().to.be.true
  expect<Extends<never, 1 | 2>>().to.be.true

  expect<Extends<unknown, any>>().to.be.true
  expect<Extends<unknown, never>>().to.be.false
  expect<Extends<unknown, unknown>>().to.be.true
  expect<Extends<unknown, void>>().to.be.false
  expect<Extends<unknown, number>>().to.be.false
  expect<Extends<unknown, 1 | 2>>().to.be.false

  expect<Extends<void, any>>().to.be.true
  expect<Extends<void, never>>().to.be.false
  expect<Extends<void, unknown>>().to.be.true
  expect<Extends<void, void>>().to.be.true
  expect<Extends<void, number>>().to.be.false
  expect<Extends<void, 1 | 2>>().to.be.false

  expect<Extends<number, any>>().to.be.true
  expect<Extends<number, never>>().to.be.false
  expect<Extends<number, unknown>>().to.be.true
  expect<Extends<number, void>>().to.be.false
  expect<Extends<number, number>>().to.be.true
  expect<Extends<number, 1 | 2>>().to.be.false

  expect<Extends<1 | 2, any>>().to.be.true
  expect<Extends<1 | 2, never>>().to.be.false
  expect<Extends<1 | 2, unknown>>().to.be.true
  expect<Extends<1 | 2, void>>().to.be.false
  expect<Extends<1 | 2, number>>().to.be.true
  expect<Extends<1 | 2, 1 | 2>>().to.be.true

  // distributive check
  {
    expect<Extends<1 | 2, 1>>().to.be.false
    expect<Extends<2, 1 | 2>>().to.be.true
  }
}

{
  expect<ProperExtend<true, boolean>>().to.be.true
  expect<ProperExtend<false, boolean>>().to.be.true
  expect<ProperExtend<boolean, boolean>>().to.be.false

  expect<ProperExtend<2, number>>().to.be.true
  expect<ProperExtend<number, number>>().to.be.false
  expect<ProperExtend<1 | 2, 1 | 2>>().to.be.false

  // More ProperExtend tests
  expect<ProperExtend<1, 1 | 2>>().to.be.true
  expect<ProperExtend<string, string>>().to.be.false
  expect<ProperExtend<'a', string>>().to.be.true
  expect<ProperExtend<123, number>>().to.be.true
}

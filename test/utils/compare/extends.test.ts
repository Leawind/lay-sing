import { expect } from '@leawind/lay-sing'
import type { Extends, ProperExtend } from '@leawind/lay-sing/utils'

{
  // any, never, unknown, void, number, 1|2

  expect<Extends<any, any>>().toBeTrue
  expect<Extends<any, never>>().toBeFalse
  expect<Extends<any, unknown>>().toBeTrue
  expect<Extends<any, void>>().toBeTrue
  expect<Extends<any, number>>().toBeTrue
  expect<Extends<any, 1 | 2>>().toBeTrue

  expect<Extends<never, any>>().toBeTrue
  expect<Extends<never, never>>().toBeTrue
  expect<Extends<never, unknown>>().toBeTrue
  expect<Extends<never, void>>().toBeTrue
  expect<Extends<never, number>>().toBeTrue
  expect<Extends<never, 1 | 2>>().toBeTrue

  expect<Extends<unknown, any>>().toBeTrue
  expect<Extends<unknown, never>>().toBeFalse
  expect<Extends<unknown, unknown>>().toBeTrue
  expect<Extends<unknown, void>>().toBeFalse
  expect<Extends<unknown, number>>().toBeFalse
  expect<Extends<unknown, 1 | 2>>().toBeFalse

  expect<Extends<void, any>>().toBeTrue
  expect<Extends<void, never>>().toBeFalse
  expect<Extends<void, unknown>>().toBeTrue
  expect<Extends<void, void>>().toBeTrue
  expect<Extends<void, number>>().toBeFalse
  expect<Extends<void, 1 | 2>>().toBeFalse

  expect<Extends<number, any>>().toBeTrue
  expect<Extends<number, never>>().toBeFalse
  expect<Extends<number, unknown>>().toBeTrue
  expect<Extends<number, void>>().toBeFalse
  expect<Extends<number, number>>().toBeTrue
  expect<Extends<number, 1 | 2>>().toBeFalse

  expect<Extends<1 | 2, any>>().toBeTrue
  expect<Extends<1 | 2, never>>().toBeFalse
  expect<Extends<1 | 2, unknown>>().toBeTrue
  expect<Extends<1 | 2, void>>().toBeFalse
  expect<Extends<1 | 2, number>>().toBeTrue
  expect<Extends<1 | 2, 1 | 2>>().toBeTrue

  // distributive check
  {
    expect<Extends<1 | 2, 1>>().toBeFalse
    expect<Extends<2, 1 | 2>>().toBeTrue
  }
}

{
  expect<ProperExtend<true, boolean>>().toBeTrue
  expect<ProperExtend<false, boolean>>().toBeTrue
  expect<ProperExtend<boolean, boolean>>().toBeFalse

  expect<ProperExtend<2, number>>().toBeTrue
  expect<ProperExtend<number, number>>().toBeFalse
  expect<ProperExtend<1 | 2, 1 | 2>>().toBeFalse

  // More ProperExtend tests
  expect<ProperExtend<1, 1 | 2>>().toBeTrue
  expect<ProperExtend<string, string>>().toBeFalse
  expect<ProperExtend<'a', string>>().toBeTrue
  expect<ProperExtend<123, number>>().toBeTrue
}

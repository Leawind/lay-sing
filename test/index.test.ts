// deno-lint-ignore-file no-explicit-any
import { compare, expect } from '../src/test-utils/index.ts'

Deno.test('test expect<T>', () => {
  // toBeSpecial
  {
    expect<any>().toBeAny
    expect<unknown>().toBeUnknown
    expect<void>().toBeVoid
    expect<never>().toBeNever
    expect<true>().toBeTrue
    expect<false>().toBeFalse
  }
  // toBe
  {
    expect<any>().toBe<any>().success
    expect<unknown>().toBe<unknown>().success
    expect<void>().toBe<void>().success
    expect<never>().toBe<never>().success
    expect<true>().toBe<true>().success
    expect<false>().toBe<false>().success

    expect<false>().toBe<true>().fail
  }
  // toExtend
  {
    expect<3.14>().toExtendNumber
    expect<3.14>().toExtend<number>().success
    expect<3.14>().toExtend<3.14 | 2.72>().success

    expect<'hello'>().toExtendString
    expect<'hello'>().toExtend<string>().success

    expect<2>().toExtend<number>().success
    expect<2>().toExtend<string>().fail
  }
})

Deno.test('test expect<T, U>', () => {
  compare<3, 3>().same
  compare<3, 3>().same
  compare<boolean, boolean>().same
  compare<4, 'abc'>().different.disjoint
  compare<number, 4>().different.disjoint
  compare<4, number>().overlap.different
  compare<1 | 2, number>().different
})

import { expect } from '../src/test-utils/index.ts'

Deno.test('test expect<T>', async (t) => {
  await t.step('exact type', () => {
    // deno-lint-ignore no-explicit-any
    expect<any>().toBeAny
    expect<unknown>().toBeUnknown
    expect<void>().toBeVoid
    expect<never>().toBeNever
    expect<true>().toBeTrue
    expect<false>().toBeFalse

    // deno-lint-ignore no-explicit-any
    expect<any>().toBe<any>().success
    expect<unknown>().toBe<unknown>().success
    expect<void>().toBe<void>().success
    expect<never>().toBe<never>().success
    expect<true>().toBe<true>().success
    expect<false>().toBe<false>().success

    expect<false>().toBe<true>().fail
  })

  await t.step('toExtend', () => {
    expect<3.14>().toExtendNumber
    expect<3.14>().toExtend<number>().success
    expect<3.14>().toExtend<3.14 | 2.72>().success

    expect<'hello'>().toExtendString
    expect<'hello'>().toExtend<string>().success

    expect<2>().toExtend<number>().success
    expect<2>().toExtend<string>().fail
  })
})

Deno.test('test expect<T, U>', () => {
  expect<3, 3>().same
  expect<3, 3>().same
  expect<boolean, boolean>().same
  expect<4, 'abc'>().different.disjoint
  expect<number, 4>().different.disjoint
  expect<4, number>().overlap.different
  expect<1 | 2, number>().different
})

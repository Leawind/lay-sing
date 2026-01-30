// deno-lint-ignore-file no-explicit-any
import { expect } from '@leawind/lay-sing/test-utils'
import type { Case, DefaultCase, If, IfFalse, Switch, SwitchExtends } from '@leawind/lay-sing'

// If
{
  expect<If<true, 'yes', 'no'>>().toBe<'yes'>().success
  expect<If<false, 'yes', 'no'>>().toBe<'no'>().success

  expect<If<boolean, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
  expect<If<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().success

  expect<If<never, 'yes', 'no'>>().toBeNever
}
// IfNot
{
  expect<IfFalse<false, 'yes', 'no'>>().toBe<'yes'>().success
  expect<IfFalse<true, 'yes', 'no'>>().toBe<'no'>().success

  expect<IfFalse<boolean, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
  expect<IfFalse<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().success

  expect<IfFalse<never, 'yes', 'no'>>().toBeNever
}

// Switch
{
  // Basic
  {
    type NameMap<id> = Switch<id, [
      Case<1, 'Alice'>,
      Case<2, 'Bob'>,
      Case<3, 'Charlie'>,
    ], DefaultCase<'Steve'>>

    expect<NameMap<1>>().toBe<'Alice'>().success
    expect<NameMap<2>>().toBe<'Bob'>().success
    expect<NameMap<3>>().toBe<'Charlie'>().success

    // Default case
    expect<NameMap<999>>().toBe<'Steve'>().success
  }

  // Tuple
  expect<
    Switch<[1, 0], [
      Case<[0, 0], 0>,
      Case<[0, 1], 1>,
      Case<[1, 0], 2>,
      Case<[1, 1], 3>,
    ]>
  >().toBe<2>().success

  // never
  {
    expect<
      Switch<never, [
        Case<1, 1>,
        Case<2, 4>,
      ]>
    >().toBeNever

    expect<
      Switch<never, [
        Case<1, 1>,
        Case<never, 0>,
        Case<2, 4>,
      ]>
    >().toBe<0>().success
  }
}

// SwitchExtends
{
  type MySwitchExtendsResult = SwitchExtends<string, [
    Case<number, boolean>,
    Case<string, boolean>,
  ], Error>
  expect<MySwitchExtendsResult>().toBe<boolean>().success
}

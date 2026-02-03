import { expect } from '../../src/test-utils/index.ts'
import type { Case, DefaultCase, If, IfFalse, SwitchExact, SwitchExtends } from '@leawind/lay-sing'

{
  expect<If<true, 'yes', 'no'>>().toBe<'yes'>().success
  expect<If<false, 'yes', 'no'>>().toBe<'no'>().success

  expect<If<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
  expect<If<never, 'yes', 'no'>>().toBeNever

  expect<If<true | false, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
}

{
  expect<IfFalse<false, 'yes', 'no'>>().toBe<'yes'>().success
  expect<IfFalse<true, 'yes', 'no'>>().toBe<'no'>().success

  expect<IfFalse<any, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
  expect<IfFalse<never, 'yes', 'no'>>().toBeNever

  expect<IfFalse<true | false, 'yes', 'no'>>().toBe<'yes' | 'no'>().success
}

{
  // Basic
  {
    type NameMap<id> = SwitchExact<id, [
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
    SwitchExact<[1, 0], [
      Case<[0, 0], 0>,
      Case<[0, 1], 1>,
      Case<[1, 0], 2>,
      Case<[1, 1], 3>,
    ]>
  >().toBe<2>().success

  // never
  {
    expect<
      SwitchExact<never, [
        Case<1, 1>,
        Case<2, 4>,
      ]>
    >().toBeNever

    expect<
      SwitchExact<never, [
        Case<1, 1>,
        Case<never, 0>,
        Case<2, 4>,
      ]>
    >().toBe<0>().success
  }

  expect<
    SwitchExact<2 | 3, [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
    ]>
  >().toBeNever
}

{
  expect<
    SwitchExtends<string, [
      Case<number, boolean>,
      Case<string, boolean>,
    ], Error>
  >().toBe<boolean>().success

  expect<
    SwitchExtends<string | number, [
      Case<string, 'string type'>,
      Case<number, 'number type'>,
      Case<boolean, 'boolean type'>,
    ], 'other'>
  >().toBe<'other'>().success

  type NoMatchTest = SwitchExtends<string, [
    Case<number, boolean>,
    Case<boolean, boolean>,
  ], Error>
  expect<NoMatchTest>().toBe<Error>().success

  type ExactMatchTest = SwitchExtends<'hello', [
    Case<string, 'is-string'>,
    Case<'hello', 'is-hello'>,
  ], 'default'>
  expect<ExactMatchTest>().toBe<'is-string'>().success

  type NeverCaseTest = SwitchExtends<string, [
    Case<never, 'never-match'>,
    Case<string, 'string-match'>,
  ], 'default'>
  expect<NeverCaseTest>().toBe<'string-match'>().success

  type NeverInputTest = SwitchExtends<never, [
    Case<never, 'never-match'>,
    Case<string, 'string-match'>,
  ], 'default'>
  expect<NeverInputTest>().toBe<'never-match'>().success

  type AnyTest = SwitchExtends<any, [
    Case<string, 'string'>,
    Case<number, 'number'>,
    Case<any, 'any'>,
  ], 'default'>
  expect<AnyTest>().toBe<'string'>().success

  type EmptyCasesTest = SwitchExtends<string, [], 'default'>
  expect<EmptyCasesTest>().toBe<'default'>().success

  type ObjectTest = SwitchExtends<{ a: string }, [
    Case<{ a: string; b?: number }, 'has-a-with-optional-b'>,
    Case<{ a: number }, 'a-is-number'>,
    Case<object, 'object-type'>,
  ], 'not-an-object'>
  expect<ObjectTest>().toBe<'has-a-with-optional-b'>().success

  expect<
    SwitchExtends<123 | 'abc', [
      [number, 'num'],
      [string, 'str'],
      [boolean, 'boolean'],
      [bigint, 'bigint'],
      [Function, 'fn'],
    ]>
  >().toBeNever
}

import { expect } from '../../src/main/index.ts'
import type { DefaultCase, If, IfFalse, SwitchExact, SwitchExtends } from '@leawind/lay-sing/utils'

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
      [1, 'Alice'],
      [2, 'Bob'],
      [3, 'Charlie'],
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
      [[0, 0], 0],
      [[0, 1], 1],
      [[1, 0], 2],
      [[1, 1], 3],
    ]>
  >().toBe<2>().success

  // never
  {
    expect<
      SwitchExact<never, [
        [1, 1],
        [2, 4],
      ]>
    >().toBeNever

    expect<
      SwitchExact<never, [
        [1, 1],
        [never, 0],
        [2, 4],
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
      [number, boolean],
      [string, boolean],
    ], Error>
  >().toBe<boolean>().success

  expect<
    SwitchExtends<string | number, [
      [string, 'string type'],
      [number, 'number type'],
      [boolean, 'boolean type'],
    ], 'other'>
  >().toBe<'other'>().success

  type NoMatchTest = SwitchExtends<string, [
    [number, boolean],
    [boolean, boolean],
  ], Error>
  expect<NoMatchTest>().toBe<Error>().success

  type ExactMatchTest = SwitchExtends<'hello', [
    [string, 'is-string'],
    ['hello', 'is-hello'],
  ], 'default'>
  expect<ExactMatchTest>().toBe<'is-string'>().success

  type NeverCaseTest = SwitchExtends<string, [
    [never, 'never-match'],
    [string, 'string-match'],
  ], 'default'>
  expect<NeverCaseTest>().toBe<'string-match'>().success

  type NeverInputTest = SwitchExtends<never, [
    [never, 'never-match'],
    [string, 'string-match'],
  ], 'default'>
  expect<NeverInputTest>().toBe<'never-match'>().success

  type AnyTest = SwitchExtends<any, [
    [string, 'string'],
    [number, 'number'],
    [any, 'any'],
  ], 'default'>
  expect<AnyTest>().toBe<'string'>().success

  type EmptyCasesTest = SwitchExtends<string, [], 'default'>
  expect<EmptyCasesTest>().toBe<'default'>().success

  type ObjectTest = SwitchExtends<{ a: string }, [
    [{ a: string; b?: number }, 'has-a-with-optional-b'],
    [{ a: number }, 'a-is-number'],
    [object, 'object-type'],
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

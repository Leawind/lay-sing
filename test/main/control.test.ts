import { expect } from '../../src/test-utils/index.ts'
import type { Case, DefaultCase, If, IfFalse, SwitchExact, SwitchExtends } from '@leawind/lay-sing'

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
  // Basic functionality
  type MySwitchExtendsResult = SwitchExtends<string, [
    Case<number, boolean>,
    Case<string, boolean>,
  ], Error>
  expect<MySwitchExtendsResult>().toBe<boolean>().success

  // Test with union type - when input is a union, it checks each member against the cases

  // Since both string and number match, the result is a union of their return types
  expect<
    SwitchExtends<string | number, [
      Case<string, 'string type'>,
      Case<number, 'number type'>,
      Case<boolean, 'boolean type'>,
    ], 'other'>
  >().toBe<'other'>().success

  // Test with no match - should return default
  type NoMatchTest = SwitchExtends<string, [
    Case<number, boolean>,
    Case<boolean, boolean>,
  ], Error>
  expect<NoMatchTest>().toBe<Error>().success

  // Test with exact match
  type ExactMatchTest = SwitchExtends<'hello', [
    Case<string, 'is-string'>,
    Case<'hello', 'is-hello'>,
  ], 'default'>
  expect<ExactMatchTest>().toBe<'is-string'>().success // 'hello' extends string, so matches first

  // Test with never case
  type NeverCaseTest = SwitchExtends<string, [
    Case<never, 'never-match'>,
    Case<string, 'string-match'>,
  ], 'default'>
  expect<NeverCaseTest>().toBe<'string-match'>().success

  // Test with never input
  type NeverInputTest = SwitchExtends<never, [
    Case<never, 'never-match'>,
    Case<string, 'string-match'>,
  ], 'default'>
  expect<NeverInputTest>().toBe<'never-match'>().success

  // Test with any type - any extends any non-bottom type
  type AnyTest = SwitchExtends<any, [
    Case<string, 'string'>,
    Case<number, 'number'>,
    Case<any, 'any'>,
  ], 'default'>
  expect<AnyTest>().toBe<'string'>().success

  // Test with empty cases - should return default
  type EmptyCasesTest = SwitchExtends<string, [], 'default'>
  expect<EmptyCasesTest>().toBe<'default'>().success

  // More complex example with object types
  type ObjectTest = SwitchExtends<{ a: string }, [
    Case<{ a: string; b?: number }, 'has-a-with-optional-b'>,
    Case<{ a: number }, 'a-is-number'>,
    Case<object, 'object-type'>,
  ], 'not-an-object'>
  expect<ObjectTest>().toBe<'has-a-with-optional-b'>().success // {a: string} extends {a: string, b?: number}
}

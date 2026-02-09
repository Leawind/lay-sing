import { expect } from '@leawind/lay-sing'
import type { DefaultCase, SwitchExact, SwitchExtends } from '@leawind/lay-sing/utils'

{
  // Basic
  {
    type NameMap<id> = SwitchExact<id, [
      [1, 'Alice'],
      [2, 'Bob'],
      [3, 'Charlie'],
    ], DefaultCase<'Steve'>>

    expect<NameMap<1>>().to.be<'Alice'>().pass
    expect<NameMap<2>>().to.be<'Bob'>().pass
    expect<NameMap<3>>().to.be<'Charlie'>().pass

    // Default case
    expect<NameMap<999>>().to.be<'Steve'>().pass
  }

  // Tuple
  expect<
    SwitchExact<[1, 0], [
      [[0, 0], 0],
      [[0, 1], 1],
      [[1, 0], 2],
      [[1, 1], 3],
    ]>
  >().to.be<2>().pass

  // never
  {
    expect<
      SwitchExact<never, [
        [1, 1],
        [2, 4],
      ]>
    >().to.be.never

    expect<
      SwitchExact<never, [
        [1, 1],
        [never, 0],
        [2, 4],
      ]>
    >().to.be<0>().pass
  }

  expect<
    SwitchExact<2 | 3, [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
    ]>
  >().to.be.never
}

{
  expect<
    SwitchExtends<string, [
      [number, boolean],
      [string, boolean],
    ], Error>
  >().to.be<boolean>().pass

  expect<
    SwitchExtends<string | number, [
      [string, 'string type'],
      [number, 'number type'],
      [boolean, 'boolean type'],
    ], 'other'>
  >().to.be<'other'>().pass

  type NoMatchTest = SwitchExtends<string, [
    [number, boolean],
    [boolean, boolean],
  ], Error>
  expect<NoMatchTest>().to.be<Error>().pass

  type ExactMatchTest = SwitchExtends<'hello', [
    [string, 'is-string'],
    ['hello', 'is-hello'],
  ], 'default'>
  expect<ExactMatchTest>().to.be<'is-string'>().pass

  type NeverCaseTest = SwitchExtends<string, [
    [never, 'never-match'],
    [string, 'string-match'],
  ], 'default'>
  expect<NeverCaseTest>().to.be<'string-match'>().pass

  type NeverInputTest = SwitchExtends<never, [
    [never, 'never-match'],
    [string, 'string-match'],
  ], 'default'>
  expect<NeverInputTest>().to.be<'never-match'>().pass

  type AnyTest = SwitchExtends<any, [
    [string, 'string'],
    [number, 'number'],
    [any, 'any'],
  ], 'default'>
  expect<AnyTest>().to.be<'string'>().pass

  type EmptyCasesTest = SwitchExtends<string, [], 'default'>
  expect<EmptyCasesTest>().to.be<'default'>().pass

  type ObjectTest = SwitchExtends<{ a: string }, [
    [{ a: string; b?: number }, 'has-a-with-optional-b'],
    [{ a: number }, 'a-is-number'],
    [object, 'object-type'],
  ], 'not-an-object'>
  expect<ObjectTest>().to.be<'has-a-with-optional-b'>().pass

  expect<
    SwitchExtends<123 | 'abc', [
      [number, 'num'],
      [string, 'str'],
      [boolean, 'boolean'],
      [bigint, 'bigint'],
      [Function, 'fn'],
    ]>
  >().to.be.never
}

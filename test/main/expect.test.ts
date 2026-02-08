import { expect } from '@leawind/lay-sing'

// function
{
  const fn: (_a: 1, _b: 2) => true = null!
  expect(fn).returnType().toBeTrue
  expect(fn).argsType().toBe<[1, 2]>().success
  expect(expect(fn)).toHaveKey<'returnType' | 'argsType'>().success

  const co: new (_a: 1, _b: 2) => true = null!
  expect(co).returnType().toBeTrue
  expect(co).argsType().toBe<[1, 2]>().success
  expect(expect(co)).toHaveKey<'returnType' | 'argsType'>().success

  expect(expect<any>()).toHaveKey<'returnType' | 'argsType'>().fail
  expect(expect<never>()).toHaveKey<'returnType' | 'argsType'>().fail
  expect(expect<unknown>()).toHaveKey<'returnType' | 'argsType'>().fail
  expect(expect<void>()).toHaveKey<'returnType' | 'argsType'>().fail
  expect(expect<{}>()).toHaveKey<'returnType' | 'argsType'>().fail
}

// toBeSpecial
{
  expect<any>().toBeAny
  expect<unknown>().toBeUnknown
  expect<void>().toBeVoid
  expect<never>().toBeNever
  expect<true>().toBeTrue
  expect<false>().toBeFalse
  expect<null>().toBeNull
  expect<undefined>().toBeUndefined
}
// toBe
{
  expect<any>().toBe<any>().success
  expect<unknown>().toBe<unknown>().success
  expect<void>().toBe<void>().success
  expect<never>().toBe<never>().success
  expect<null>().toBe<null>().success
  expect<undefined>().toBe<undefined>().success

  expect<false>().toBe<true>().fail
}
{
  expect<{ a: 1; b: 2 }>().toEqual<{ a: 1 } & { b: 2 }>().success
  expect<{ a: 1; b: 2 }>().toEqual<{ a: 1; b: 2 }>().success
  expect<true | false>().toEqual<boolean>().success
  expect<1 & 2>().toEqual<never>().success

  expect<true>().toEqual<boolean>().fail
  expect<1>().toEqual<1 | 2>().fail

  expect<any>().toEqual<any>().success
  expect<any>().toEqual<unknown>().success
  expect<any>().toEqual<never>().fail
  expect<any>().toEqual<void>().success
  expect<any>().toEqual<null>().success
  expect<any>().toEqual<undefined>().success
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

// toProperExtend
{
  // Test that a subtype properly extends a supertype
  expect<2>().toProperExtend<number>().success
  expect<'a' | 'b'>().toProperExtend<string>().success

  // Test that a type doesn't properly extend itself (not a proper subtype)
  expect<number>().toProperExtend<number>().fail
  expect<2>().toProperExtend<2>().fail

  // Test that incompatible types don't extend
  expect<2>().toProperExtend<string>().fail
  expect<string>().toProperExtend<number>().fail
}

// toHaveKey
{
  type WithProp = { prop: string; another: number; may?: 5 }

  // Simple key
  {
    expect<WithProp>().toHaveKey<'prop'>().success
    expect<WithProp>().toHaveKey<'another'>().success
    expect<WithProp>().toHaveKey<'may'>().success
  }
  {
    expect<WithProp>().toHaveKey<'prop' | 'another'>().success
    expect<WithProp>().toHaveKey<'may' | 'unexist'>().fail
  }
  {
    expect<WithProp>().toHaveKey<string>().fail
    expect<WithProp>().toHaveKey<number>().fail
    expect<WithProp>().toHaveKey<symbol>().fail
    expect<WithProp>().toHaveKey<PropertyKey>()
    {
      const _ = expect<WithProp>().toHaveKey<any>()
      expect<typeof _>().toBeNever
    }
    {
      const _ = expect<WithProp>().toHaveKey<never>()
      expect<typeof _>().toBeNever
    }
  }

  // Test that object doesn't have property
  expect<WithProp>().toHaveKey<'missing'>().fail

  // Test with simple types
  expect<{}>().toHaveKey<'length'>().fail
  expect<string>().toHaveKey<'length'>().success
  expect<'s'>().toHaveKey<'charAt'>().success
}

// Chained
{
  expect<{ a: 1; b: 2 }>()
    .toBe<{ a: 1; b: 2 }>().success
    .toEqual<{ a: 1 } & { b: 2 }>().success
    .toExtend<object>().success
    .toProperExtend<object>().success
    .toProperExtend<{ a: 1; b: 2 }>().fail
    .toProperExtend<{ a: 1 }>().success
}

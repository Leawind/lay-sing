import { expect } from '@leawind/lay-sing'

// function
// {
//   const fn: (_a: 1, _b: 2) => true = null!
//   expect(fn).returnType().toBeTrue
//   expect(fn).argsType().toBe<[1, 2]>().pass
//   expect(expect(fn)).toHaveKey<'returnType' | 'argsType'>().pass

//   const co: new (_a: 1, _b: 2) => true = null!
//   expect(co).returnType().toBeTrue
//   expect(co).argsType().toBe<[1, 2]>().pass
//   expect(expect(co)).toHaveKey<'returnType' | 'argsType'>().pass

//   expect(expect<any>()).toHaveKey<'returnType' | 'argsType'>().fail
//   expect(expect<never>()).toHaveKey<'returnType' | 'argsType'>().fail
//   expect(expect<unknown>()).toHaveKey<'returnType' | 'argsType'>().fail
//   expect(expect<void>()).toHaveKey<'returnType' | 'argsType'>().fail
//   expect(expect<{}>()).toHaveKey<'returnType' | 'argsType'>().fail
// }

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
  expect<any>().toBe<any>().pass
  expect<unknown>().toBe<unknown>().pass
  expect<void>().toBe<void>().pass
  expect<never>().toBe<never>().pass
  expect<null>().toBe<null>().pass
  expect<undefined>().toBe<undefined>().pass

  expect<false>().toBe<true>().fail
}
{
  expect<{ a: 1; b: 2 }>().toEqual<{ a: 1 } & { b: 2 }>().pass
  expect<{ a: 1; b: 2 }>().toEqual<{ a: 1; b: 2 }>().pass
  expect<true | false>().toEqual<boolean>().pass
  expect<1 & 2>().toEqual<never>().pass

  expect<true>().toEqual<boolean>().fail
  expect<1>().toEqual<1 | 2>().fail

  expect<any>().toEqual<any>().pass
  expect<any>().toEqual<unknown>().pass
  expect<any>().toEqual<never>().fail
  expect<any>().toEqual<void>().pass
  expect<any>().toEqual<null>().pass
  expect<any>().toEqual<undefined>().pass
}
// toExtend
{
  expect<3.14>().toExtendNumber
  expect<3.14>().toExtend<number>().pass
  expect<3.14>().toExtend<3.14 | 2.72>().pass

  expect<'hello'>().toExtendString
  expect<'hello'>().toExtend<string>().pass

  expect<2>().toExtend<number>().pass
  expect<2>().toExtend<string>().fail
}

// toProperExtend
{
  // Test that a subtype properly extends a supertype
  expect<2>().toProperExtend<number>().pass
  expect<'a' | 'b'>().toProperExtend<string>().pass

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
    expect<WithProp>().toHaveKey<'prop'>().pass
    expect<WithProp>().toHaveKey<'another'>().pass
    expect<WithProp>().toHaveKey<'may'>().pass
  }
  {
    expect<WithProp>().toHaveKey<'prop' | 'another'>().pass
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
  expect<string>().toHaveKey<'length'>().pass
  expect<'s'>().toHaveKey<'charAt'>().pass
}

import { expect } from '@leawind/lay-sing'

// to.be.Special
{
  expect<any>().to.be.any
  expect<unknown>().to.be.unknown
  expect<void>().to.be.void
  expect<never>().to.be.never
  expect<true>().to.be.true
  expect<false>().to.be.false
  expect<null>().to.be.null
  expect<undefined>().to.be.undefined
}
// to.be.
{
  expect<any>().to.be<any>().pass
  expect<unknown>().to.be<unknown>().pass
  expect<void>().to.be<void>().pass
  expect<never>().to.be<never>().pass
  expect<null>().to.be<null>().pass
  expect<undefined>().to.be<undefined>().pass

  expect<false>().to.be<true>().fail
}
// to.equal
{
  expect<{ a: 1; b: 2 }>().to.equal<{ a: 1 } & { b: 2 }>().pass
  expect<{ a: 1; b: 2 }>().to.equal<{ a: 1; b: 2 }>().pass
  expect<true | false>().to.equal<boolean>().pass
  expect<1 & 2>().to.equal<never>().pass

  expect<true>().to.equal<boolean>().fail
  expect<1>().to.equal<1 | 2>().fail

  expect<any>()
    .to.equal<any>().pass
    .to.equal<unknown>().pass
    .to.equal<never>().fail
    .to.equal<void>().pass
    .to.equal<null>().pass
    .to.equal<undefined>().pass
}
// to.extend
{
  expect<3.14>()
    .to.extend.number
    .to.extend<number>().pass
    .to.extend<3.14 | 2.72>().pass

  expect<'hello'>().to.extend.string
  expect<'hello'>().to.extend<string>().pass

  expect<2>().to.extend<number>().pass
  expect<2>().to.extend<string>().fail
}

// to.properExtend
{
  // Test that a subtype properly extends a supertype
  expect<2>().to.properExtend<number>().pass
  expect<'a' | 'b'>().to.properExtend<string>().pass

  // Test that a type doesn't properly extend itself (not a proper subtype)
  expect<number>().to.properExtend<number>().fail
  expect<2>().to.properExtend<2>().fail

  // Test that incompatible types don't extend
  expect<2>().to.properExtend<string>().fail
  expect<string>().to.properExtend<number>().fail
}

// to.haveKey
{
  type WithProp = { prop: string; another: number; may?: 5 }

  // Simple key
  {
    expect<WithProp>()
      .to.haveKey<'prop'>().pass
      .to.haveKey<'another'>().pass
      .to.haveKey<'may'>().pass
  }
  {
    expect<WithProp>()
      .to.haveKey<'prop' | 'another'>().pass
      .to.haveKey<'may' | 'unexist'>().fail
  }
  {
    expect<WithProp>()
      .to.haveKey<string>().fail
      .to.haveKey<number>().fail
      .to.haveKey<symbol>().fail
      .to.haveKey<PropertyKey>()
    {
      const _ = expect<WithProp>().to.haveKey<any>()
      expect<typeof _>().to.be.never
    }
    {
      const _ = expect<WithProp>().to.haveKey<never>()
      expect<typeof _>().to.be.never
    }
  }

  // Test that object doesn't have property
  expect<WithProp>().to.haveKey<'missing'>().fail

  // Test with simple types
  expect<{}>().to.haveKey<'length'>().fail
  expect<string>().to.haveKey<'length'>().pass
  expect<'s'>().to.haveKey<'charAt'>().pass
}

{
  expect<123>()
    .to.be<456>().fail
    .to.not.be<456>().pass
    .to.not.not.be<456>().fail
    .to.not.not.not.be<456>().pass
}

{
  expect<'s'>()
    .to.be<'s'>().pass
    .to.equal<'s'>().pass
    .to.haveKey<'charAt'>().pass
    .to.haveKey('charAt').pass
    .to.extend<string>().pass
}

{
  expect('abc')
    .to.be('abc').pass
    .to.be('def').fail

  expect(1.2)
    .to.be(1.2).pass
    .to.be(1.3).fail

  expect(true)
    .to.be(true).pass
    .to.be(false).fail

  expect(false)
    .to.be(false).pass
    .to.be(true).fail

  expect(123n)
    .to.be(123n).pass
    .to.be(456n).fail
}

import { expect } from '@leawind/lay-sing'
import type { Exact, NotExact } from '@leawind/lay-sing/utils'

// Exact
{
  // Manually check these types:
  {
    {
      type _T1 = Exact<number, number>
      type _T2 = Exact<1, 1>
      type _F1 = Exact<number, string>
      type _F2 = Exact<1, 2>
    }
    {
      type _T1 = Exact<true | false, boolean>

      type _F1 = Exact<1, number>
      type _F2 = Exact<true, boolean>
      type _F4 = Exact<'a', string>
      type _F3 = Exact<2, 2 | 3>
    }

    // any, unknown, never, void
    {
      {
        type _T1 = Exact<any, any>
        type _T2 = Exact<unknown, unknown>
        type _T3 = Exact<never, never>
        type _T4 = Exact<void, void>
      }
      {
        type _F1 = Exact<any, unknown>
        type _F2 = Exact<any, never>
        type _F3 = Exact<any, void>
        type _F4 = Exact<unknown, never>
        type _F5 = Exact<unknown, void>
        type _F6 = Exact<never, void>
      }
      {
        type _T1 = Exact<any | unknown, any>
        type _T2 = Exact<any | never, any>
        type _T3 = Exact<any | void, any>

        type _T4 = Exact<unknown | never, unknown>
        type _T5 = Exact<unknown | void, unknown>

        type _T6 = Exact<never | void, void>
      }
    }
  }

  // Basic type comparisons
  expect<Exact<number, number>>().to.be.true
  expect<Exact<number, string>>().to.be.false

  // Literal types
  {
    expect<Exact<3, 3>>().to.be.true
    expect<Exact<[3], [3]>>().to.be.true
    expect<Exact<3, 5>>().to.be.false
    expect<Exact<[3], [5]>>().to.be.false
  }
  {
    type Wrap<A, B> = Exact<[A], [B]>
    expect<Wrap<3, 3>>().to.be.true
    expect<Wrap<[3], [3]>>().to.be.true
    expect<Wrap<3, 5>>().to.be.false
    expect<Wrap<[3], [5]>>().to.be.false
  }

  // Union types
  {
    expect<Exact<string | number, number | string>>().to.be.true
    expect<Exact<string | number, string | boolean>>().to.be.false
  }
  // any, never, unknown, void
  {
    expect<Exact<any, any>>().to.be.true
    expect<Exact<any, never>>().to.be.false
    expect<Exact<any, unknown>>().to.be.false
    expect<Exact<any, void>>().to.be.false

    expect<Exact<never, never>>().to.be.true
    expect<Exact<never, unknown>>().to.be.false
    expect<Exact<never, void>>().to.be.false

    expect<Exact<unknown, unknown>>().to.be.true
    expect<Exact<unknown, void>>().to.be.false

    expect<Exact<void, void>>().to.be.true
  }
  // Complex types
  {
    expect<Exact<{ a: 3 }, { a: 3 }>>().to.be.true
    expect<Exact<{ a: 3 }, { b: 3 }>>().to.be.false
    expect<Exact<{ a: 3 }, { a?: 3 }>>().to.be.false
    expect<Exact<{ a: 3 | undefined }, { a?: 3 }>>().to.be.false
    expect<Exact<() => void, () => void>>().to.be.true
    expect<Exact<() => void, () => undefined>>().to.be.false
  }
  // Array types
  {
    expect<Exact<number[], number[]>>().to.be.true
    expect<Exact<number[], string[]>>().to.be.false
    expect<Exact<Array<number>, number[]>>().to.be.true
  }
  // Distributiveness
  {
    expect<Exact<1 | 2, 1>>().to.be.false
    expect<Exact<2, 1 | 2>>().to.be.false
    type Temp<A, B> = Exact<A, B>
    expect<Temp<1 | 2, 1>>().to.be.false
    expect<Temp<2, 1 | 2>>().to.be.false
  }
}

// NotExact
{
  expect<NotExact<number, string>>().to.be.true
  expect<NotExact<number, number>>().to.be.false

  // Literal types
  expect<NotExact<3, 5>>().to.be.true
  expect<NotExact<3, 3>>().to.be.false

  // Union types
  expect<NotExact<string | number, number | string>>().to.be.false
  expect<NotExact<string | number, string | boolean>>().to.be.true
}

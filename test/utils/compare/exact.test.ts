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
  expect<Exact<number, number>>().toBeTrue
  expect<Exact<number, string>>().toBeFalse

  // Literal types
  {
    expect<Exact<3, 3>>().toBeTrue
    expect<Exact<[3], [3]>>().toBeTrue
    expect<Exact<3, 5>>().toBeFalse
    expect<Exact<[3], [5]>>().toBeFalse
  }
  {
    type Wrap<A, B> = Exact<[A], [B]>
    expect<Wrap<3, 3>>().toBeTrue
    expect<Wrap<[3], [3]>>().toBeTrue
    expect<Wrap<3, 5>>().toBeFalse
    expect<Wrap<[3], [5]>>().toBeFalse
  }

  // Union types
  {
    expect<Exact<string | number, number | string>>().toBeTrue
    expect<Exact<string | number, string | boolean>>().toBeFalse
  }
  // any, never, unknown, void
  {
    expect<Exact<any, any>>().toBeTrue
    expect<Exact<any, never>>().toBeFalse
    expect<Exact<any, unknown>>().toBeFalse
    expect<Exact<any, void>>().toBeFalse

    expect<Exact<never, never>>().toBeTrue
    expect<Exact<never, unknown>>().toBeFalse
    expect<Exact<never, void>>().toBeFalse

    expect<Exact<unknown, unknown>>().toBeTrue
    expect<Exact<unknown, void>>().toBeFalse

    expect<Exact<void, void>>().toBeTrue
  }
  // Complex types
  {
    expect<Exact<{ a: 3 }, { a: 3 }>>().toBeTrue
    expect<Exact<{ a: 3 }, { b: 3 }>>().toBeFalse
    expect<Exact<{ a: 3 }, { a?: 3 }>>().toBeFalse
    expect<Exact<{ a: 3 | undefined }, { a?: 3 }>>().toBeFalse
    expect<Exact<() => void, () => void>>().toBeTrue
    expect<Exact<() => void, () => undefined>>().toBeFalse
  }
  // Array types
  {
    expect<Exact<number[], number[]>>().toBeTrue
    expect<Exact<number[], string[]>>().toBeFalse
    expect<Exact<Array<number>, number[]>>().toBeTrue
  }
  // Distributiveness
  {
    expect<Exact<1 | 2, 1>>().toBeFalse
    expect<Exact<2, 1 | 2>>().toBeFalse
    type Temp<A, B> = Exact<A, B>
    expect<Temp<1 | 2, 1>>().toBeFalse
    expect<Temp<2, 1 | 2>>().toBeFalse
  }
}

// NotExact
{
  expect<NotExact<number, string>>().toBeTrue
  expect<NotExact<number, number>>().toBeFalse

  // Literal types
  expect<NotExact<3, 5>>().toBeTrue
  expect<NotExact<3, 3>>().toBeFalse

  // Union types
  expect<NotExact<string | number, number | string>>().toBeFalse
  expect<NotExact<string | number, string | boolean>>().toBeTrue
}

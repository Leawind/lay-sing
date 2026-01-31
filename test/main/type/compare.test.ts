// deno-lint-ignore-file no-explicit-any ban-types
import { expect } from '@leawind/lay-sing/test-utils'
import type { Disjoint, Exact, Extends, MutuallyAssignable, NotExact, Overlap, ProperExtend } from '@leawind/lay-sing'

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
    expect<Exact<{ a: number }, { a: number }>>().toBeTrue
    expect<Exact<{ a: number }, { b: number }>>().toBeFalse
    expect<Exact<{ a: number }, { a?: number }>>().toBeFalse
    expect<Exact<{ a: number | undefined }, { a?: number }>>().toBeFalse
    expect<Exact<() => void, () => void>>().toBeTrue
    expect<Exact<() => void, () => undefined>>().toBeFalse
  }
  // Array types
  {
    expect<Exact<number[], number[]>>().toBeTrue
    expect<Exact<number[], string[]>>().toBeFalse
    expect<Exact<Array<number>, number[]>>().toBeTrue
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

// Extends
{
  // any, never, unknown, void, number, 1|2

  expect<Extends<any, any>>().toBeTrue
  expect<Extends<any, never>>().toBeFalse
  expect<Extends<any, unknown>>().toBeTrue
  expect<Extends<any, void>>().toBeTrue
  expect<Extends<any, number>>().toBeTrue
  expect<Extends<any, 1 | 2>>().toBeTrue

  expect<Extends<never, any>>().toBeTrue
  expect<Extends<never, never>>().toBeTrue
  expect<Extends<never, unknown>>().toBeTrue
  expect<Extends<never, void>>().toBeTrue
  expect<Extends<never, number>>().toBeTrue
  expect<Extends<never, 1 | 2>>().toBeTrue

  expect<Extends<unknown, any>>().toBeTrue
  expect<Extends<unknown, never>>().toBeFalse
  expect<Extends<unknown, unknown>>().toBeTrue
  expect<Extends<unknown, void>>().toBeFalse
  expect<Extends<unknown, number>>().toBeFalse
  expect<Extends<unknown, 1 | 2>>().toBeFalse

  expect<Extends<void, any>>().toBeTrue
  expect<Extends<void, never>>().toBeFalse
  expect<Extends<void, unknown>>().toBeTrue
  expect<Extends<void, void>>().toBeTrue
  expect<Extends<void, number>>().toBeFalse
  expect<Extends<void, 1 | 2>>().toBeFalse

  expect<Extends<number, any>>().toBeTrue
  expect<Extends<number, never>>().toBeFalse
  expect<Extends<number, unknown>>().toBeTrue
  expect<Extends<number, void>>().toBeFalse
  expect<Extends<number, number>>().toBeTrue
  expect<Extends<number, 1 | 2>>().toBeFalse

  expect<Extends<1 | 2, any>>().toBeTrue
  expect<Extends<1 | 2, never>>().toBeFalse
  expect<Extends<1 | 2, unknown>>().toBeTrue
  expect<Extends<1 | 2, void>>().toBeFalse
  expect<Extends<1 | 2, number>>().toBeTrue
  expect<Extends<1 | 2, 1 | 2>>().toBeTrue
}

// ProperExtend
{
  expect<ProperExtend<true, boolean>>().toBeTrue
  expect<ProperExtend<false, boolean>>().toBeTrue
  expect<ProperExtend<boolean, boolean>>().toBeFalse

  expect<ProperExtend<2, number>>().toBeTrue
  expect<ProperExtend<number, number>>().toBeFalse
  expect<ProperExtend<1 | 2, 1 | 2>>().toBeFalse

  // More ProperExtend tests
  expect<ProperExtend<1, 1 | 2>>().toBeTrue
  expect<ProperExtend<string, string>>().toBeFalse
  expect<ProperExtend<'a', string>>().toBeTrue
  expect<ProperExtend<123, number>>().toBeTrue
}

// Overlap
{
  expect<Overlap<1 | 2, 2 | 3>>().toBeTrue
  expect<Overlap<1, string>>().toBeFalse

  // More Overlap tests
  expect<Overlap<number, 1>>().toBeTrue
  expect<Overlap<1, number>>().toBeTrue
  expect<Overlap<string, 'hello'>>().toBeTrue
  expect<Overlap<'hello', string>>().toBeTrue

  expect<Overlap<boolean, true>>().toBeTrue
  expect<Overlap<1, 2>>().toBeFalse
  expect<Overlap<string, number>>().toBeFalse
  expect<Overlap<'a' | 'b', 'b' | 'c'>>().toBeTrue
  expect<Overlap<'a' | 'b', 'c' | 'd'>>().toBeFalse
}

// Disjoint
{
  expect<Disjoint<1, string>>().toBeTrue
  expect<Disjoint<1, number>>().toBeFalse

  // More Disjoint tests
  expect<Disjoint<number, string>>().toBeTrue
  expect<Disjoint<1, 2>>().toBeTrue
  expect<Disjoint<'a', 'b'>>().toBeTrue
  expect<Disjoint<1, number>>().toBeFalse
  expect<Disjoint<'a', string>>().toBeFalse
  expect<Disjoint<1 | 2, 3 | 4>>().toBeTrue
  expect<Disjoint<1 | 2, 2 | 3>>().toBeFalse
}

// MutuallyAssignable
{
  expect<MutuallyAssignable<number, number>>().toBeTrue
  expect<MutuallyAssignable<1, 1 | 2>>().toBeFalse

  // More MutuallyAssignable tests
  expect<MutuallyAssignable<1 | 2, 2 | 1>>().toBeTrue
  expect<MutuallyAssignable<string, string>>().toBeTrue
  expect<MutuallyAssignable<never, never>>().toBeTrue
  expect<MutuallyAssignable<any, any>>().toBeTrue
  expect<MutuallyAssignable<unknown, unknown>>().toBeTrue
  expect<MutuallyAssignable<1 | 2, 2>>().toBeFalse
  expect<MutuallyAssignable<2, 1 | 2>>().toBeFalse
  expect<MutuallyAssignable<1, string>>().toBeFalse
  expect<MutuallyAssignable<{}, unknown>>().toBeFalse
  expect<MutuallyAssignable<unknown, {}>>().toBeFalse
}

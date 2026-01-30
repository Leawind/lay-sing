// deno-lint-ignore-file no-explicit-any ban-types
import { compare, expect } from '@leawind/lay-sing/test-utils'

// test expect<T>
{
  // toBeSpecial
  {
    expect<any>().toBeAny
    expect<unknown>().toBeUnknown
    expect<void>().toBeVoid
    expect<never>().toBeNever
    expect<true>().toBeTrue
    expect<false>().toBeFalse
  }
  // toBe
  {
    expect<any>().toBe<any>().success
    expect<unknown>().toBe<unknown>().success
    expect<void>().toBe<void>().success
    expect<never>().toBe<never>().success
    expect<true>().toBeTrue
    expect<false>().toBeFalse

    expect<false>().toBe<true>().fail
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

  // toHaveProperty
  {
    type WithProp = { prop: string; another: number; may?: 5 }

    // Test that object has property
    expect<WithProp>().toHaveProperty<'prop' | 'another'>().success
    expect<WithProp>().toHaveProperty<'prop'>().success
    expect<WithProp>().toHaveProperty<'another'>().success
    expect<WithProp>().toHaveProperty<'may'>().success

    // Test that object doesn't have property
    expect<WithProp>().toHaveProperty<'missing'>().fail

    // Test with simple types
    expect<{}>().toHaveProperty<'length'>().fail
    expect<string>().toHaveProperty<'length'>().success
    expect<'s'>().toHaveProperty<'charAt'>().success
  }
}

// test compare<T, U>
{
  // same - exactly the same type
  {
    compare<number, number>().same
    compare<string, string>().same
    compare<boolean, boolean>().same
    compare<{}, {}>().same
    compare<[], []>().same
    compare<undefined, undefined>().same
    compare<null, null>().same
    compare<true, true>().same
    compare<false, false>().same
    compare<123, 123>().same
    compare<'hello', 'hello'>().same
  }

  // different - different types (but may or may not be disjoint)
  {
    compare<number, string>().different
    compare<boolean, number>().different
    compare<{}, []>().different
    compare<undefined, null>().different
    compare<true, false>().different
    compare<123, 456>().different
    compare<'hello', 'world'>().different
  }

  // overlap - types that have some intersection (but may or may not be different)
  {
    compare<1 | 2, 2 | 3>().overlap
    compare<'a' | 'b', 'b' | 'c'>().overlap
    compare<1, 1 | 2>().overlap
    compare<'hello', 'hello' | 'world'>().overlap
  }

  // disjoint - completely non-overlapping types (implies also different)
  {
    compare<number, string>().different.disjoint
    compare<boolean, number>().different.disjoint
    compare<'a', 'b'>().different.disjoint
    compare<1, 2>().different.disjoint
    compare<undefined, null>().different.disjoint
  }

  // mutuallyAssignable - types that are assignable to each other (implies also same or overlap)
  {
    compare<number, number>().mutuallyAssignable
    compare<1, 1>().mutuallyAssignable
    compare<'hello', 'hello'>().mutuallyAssignable

    // Union types that are mutually assignable
    compare<1 | 2, 1 | 2>().mutuallyAssignable
  }

  // Test more complex cases
  {
    // Object types
    compare<{ a: number }, { a: number }>().same
    compare<{ a: number }, { a: string }>().different
    compare<{ a: number }, { a: number; b?: string }>().different

    // Array types
    compare<number[], number[]>().same
    compare<number[], string[]>().different
    compare<[number], number[]>().different

    // Union types
    compare<1 | 2 | 3, 2 | 3 | 4>().overlap
    compare<1 | 2, 1 | 2>().same

    // Function types
    compare<() => void, () => void>().same
    compare<() => void, () => string>().different
  }

  // Test combinations that can occur together based on actual type relationships
  {
    // Literal type vs parent type - they overlap but are different
    compare<4, number>().overlap.different
    compare<'hello', string>().overlap.different
    compare<true, boolean>().overlap.different

    // Parent type vs literal - just different (no overlap property available in this direction)
    compare<number, 4>().different
    compare<string, 'hello'>().different
    compare<boolean, true>().different

    // Union and supertype relationship
    compare<1 | 2, number>().different.overlap
    compare<number, 1 | 2>().different
  }

  // Edge cases with special types
  {
    compare<any, any>().same
    compare<unknown, unknown>().same
    compare<never, never>().same
    compare<void, void>().same

    // Compare with special types
    compare<any, number>().different
    compare<number, any>().different
    compare<unknown, number>().different
    compare<number, unknown>().different
    compare<void, undefined>().different
    compare<never, number>().different.disjoint
    compare<number, never>().different.disjoint
  }
}

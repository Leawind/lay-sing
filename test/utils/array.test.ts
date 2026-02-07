import { expect } from '../../src/main/index.ts'
import type { AppendUnique, ConcatTuple, ConcatUniqueTuple, IfTupleIncludes } from '@leawind/lay-sing/utils'

// ConcatArray
{
  expect<ConcatTuple<[1, 2], [3, 4]>>().toBe<[1, 2, 3, 4]>().success
  expect<ConcatTuple<[], [1, 2]>>().toBe<[1, 2]>().success
  expect<ConcatTuple<[1, 2], []>>().toBe<[1, 2]>().success
  expect<ConcatTuple<[], []>>().toBe<[]>().success

  expect<ConcatTuple<readonly number[], [1]>>().toBe<[...number[], 1]>().success
  expect<ConcatTuple<[1], readonly number[]>>().toBe<[1, ...number[]]>().success

  expect<ConcatTuple<[], never>>().toBeNever
  expect<ConcatTuple<never, []>>().toBeNever
}

// IfTupleIncludes
{
  // Basic
  {
    expect<IfTupleIncludes<[], 2>>().toBeFalse

    expect<IfTupleIncludes<[2], 2>>().toBeTrue

    expect<IfTupleIncludes<[1, 2], 1>>().toBeTrue
    expect<IfTupleIncludes<[1, 2], 2>>().toBeTrue
    expect<IfTupleIncludes<[1, 2], 3>>().toBeFalse

    expect<IfTupleIncludes<[1, 2, 3], 1>>().toBeTrue
    expect<IfTupleIncludes<[1, 2, 3], 2>>().toBeTrue
    expect<IfTupleIncludes<[1, 2, 3], 3>>().toBeTrue
    expect<IfTupleIncludes<[1, 2, 3], 4>>().toBeFalse
  }
  // Union
  {
    expect<IfTupleIncludes<[any, 2 | 3], 2 | 3>>().toBeTrue
    expect<IfTupleIncludes<[any, 2 | 3], 2>>().toBeFalse
    expect<IfTupleIncludes<[any, 2, 3], 2 | 3>>().toBeFalse
  }
  // Spicial types
  {
    expect<IfTupleIncludes<[any, 2], 1>>().toBeFalse
    expect<IfTupleIncludes<[any, 2], 2>>().toBeTrue
    expect<IfTupleIncludes<[any, 2], any>>().toBeTrue

    expect<IfTupleIncludes<[unknown, 2], 1>>().toBeFalse
    expect<IfTupleIncludes<[unknown, 2], 2>>().toBeTrue
    expect<IfTupleIncludes<[unknown, 2], unknown>>().toBeTrue

    expect<IfTupleIncludes<[never, 2], 1>>().toBeFalse
    expect<IfTupleIncludes<[never, 2], 2>>().toBeTrue
    expect<IfTupleIncludes<[never, 2], never>>().toBeTrue

    expect<IfTupleIncludes<[void, 2], 1>>().toBeFalse
    expect<IfTupleIncludes<[void, 2], 2>>().toBeTrue
    expect<IfTupleIncludes<[void, 2], void>>().toBeTrue
  }
  // Empty
  {
    expect<IfTupleIncludes<[], number>>().toBeFalse
    expect<IfTupleIncludes<[], 1>>().toBeFalse
    expect<IfTupleIncludes<[], any>>().toBeFalse
    expect<IfTupleIncludes<[], never>>().toBeFalse
    expect<IfTupleIncludes<[], void>>().toBeFalse
    expect<IfTupleIncludes<[], unknown>>().toBeFalse
  }
  // number[]
  {
    expect<IfTupleIncludes<number[], number>>().toBeFalse
    expect<IfTupleIncludes<number[], 1>>().toBeFalse
    expect<IfTupleIncludes<number[], any>>().toBeFalse
    expect<IfTupleIncludes<number[], never>>().toBeFalse
    expect<IfTupleIncludes<number[], void>>().toBeFalse
    expect<IfTupleIncludes<number[], unknown>>().toBeFalse
  }

  // Invalid
  {
    expect<IfTupleIncludes<never, number>>().toBeNever
    expect<IfTupleIncludes<never, 1>>().toBeNever
    expect<IfTupleIncludes<never, never>>().toBeNever
    expect<IfTupleIncludes<never, any>>().toBeNever

    expect<IfTupleIncludes<any, number>>().toBeNever
    expect<IfTupleIncludes<any, 1>>().toBeNever
    expect<IfTupleIncludes<any, never>>().toBeNever
    expect<IfTupleIncludes<any, any>>().toBeNever
  }
}

// PushIfNotExists
{
  // Element does not exist in tuple
  expect<AppendUnique<[1, 2, 3], 4>>().toBe<[1, 2, 3, 4]>().success

  // Element already exists in tuple
  expect<AppendUnique<[1, 2, 3], 2>>().toBe<[1, 2, 3]>().success

  // Empty tuple
  expect<AppendUnique<[], 1>>().toBe<[1]>().success

  // Single element tuple
  expect<AppendUnique<[1], 1>>().toBe<[1]>().success

  expect<AppendUnique<[1], 2>>().toBe<[1, 2]>().success

  // With literal strings
  expect<AppendUnique<['a', 'b'], 'c'>>().toBe<['a', 'b', 'c']>().success

  expect<AppendUnique<['a', 'b'], 'a'>>().toBe<['a', 'b']>().success

  expect<AppendUnique<[any, unknown, never, void], unknown>>().toBe<[any, unknown, never, void]>().success

  expect<AppendUnique<['a', 'b'], never>>().toBe<['a', 'b', never]>().success
  expect<AppendUnique<[never], never>>().toBe<[never]>().success
  expect<AppendUnique<never, never>>().toBeNever
  expect<AppendUnique<never, unknown>>().toBeNever
}

// UnionArray
{
  // Combining two arrays with unique elements
  expect<ConcatUniqueTuple<[1, 2], [3, 4]>>().toBe<[1, 2, 3, 4]>().success

  // Combining arrays with overlapping elements
  expect<ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]>>().toBe<[1, 2, 3, 4]>().success

  // Adding to empty array
  expect<ConcatUniqueTuple<[], [1, 2]>>().toBe<[1, 2]>().success
  expect<ConcatUniqueTuple<[1, 2], []>>().toBe<[1, 2]>().success

  // Both empty arrays
  expect<ConcatUniqueTuple<[], []>>().toBe<[]>().success

  // With literal strings
  expect<ConcatUniqueTuple<['a', 'b'], ['c', 'd']>>().toBe<['a', 'b', 'c', 'd']>().success
  expect<ConcatUniqueTuple<['a', 'b'], ['b', 'c']>>().toBe<['a', 'b', 'c']>().success

  // With complex types
  expect<
    ConcatUniqueTuple<
      [{ a: 1 }, { b: 1 }],
      [{ a: 1 }, { b: 2 }]
    >
  >().toBe<
    [{ a: 1 }, { b: 1 }, { b: 2 }]
  >().success

  expect<ConcatUniqueTuple<[], never>>().toBeNever
  expect<ConcatUniqueTuple<never, []>>().toBeNever
  expect<ConcatUniqueTuple<never, never>>().toBeNever
}

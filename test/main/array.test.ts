// deno-lint-ignore-file no-explicit-any
import { expect } from '@leawind/lay-sing/test-utils'
import type { AppendUnique, ConcatTuple, ConcatUniqueTuple, ReadonlyArray, TupleIncludes } from '@leawind/lay-sing'

// ReadonlyArray
{
  expect<ReadonlyArray<number>>().toBe<readonly number[]>().success
  expect<ReadonlyArray<string>>().toBe<readonly string[]>()

  // Verify mutability
  type Mutable = number[]
  type Readonly = ReadonlyArray<number>

  expect<Mutable>().toExtend<Readonly>().success
  expect<Readonly>().toExtend<Mutable>().fail
}

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

// TupleIncludes
{
  // Basic cases
  expect<TupleIncludes<[1, 2], 1>>().toBeTrue
  expect<TupleIncludes<[1, 2], 2>>().toBeTrue
  expect<TupleIncludes<[1, 2], 3>>().toBeFalse

  // Empty tuple
  expect<TupleIncludes<[], 1>>().toBeFalse

  // Single element
  expect<TupleIncludes<[1], 1>>().toBeTrue
  expect<TupleIncludes<[1], 2>>().toBeFalse

  // With union types
  expect<TupleIncludes<[1 | 2, 3], 1 | 2>>().toBeTrue
  expect<TupleIncludes<[1 | 2, 3], 3>>().toBeTrue

  expect<TupleIncludes<[1 | 2, 3], 1>>().toBeFalse
  expect<TupleIncludes<[1 | 2, 3], 2>>().toBeFalse
  expect<TupleIncludes<[1 | 2, 3], 4>>().toBeFalse

  expect<TupleIncludes<[never], never>>().toBeTrue
  expect<TupleIncludes<[1], never>>().toBeFalse
  expect<TupleIncludes<[never], 1>>().toBeFalse

  expect<TupleIncludes<never, 3>>().toBeNever
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

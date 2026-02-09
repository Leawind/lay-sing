import { expect } from '@leawind/lay-sing'
import type { ConcatTuple, ConcatUniqueTuple } from '@leawind/lay-sing/utils'

{
  expect<ConcatTuple<[1, 2], [3, 4]>>().toBe<[1, 2, 3, 4]>().pass
  expect<ConcatTuple<[], [1, 2]>>().toBe<[1, 2]>().pass
  expect<ConcatTuple<[1, 2], []>>().toBe<[1, 2]>().pass
  expect<ConcatTuple<[], []>>().toBe<[]>().pass

  expect<ConcatTuple<readonly number[], [1]>>().toBe<[...number[], 1]>().pass
  expect<ConcatTuple<[1], readonly number[]>>().toBe<[1, ...number[]]>().pass

  expect<ConcatTuple<[], never>>().toBeNever
  expect<ConcatTuple<never, []>>().toBeNever
}

{
  // Combining two arrays with unique elements
  expect<ConcatUniqueTuple<[1, 2], [3, 4]>>().toBe<[1, 2, 3, 4]>().pass

  // Combining arrays with overlapping elements
  expect<ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]>>().toBe<[1, 2, 3, 4]>().pass

  // Adding to empty array
  expect<ConcatUniqueTuple<[], [1, 2]>>().toBe<[1, 2]>().pass
  expect<ConcatUniqueTuple<[1, 2], []>>().toBe<[1, 2]>().pass

  // Both empty arrays
  expect<ConcatUniqueTuple<[], []>>().toBe<[]>().pass

  // With literal strings
  expect<ConcatUniqueTuple<['a', 'b'], ['c', 'd']>>().toBe<['a', 'b', 'c', 'd']>().pass
  expect<ConcatUniqueTuple<['a', 'b'], ['b', 'c']>>().toBe<['a', 'b', 'c']>().pass

  // With complex types
  expect<
    ConcatUniqueTuple<
      [{ a: 1 }, { b: 1 }],
      [{ a: 1 }, { b: 2 }]
    >
  >().toBe<
    [{ a: 1 }, { b: 1 }, { b: 2 }]
  >().pass

  expect<ConcatUniqueTuple<[], never>>().toBeNever
  expect<ConcatUniqueTuple<never, []>>().toBeNever
  expect<ConcatUniqueTuple<never, never>>().toBeNever
}

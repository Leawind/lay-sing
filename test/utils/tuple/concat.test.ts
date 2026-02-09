import { expect } from '@leawind/lay-sing'
import type { ConcatTuple, ConcatUniqueTuple } from '@leawind/lay-sing/utils'

{
  expect<ConcatTuple<[1, 2], [3, 4]>>().to.be<[1, 2, 3, 4]>().pass
  expect<ConcatTuple<[], [1, 2]>>().to.be<[1, 2]>().pass
  expect<ConcatTuple<[1, 2], []>>().to.be<[1, 2]>().pass
  expect<ConcatTuple<[], []>>().to.be<[]>().pass

  expect<ConcatTuple<readonly number[], [1]>>().to.be<[...number[], 1]>().pass
  expect<ConcatTuple<[1], readonly number[]>>().to.be<[1, ...number[]]>().pass

  expect<ConcatTuple<[], never>>().to.be.never
  expect<ConcatTuple<never, []>>().to.be.never
}

{
  // Combining two arrays with unique elements
  expect<ConcatUniqueTuple<[1, 2], [3, 4]>>().to.be<[1, 2, 3, 4]>().pass

  // Combining arrays with overlapping elements
  expect<ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]>>().to.be<[1, 2, 3, 4]>().pass

  // Adding to empty array
  expect<ConcatUniqueTuple<[], [1, 2]>>().to.be<[1, 2]>().pass
  expect<ConcatUniqueTuple<[1, 2], []>>().to.be<[1, 2]>().pass

  // Both empty arrays
  expect<ConcatUniqueTuple<[], []>>().to.be<[]>().pass

  // With literal strings
  expect<ConcatUniqueTuple<['a', 'b'], ['c', 'd']>>().to.be<['a', 'b', 'c', 'd']>().pass
  expect<ConcatUniqueTuple<['a', 'b'], ['b', 'c']>>().to.be<['a', 'b', 'c']>().pass

  // With complex types
  expect<
    ConcatUniqueTuple<
      [{ a: 1 }, { b: 1 }],
      [{ a: 1 }, { b: 2 }]
    >
  >().to.be<
    [{ a: 1 }, { b: 1 }, { b: 2 }]
  >().pass

  expect<ConcatUniqueTuple<[], never>>().to.be.never
  expect<ConcatUniqueTuple<never, []>>().to.be.never
  expect<ConcatUniqueTuple<never, never>>().to.be.never
}

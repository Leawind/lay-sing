import { expect } from '@leawind/lay-sing'
import type { IfTupleIncludes } from '@leawind/lay-sing/utils'

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

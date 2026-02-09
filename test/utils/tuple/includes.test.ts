import { expect } from '@leawind/lay-sing'
import type { IfTupleIncludes } from '@leawind/lay-sing/utils'

{
  // Basic
  {
    expect<IfTupleIncludes<[], 2>>().to.be.false

    expect<IfTupleIncludes<[2], 2>>().to.be.true

    expect<IfTupleIncludes<[1, 2], 1>>().to.be.true
    expect<IfTupleIncludes<[1, 2], 2>>().to.be.true
    expect<IfTupleIncludes<[1, 2], 3>>().to.be.false

    expect<IfTupleIncludes<[1, 2, 3], 1>>().to.be.true
    expect<IfTupleIncludes<[1, 2, 3], 2>>().to.be.true
    expect<IfTupleIncludes<[1, 2, 3], 3>>().to.be.true
    expect<IfTupleIncludes<[1, 2, 3], 4>>().to.be.false
  }
  // Union
  {
    expect<IfTupleIncludes<[any, 2 | 3], 2 | 3>>().to.be.true
    expect<IfTupleIncludes<[any, 2 | 3], 2>>().to.be.false
    expect<IfTupleIncludes<[any, 2, 3], 2 | 3>>().to.be.false
  }
  // Spicial types
  {
    expect<IfTupleIncludes<[any, 2], 1>>().to.be.false
    expect<IfTupleIncludes<[any, 2], 2>>().to.be.true
    expect<IfTupleIncludes<[any, 2], any>>().to.be.true

    expect<IfTupleIncludes<[unknown, 2], 1>>().to.be.false
    expect<IfTupleIncludes<[unknown, 2], 2>>().to.be.true
    expect<IfTupleIncludes<[unknown, 2], unknown>>().to.be.true

    expect<IfTupleIncludes<[never, 2], 1>>().to.be.false
    expect<IfTupleIncludes<[never, 2], 2>>().to.be.true
    expect<IfTupleIncludes<[never, 2], never>>().to.be.true

    expect<IfTupleIncludes<[void, 2], 1>>().to.be.false
    expect<IfTupleIncludes<[void, 2], 2>>().to.be.true
    expect<IfTupleIncludes<[void, 2], void>>().to.be.true
  }
  // Empty
  {
    expect<IfTupleIncludes<[], number>>().to.be.false
    expect<IfTupleIncludes<[], 1>>().to.be.false
    expect<IfTupleIncludes<[], any>>().to.be.false
    expect<IfTupleIncludes<[], never>>().to.be.false
    expect<IfTupleIncludes<[], void>>().to.be.false
    expect<IfTupleIncludes<[], unknown>>().to.be.false
  }
  // number[]
  {
    expect<IfTupleIncludes<number[], number>>().to.be.false
    expect<IfTupleIncludes<number[], 1>>().to.be.false
    expect<IfTupleIncludes<number[], any>>().to.be.false
    expect<IfTupleIncludes<number[], never>>().to.be.false
    expect<IfTupleIncludes<number[], void>>().to.be.false
    expect<IfTupleIncludes<number[], unknown>>().to.be.false
  }

  // Invalid
  {
    expect<IfTupleIncludes<never, number>>().to.be.never
    expect<IfTupleIncludes<never, 1>>().to.be.never
    expect<IfTupleIncludes<never, never>>().to.be.never
    expect<IfTupleIncludes<never, any>>().to.be.never

    expect<IfTupleIncludes<any, number>>().to.be.never
    expect<IfTupleIncludes<any, 1>>().to.be.never
    expect<IfTupleIncludes<any, never>>().to.be.never
    expect<IfTupleIncludes<any, any>>().to.be.never
  }
}

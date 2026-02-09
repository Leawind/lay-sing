import { expect } from '@leawind/lay-sing'
import type { PropsOfBaseType } from '@leawind/lay-sing/utils'

{
  type TestObj = { a: 1; b: 2; c: 1; d: 4 }

  // Basic functionality
  {
    expect<PropsOfBaseType<TestObj, 1>>().toBe<{ a: 1; c: 1 }>().pass
    expect<PropsOfBaseType<TestObj, 2>>().toBe<{ b: 2 }>().pass
    expect<PropsOfBaseType<TestObj, 4>>().toBe<{ d: 4 }>().pass

    expect<PropsOfBaseType<TestObj, 'no such key'>>().toBe<{}>().pass
  }
  // Optional properties
  {
    expect<PropsOfBaseType<{ a?: 1 }, 1>>().toBe<{ a?: 1 }>().pass
    expect<PropsOfBaseType<{ a?: 1 }, 1 | undefined>>().toBe<{}>().pass
    expect<PropsOfBaseType<{ a?: 1; c: 1; b?: 2; d: 3 }, 1>>().toBe<{ a?: 1; c: 1 }>().pass
  }
  // Edge cases
  {
    expect<PropsOfBaseType<{}, 1>>().toBe<{}>().pass
  }
}

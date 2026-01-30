import { expect } from '@leawind/lay-sing/test-utils'
import type { TypedArray } from '@leawind/lay-sing'

expect<Int8Array>().toExtend<TypedArray>().success
expect<Float64Array>().toExtend<TypedArray>().success

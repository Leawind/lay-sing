import { expect } from '../../src/test-utils/index.ts'
import type { TypedArray } from '@leawind/lay-sing'

expect<Int8Array>().toExtend<TypedArray>().success
expect<Float64Array>().toExtend<TypedArray>().success

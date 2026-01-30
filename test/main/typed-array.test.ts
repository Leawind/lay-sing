import { expect } from '../../src/test-utils.ts'
import type { TypedArray, TypedArrayConstructor } from '../../src/main/typed-array.ts'

expect<Int8Array>().toExtend<TypedArray>().success
expect<Float64Array>().toExtend<TypedArray>().success

expect<TypedArrayConstructor<Float32Array>>().toBe<Float32ArrayConstructor>().success

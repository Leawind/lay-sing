import { expect } from '../../src/test-utils.ts'
import type { AnyFunction, Constructor } from '../../src/main/function.ts'

expect<Constructor<string, [number]>>().toExtend<new (arg: number) => string>().success
expect<AnyFunction<string, [number]>>().toExtend<(arg: number) => string>().success

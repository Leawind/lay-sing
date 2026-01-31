import { expect } from '../../src/test-utils/index.ts'
import type { AnyFunction, Constructor } from '@leawind/lay-sing'

expect<Constructor<string, [number]>>().toExtend<new (arg: number) => string>().success
expect<AnyFunction<string, [number]>>().toExtend<(arg: number) => string>().success

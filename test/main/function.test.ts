import { expect } from '@leawind/lay-sing/test-utils'
import type { AnyFunction, Constructor } from '@leawind/lay-sing'

expect<Constructor<string, [number]>>().toExtend<new (arg: number) => string>().success
expect<AnyFunction<string, [number]>>().toExtend<(arg: number) => string>().success

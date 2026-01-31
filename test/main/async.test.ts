import { expect } from '../../src/test-utils/index.ts'
import type { Awaitable } from '@leawind/lay-sing'

expect<Awaitable<number>>().toBe<number | Promise<number>>().success

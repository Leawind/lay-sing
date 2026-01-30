import { expect } from '../../src/test-utils.ts'
import type { Awaitable } from '../../src/main/async.ts'

expect<Awaitable<number>>().toBe<number | Promise<number>>().success

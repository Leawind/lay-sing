import { expect } from '@leawind/lay-sing/test-utils'
import type { Awaitable } from '@leawind/lay-sing'

expect<Awaitable<number>>().toBe<number | Promise<number>>().success

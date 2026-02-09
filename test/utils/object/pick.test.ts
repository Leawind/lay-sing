import { expect } from '@leawind/lay-sing'
import type { SafePick } from '@leawind/lay-sing/utils'

{
  type Picked = SafePick<{ a: string; b: number }, 'a' | 'c'>
  expect<Picked>().toBe<{ a: string }>().pass
}

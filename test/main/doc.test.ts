import type { AppendDoc, PrependDoc } from '@leawind/lay-sing'
import { NOOP } from '@leawind/lay-sing/test-utils'

type A = {
  /** A#a */
  a: number

  /** A#b */
  b: string
}
type B = {
  /** B#a */
  a: number

  /** B#b */
  b: string
}

{
  const obj: AppendDoc<A, B> = NOOP!
  obj.a // A#a B#a
  obj.b // A#b B#b
}

{
  const obj: PrependDoc<A, B> = NOOP!
  obj.a // B#a A#a
  obj.b // B#b A#b
}

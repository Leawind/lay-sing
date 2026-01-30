import type { AppendDoc, PrependDoc } from '../../src/main/doc.ts'

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
  const obj: AppendDoc<A, B> = null!
  obj.a // A#a B#a
  obj.b // A#b B#b
}

{
  const obj: PrependDoc<A, B> = null!
  obj.a // B#a A#a
  obj.b // B#b A#b
}

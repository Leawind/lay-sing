import type { IntersectOf } from './type/set.ts'

export type CommonKeysOf<T extends readonly unknown[]> = T extends [infer F, ...infer R]
  ? (R extends [] ? keyof F : keyof F & CommonKeysOf<R>)
  : never

export type DiffKeysOf<T extends readonly unknown[]> = Omit<IntersectOf<T>, CommonKeysOf<T>>

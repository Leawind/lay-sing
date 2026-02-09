import type { ToBe } from './to-be.ts'
import type { ToExtend } from './to-extend.ts'
import type { ToEqual } from './to-equal.ts'
import type { ToHaveKey } from './to-have-key.ts'

export type BuiltInComponents<T> = [
  ToBe<T>,
  ToExtend<T>,
  ToEqual<T>,
  ToHaveKey<T>,
]

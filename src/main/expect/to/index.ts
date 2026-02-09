import type { Be } from './be.ts'
import type { Equal } from './equal.ts'
import type { Extend } from './extend.ts'
import type { ProperExtends } from './proper-extends.ts'
import type { HaveKey } from './have-key.ts'

export type To<T> = {
  be: Be<T>
  equal: Equal<T>
  extend: Extend<T>
  properExtend: ProperExtends<T>
  haveKey: HaveKey<T>
}

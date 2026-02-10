import type { Not } from '../../../utils/logic/boolean.ts'
import type { Be } from './be.ts'
import type { Equal } from './equal.ts'
import type { Extend } from './extend.ts'
import type { ProperExtends } from './proper-extends.ts'
import type { HaveKey } from './have-key.ts'

export type To<T, Inv extends boolean = false> = {
  not: To<T, Not<Inv>>
  be: Be<T, Inv>
  equal: Equal<T, Inv>
  extend: Extend<T, Inv>
  properExtend: ProperExtends<T, Inv>
  haveKey: HaveKey<T, Inv>
}

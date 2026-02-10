import type { Extends, IfTupleIncludes } from '@leawind/lay-sing/utils'
import type { TypeAssertionResult } from '../index.ts'

type Result<T, K extends PropertyKey> = IfTupleIncludes<
  [never, any],
  K,
  never,
  TypeAssertionResult<T, Extends<K, keyof T>>
>

export type HaveKey<T> = {
  /**
   * Tests if the current type `T` has a property with key `K`.
   *
   * @template K The property key to check for
   *
   * ### Behavior
   *
   * - For single keys: succeeds if the key exists in `T`
   * - For union types: succeeds only if **all** keys in the union exist in `T`
   *
   * ### Examples
   *
   * ```ts
   * import { expect } from '@leawind/lay-sing'
   *
   * type WithProp = { prop: string; another: number; may?: 5 }
   *
   * // Single key checks
   * expect<WithProp>().to.haveKey<'prop'>().pass
   * expect<WithProp>().to.haveKey<'missing'>().fail
   *
   * // Union type checks
   * expect<WithProp>().to.haveKey<'prop' | 'another'>().pass
   * expect<WithProp>().to.haveKey<'may' | 'unexist'>().fail
   * ```
   */
  <K extends PropertyKey>(): Result<T, K>
  <K extends PropertyKey>(_: K): Result<T, K>
}

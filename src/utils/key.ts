import type { Exact } from './type/index.ts'

/**
 * Extracts the keys of an object whose **base value type** matches the specified `ValueType` (ignoring undefined from optional properties).
 *
 * This utility matches the underlying/base type of each property (stripping `undefined` added by optional modifiers `?`).
 * For optional properties (e.g., `a?: string`), the type is treated as `string` – no need to include `undefined` in `ValueType` to match.
 *
 * @template Obj - The target object type to extract keys from.
 * @template ValueType - The base type to match against property values (ignoring undefined from optional properties).
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * // Basic usage: match base type (non-optional property)
 * type A = { a: 1; b: 2; c: 1 };
 * expect<KeysOfBaseType<A, 1>>().toBe<'a' | 'c'>().success
 *
 * // Key difference: optional property matching (ignores undefined)
 * type B = { a?: string; b: string };
 * expect<KeysOfBaseType<B, string>>().toBe<'a' | 'b'>().success // matches base type of both
 * expect<KeysOfBaseType<B, string | undefined>>().toBe<never>().success // base type does not include undefined
 *
 * type C = { a: never; b: any; c: unknown };
 * expect<KeysOfBaseType<C, never>>().toBe<'a'>().success
 * expect<KeysOfBaseType<C, any>>().toBe<'b'>().success
 * expect<KeysOfBaseType<C, unknown>>().toBe<'c'>().success
 * ```
 */
export type KeysOfBaseType<Obj, ValueType> = Exclude<
  {
    [K in keyof Obj]: Exact<Required<Obj>[K], ValueType> extends true ? K : never
  }[keyof Obj],
  undefined
>

/**
 * Extracts the keys of an object whose **complete value type** exactly matches the specified `ValueType` (including undefined for optional properties).
 *
 * This utility strictly matches the full type of each property (including `undefined` added by optional modifiers `?`).
 * For optional properties (e.g., `a?: string`), the type is treated as `string | undefined` – to match, `ValueType` must include `undefined`.
 *
 * @template Obj - The target object type to extract keys from.
 * @template ValueType - The exact type to match against property values (including undefined for optional properties).
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * // Basic usage: match exact type (non-optional property)
 * type A = { a: 1; b: 2; c: 1 };
 * expect<KeysOfExactType<A, 1>>().toBe<'a' | 'c'>().success
 *
 * // Key difference: optional property matching (requires undefined in `ValueType`)
 * type B = { a?: string };
 * expect<KeysOfExactType<B, string | undefined>>().toBe<'a'>().success // matches complete type
 * expect<KeysOfExactType<B, string>>().toBe<never>().success // does not match complete type
 *
 * type C = { a: never; b: any; c: unknown };
 * expect<KeysOfExactType<C, never>>().toBe<'a'>().success
 * expect<KeysOfExactType<C, any>>().toBe<'b'>().success
 * expect<KeysOfExactType<C, unknown>>().toBe<'c'>().success
 * ```
 */
export type KeysOfExactType<Obj, ValueType> = Exclude<
  { [K in keyof Obj]: Exact<Obj[K], ValueType> extends true ? K : never }[keyof Obj],
  undefined
>

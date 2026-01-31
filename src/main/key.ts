import type { Same } from './type/index.ts'

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
 * // Basic usage: match base type (non-optional property)
 * type A = { a: 1; b: 2; c: 1 };
 * type MatchedKeys = KeysOfBaseType<A, 1>; // 'a' | 'c'
 *
 * @example
 * // Key difference: optional property matching (ignores undefined)
 * type B = { a?: string; b: string };
 * type MatchBaseString = KeysOfBaseType<B, string>; // 'a' | 'b' (matches base type of both)
 * type MatchWithUndefined = KeysOfBaseType<B, string | undefined>; // never (base type does not include undefined)
 *
 * @example
 * // Edge cases: never/any/unknown
 * type C = { a: never; b: any; c: unknown };
 * type MatchNever = KeysOfBaseType<C, never>; // 'a'
 * type MatchAny = KeysOfBaseType<C, any>; // 'b'
 * type MatchUnknown = KeysOfBaseType<C, unknown>; // 'c'
 */
export type KeysOfBaseType<Obj, ValueType> = Exclude<
  {
    [K in keyof Obj]: Same<Required<Obj>[K], ValueType> extends true ? K : never
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
 * // Basic usage: match exact type (non-optional property)
 * type A = { a: 1; b: 2; c: 1 };
 * type MatchedKeys = KeysOfExactType<A, 1>; // 'a' | 'c'
 *
 * @example
 * // Key difference: optional property matching (requires undefined in `ValueType`)
 * type B = { a?: string };
 * type MatchWithUndefined = KeysOfExactType<B, string | undefined>; // 'a' (matches complete type)
 * type MatchWithoutUndefined = KeysOfExactType<B, string>; // never (does not match complete type)
 *
 * @example
 * // Edge cases: never/any/unknown
 * type C = { a: never; b: any; c: unknown };
 * type MatchNever = KeysOfExactType<C, never>; // 'a'
 * type MatchAny = KeysOfExactType<C, any>; // 'b'
 * type MatchUnknown = KeysOfExactType<C, unknown>; // 'c'
 */
export type KeysOfExactType<Obj, ValueType> = Exclude<
  { [K in keyof Obj]: Same<Obj[K], ValueType> extends true ? K : never }[keyof Obj],
  undefined
>

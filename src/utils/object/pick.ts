/**
 * Safely picks keys `Key` from type `Obj`, excluding non-existent keys
 *
 * @template Obj - The object type to pick keys from
 * @template Key - The keys to pick from the object
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing'
 *
 * type Result = SafePick<{ a: string; b: number }, 'a' | 'c'>
 * expect<Result>().toBe<{ a: string }>().pass
 * ```
 */
export type SafePick<Obj, Key> = Pick<Obj, Key & keyof Obj>

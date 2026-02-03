/**
 * Append documentation or auxiliary metadata to type `T`
 * without changing its shape.
 *
 * This type intersects `Doc` onto `T`, but only keeps the keys
 * originally defined in `T`. As a result:
 *
 * - `Doc` cannot introduce new properties
 * - Existing properties in `T` are preserved
 * - `Doc` may further constrain or annotate existing properties
 *
 * This is typically used to attach JSDoc comments, branding,
 * or editor-only metadata to an existing type while keeping
 * its public structure intact.
 *
 * @template T - The target type to append documentation to
 * @template Doc - The documentation or metadata type to append
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * type User = { name: string; age: number }
 * type UserWithDoc = AppendDoc<User, { name: string }>
 *
 * expect<UserWithDoc>().toBe<User>().success
 * ```
 */
export type AppendDoc<T, Doc> = Pick<T & Doc, keyof T>

/**
 * Prepend documentation or auxiliary metadata to type `T`
 * without changing its shape.
 *
 * This is similar to {@link AppendDoc}, but the intersection order
 * is reversed (`Doc & T`), which can affect how property types,
 * documentation, and hover information are presented by tooling.
 *
 * In practice, this allows `Doc` to act as a non-invasive,
 * descriptive layer while ensuring `T` remains the authoritative
 * source of truth for property types.
 *
 * @template T - The target type to prepend documentation to
 * @template Doc - The documentation or metadata type to prepend
 *
 * @example
 * ```ts
 * import { expect } from '@leawind/lay-sing/test-utils'
 *
 * type User = { name: string; age: number }
 * type UserWithDoc = PrependDoc<User, { age: number }>
 *
 * expect<UserWithDoc>().toBe<User>().success
 * ```
 */
export type PrependDoc<T, Doc> = Pick<Doc & T, keyof T>

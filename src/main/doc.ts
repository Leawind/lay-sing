/**
 * Append documentation or auxiliary metadata to type `A`
 * without changing its shape.
 *
 * This type intersects `Doc` onto `A`, but only keeps the keys
 * originally defined in `A`. As a result:
 *
 * - `Doc` cannot introduce new properties
 * - Existing properties in `A` are preserved
 * - `Doc` may further constrain or annotate existing properties
 *
 * This is typically used to attach JSDoc comments, branding,
 * or editor-only metadata to an existing type while keeping
 * its public structure intact.
 */
export type AppendDoc<T, Doc> = Pick<T & Doc, keyof T>

/**
 * Prepend documentation or auxiliary metadata to type `A`
 * without changing its shape.
 *
 * This is similar to {@link AppendDoc}, but the intersection order
 * is reversed (`Doc & A`), which can affect how property types,
 * documentation, and hover information are presented by tooling.
 *
 * In practice, this allows `Doc` to act as a non-invasive,
 * descriptive layer while ensuring `A` remains the authoritative
 * source of truth for property types.
 */
export type PrependDoc<T, Doc> = Pick<Doc & T, keyof T>

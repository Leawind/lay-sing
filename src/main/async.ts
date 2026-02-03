/**
 * Represents a value that can be either `T` or a Promise of `T`
 *
 * @template T - The underlying type that may or may not be wrapped in a Promise
 *
 * @example
 * ```ts
 * type StringOrPromise = Awaitable<string>
 * // Equivalent to: string | Promise<string>
 * ```
 */
export type Awaitable<T> = Promise<T> | T

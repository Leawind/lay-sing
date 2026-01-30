/**
 * Represents a value that can be either T or a Promise of T
 */
export type Awaitable<T> = Promise<T> | T

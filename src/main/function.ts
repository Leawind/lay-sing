// deno-lint-ignore no-explicit-any
export type Constructor<R = any, P extends any[] = any[]> = new (...args: P) => R
// deno-lint-ignore no-explicit-any
export type AnyFunction<R = any, P extends any[] = any[]> = (...args: P) => R

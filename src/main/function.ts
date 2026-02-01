/**
 * Represents a function with any parameters and a specific return type
 *
 * @example
 * ```ts
 * type _ = AnyFunction<string, [number]> // (arg: number) => string
 * ```
 */
export type AnyFunction<
  Return = any,
  Params extends any[] = any[],
> = (...args: Params) => Return

/**
 * Represents a constructor with any parameters and a specific return type
 *
 * @example
 * ```ts
 * type _ = Constructor<string, [number]> // new (arg: number) => string
 * ```
 */
export type Constructor<
  Return = any,
  Params extends any[] = any[],
> = new (...args: Params) => Return

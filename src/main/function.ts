/**
 * Represents a function with any parameters and a specific return type
 *
 * @template Return - The return type of the function
 * @template Params - The parameters of the function as a tuple type
 *
 * @example
 * ```ts
 * type NumberToStringFn = AnyFunction<string, [number]>
 * // Equivalent to: (arg: number) => string
 * ```
 */
export type AnyFunction<
  Return = any,
  Params extends any[] = any[],
> = (...args: Params) => Return

/**
 * Represents a constructor function with any parameters and a specific return type
 *
 * @template Return - The type returned by the constructor function
 * @template Params - The parameters of the constructor function as a tuple type
 *
 * @example
 * ```ts
 * type StringConstructor = Constructor<string, [number]>
 * // Equivalent to: new (arg: number) => string
 * ```
 */
export type Constructor<
  Return = any,
  Params extends any[] = any[],
> = new (...args: Params) => Return

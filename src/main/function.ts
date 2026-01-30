// deno-lint-ignore-file no-explicit-any

export type AnyFunction<
  Return = any,
  Params extends any[] = any[],
> = (...args: Params) => Return

export type Constructor<
  Return = any,
  Params extends any[] = any[],
> = new (...args: Params) => Return

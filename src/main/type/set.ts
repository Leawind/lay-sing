/**
 * ## `IntersectOf<[A, B, ... T]>` = `A & B & ... & T`
 *
 * @example
 * ```ts
 * type A = { a: string, b: number };
 * type B = { a: number, c: boolean };
 *
 * type Result = IntersectOf<[A, B]>;
 * type Result = { a: never, b: number, c: boolean }
 * ```
 */
export type IntersectOf<Types extends readonly unknown[]> = Types extends [infer First, ...infer Rest]
  ? First & IntersectOf<Rest>
  : unknown

/**
 * ## `UnionOf<[A, B, ... T]>` = `A | B | ... | T`
 *
 * @example
 * ```ts
 * type A = { a: string, b: number };
 * type B = { a: number, c: boolean };
 *
 * type Result = UnionOf<[A, B]>;
 * type Result = { a: string | number }
 * ```
 */
export type UnionOf<Types extends readonly unknown[]> = Types extends [infer First, ...infer Rest]
  ? First | UnionOf<Rest>
  : never

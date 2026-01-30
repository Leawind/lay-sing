/**
 * ## `IntersectOf<[A, B, ... T]>` = `A & B & ... & T`
 *
 * ### Example
 *
 * ```ts
 * type A = { a: string, b: number };
 * type B = { a: number, c: boolean };
 *
 * type Result = IntersectOf<[A, B]>;
 * type Result = { a: never, b: number, c: boolean }
 * ```
 */
export type IntersectOf<T extends readonly unknown[]> = T extends [infer F, ...infer R] ? F & IntersectOf<R> : unknown

/**
 * ## `UnionOf<[A, B, ... T]>` = `A | B | ... | T`
 *
 * ### Example
 *
 * ```ts
 * type A = { a: string, b: number };
 * type B = { a: number, c: boolean };
 *
 * type Result = UnionOf<[A, B]>;
 * type Result = { a: string | number }
 * ```
 */
export type UnionOf<T extends readonly unknown[]> = T extends [infer F, ...infer R] ? F | UnionOf<R> : never

/**
 * ### Example
 *
 * ```ts
 *  type A = { name: string; gender: string; a: boolean }
 *  type B = { name: string; gender: symbol; b: bigint }
 *
 *  type Result = DiffPropOf<[A, B]>
 *  type Result = {
 *    a: boolean
 *    b: bigint
 *  }
 * ```
 */
export type DiffPropOf<T extends readonly unknown[]> = Omit<IntersectOf<T>, keyof UnionOf<T>>

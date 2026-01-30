/**
 * ### Result
 *
 * - `never`: if `T` is `never`
 * - `boolean`: if `T` is `boolean` or `any`
 * - `false`: if `T` is `true`
 * - `true`: if `T` is `false`
 *
 * ### Examples
 *
 * | `T`       | `Not<T>`  |
 * | --------- | --------- |
 * | `never`   | `never`    |
 * | `true`    | `false`   |
 * | `false`   | `true`    |
 * | `boolean` | `boolean` |
 * | `any`     | `boolean` |
 */
export type Not<T extends boolean> = T extends true ? false
  : T extends false ? true
  : boolean

/**
 * - `never`: if anyone of A,B is `never`
 * - `boolean`: if anyone of A,B is `boolean` or `any`
 * - `true`: if both A,B are `true`
 * - `false`: otherwise
 */
export type And<
  A extends boolean,
  B extends boolean,
> = A extends never ? never
  : [B] extends [never] ? never
  : (A extends true ? (B extends true ? true : false) : false)

/**
 * ### Result
 *
 * - `never`: if anyone of A,B is `never`
 * - `boolean`: if anyone of A,B is `boolean` or `any`
 * - `false`: if both A,B are `false`
 * - `true`: otherwise
 */
export type Or<
  A extends boolean,
  B extends boolean,
> = [A] extends [never] ? never
  : [B] extends [never] ? never
  : [boolean] extends [A] ? boolean
  : [boolean] extends [B] ? boolean
  : true extends A ? true
  : true extends B ? true
  : false

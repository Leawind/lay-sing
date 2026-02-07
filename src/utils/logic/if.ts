/**
 * Conditional type - returns `Yes` if condition `Condition` is true, otherwise returns `No`
 *
 * @template Condition - The boolean condition to check
 * @template Yes - The type to return if condition is true
 * @template No - The type to return if condition is false (defaults to `never`)
 *
 * @example
 * ```ts
 * type Result = If<true, 'yes', 'no'> // 'yes'
 * type Result2 = If<false, 'yes', 'no'> // 'no'
 * type BoolResult = If<boolean, 'yes', 'no'> // boolean
 * ```
 */
export type If<Condition extends boolean, Yes, No = never> = Condition extends true ? Yes : No

/**
 * Conditional type - returns `Yes` if condition `Condition` is false, otherwise returns `No`
 *
 * @template Condition - The boolean condition to check
 * @template Yes - The type to return if condition is false
 * @template No - The type to return if condition is true (defaults to `never`)
 *
 * ### Result
 *
 * - `never`: if `Condition` is `never`
 * - `Yes`: if `Condition` is `false`
 * - `No`: if `Condition` is `true`
 *
 * @example
 * ```ts
 * type Result = IfFalse<false, 'yes', 'no'> // 'yes'
 * type Result2 = IfFalse<true, 'yes', 'no'> // 'no'
 * type BoolResult = IfFalse<boolean, 'yes', 'no'> // boolean
 * ```
 */
export type IfFalse<Condition extends boolean, Yes, No = never> = Condition extends false ? Yes : No

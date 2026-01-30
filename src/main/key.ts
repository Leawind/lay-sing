import type { Same } from './type/index.ts'

export type KeysOfType<T, U> = { [K in keyof T]: Same<T[K], U> extends true ? K : never }[keyof T]
export type KeysOfOtherType<T, U> = Exclude<keyof T, KeysOfType<T, U>>

import type { KeysOfOtherType, KeysOfType } from './key.ts'

export type Access<T, K extends PropertyKey, E = never> = K extends keyof T ? T[K] : E
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequire<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequire<T[P]> : T[P]
}
export type AssertExtends<T, A> = T extends A ? T : never

export type SafePick<T, K> = Pick<T, K & keyof T>

export type PropsOfType<T, U> = Pick<T, KeysOfType<T, U>>
export type PropsOfOtherType<T, U> = Pick<T, KeysOfOtherType<T, U>>

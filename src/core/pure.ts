export type AssertExtends<T, A> = T extends A ? T : never

export type SafePick<T, K> = Pick<T, K & keyof T>

export type Access<T, K extends PropertyKey, E = never> = K extends keyof T ? T[K] : E

export type AppendDoc<A, Doc> = Pick<A & Doc, keyof A>
export type PrependDoc<A, Doc> = Pick<Doc & A, keyof A>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequire<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequire<T[P]> : T[P]
}

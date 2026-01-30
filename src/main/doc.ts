export type AppendDoc<A, Doc> = Pick<A & Doc, keyof A>
export type PrependDoc<A, Doc> = Pick<Doc & A, keyof A>

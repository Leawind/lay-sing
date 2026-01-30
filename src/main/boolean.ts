export type Not<B extends boolean> = B extends true ? false : true
export type And<A extends boolean, B extends boolean> = A extends true ? B extends true ? true : false : false
export type Or<A extends boolean, B extends boolean> = A extends false ? B extends false ? false : true : true
export type Xor<A extends boolean, B extends boolean> = Or<And<A, Not<B>>, And<B, Not<A>>>
export type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>
export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>

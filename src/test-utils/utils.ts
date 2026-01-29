export type Result<B extends true | false, R = void> = B extends true ? {
    /**
     * ## Expect to succeed without type error
     */
    success: R
  }
  : {
    /**
     * ## Expect to fail with type error
     */
    fail: R
  }

export type NoProps = { [K in never]: never }
export type FallbackIfNoKeys<T, Else> = [keyof T] extends [never] ? Else : T

// deno-lint-ignore no-explicit-any
export const NOOP: any = new Proxy(
  function () {
    return NOOP
  },
  {
    get(_, prop) {
      switch (prop) {
        case 'then':
          return undefined
        case 'valueOf':
        case 'toString':
        case Symbol.toPrimitive:
          return () => '[NOOP]'
        default:
          return NOOP
      }
    },
  },
)

/**
 * A universal no-op placeholder implemented via `Proxy`.
 *
 * `NOOP` can be accessed, called, or chained indefinitely without throwing.
 * Every operation returns itself, making it safe to use as a dummy fallback
 * for APIs, optional hooks, or unimplemented interfaces.
 *
 * ### Special behaviors
 *
 * - Callable: invoking `NOOP()` returns `NOOP`
 * - Property access: `NOOP.anything` returns `NOOP`
 * - Promise-safe: `NOOP.then` is `undefined`, so it is not treated as a Promise
 * - Primitive coercion (`toString`, `valueOf`, `Symbol.toPrimitive`) yields
 *   a stable string representation: `"[NOOP]"`
 *
 * This is useful in scenarios where a value is required syntactically but
 * should perform no action and never fail at runtime.
 *
 * @example
 * ```ts
 * NOOP.foo.bar().baz.qux; // safe, returns NOOP
 * String(NOOP); // "[NOOP]"
 * await NOOP; // does not await (not thenable)
 * ```
 */
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
    set: () => true,
    getOwnPropertyDescriptor: () => ({
      configurable: true,
      value: NOOP,
    }),
    getPrototypeOf: () => null,
    has: () => true,
    ownKeys: () => ['prototype'],
  },
)

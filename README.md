| English | [简体中文](./README-zh.md) |
| ------- | -------------------------- |

# `lay-sing`

TypeScript utilities for compile-time type testing and utility types

## What is it

1. **Testing Utilities**

```ts
// They do nothing at runtime
expect<never>().toBe<never>().success
expect<never>().toBeNever // alias for above
expect<never>().toBe<'should fail'>().fail

// Type Error: Property 'success' does not exist on type '{ fail: void; }'.
expect<never>().toBe<'should fail'>().success
//                                    ^^^^^^^
```

1. **Type Manipulation Tools**

```ts
// Result is 'Bob'
type Result = Switch<2, [
  Case<1, 'Alice'>,
  Case<2, 'Bob'>,
  Case<3, 'Charlie'>,
], DefaultCase<'Unknown'>>
```

## Install

> This lib is published to both [NPM](https://www.npmjs.com/package/lay-sing) and [JSR](https://jsr.io/@leawind/lay-sing)

### NPM

```sh
npm i -D lay-sing
```

```ts
import type { Same } from 'lay-sing'
import { expect } from 'lay-sing/test-utils'
```

### Deno (JSR)

```sh
deno add jsr:@leawind/lay-sing
```

```ts
import type { Same } from '@leawind/lay-sing'
import { expect } from '@leawind/lay-sing/test-utils'
```

Or Import directly:

```ts
import type { Same } from 'jsr:@leawind/lay-sing@^0.1'
import { expect } from 'jsr:@leawind/lay-sing@^0.1/test-utils'
```

---

## Usage

### Testing Utilities

```ts
import { compare, expect, NOOP } from 'lay-sing/test-utils'
```

The `test-utils` module provides utilities for **compile-time** type validation. These utilities have **no runtime effect** — they always return a special [`NOOP`](https://jsr.io/@leawind/lay-sing/doc/test-utils/~/NOOP) value that safely supports almost any property access or method call.

A typical type test statement follows this pattern:

```ts
expect<ActualType>().toBe<ExpectedType>().success
```

- It starts with a function call like `expect<T>()` or `compare<T, U>()`
- It ends with a property like `.success` or `.fail`
- A **type error occurs only if the assertion fails**, helping you catch incorrect types at compile time
- At runtime, the function always returns the actual value `NOOP`, which performs **no operation**. It can be accessed, called, or chained indefinitely without throwing

#### Common Usage

```ts
// Exact equality
expect<A>().toBe<B>().success // Passes only if A and B are identical

// Subtype check
expect<A>().toExtend<B>().success // Passes if A extends B

// Property existence
expect<{ name: string }>().toHaveProperty<'name'>().success

// Primitive checks
expect<true>().toBeTrue.success
expect<'hello'>().toExtendString.success

// Type comparison
compare<A, B>().same // Available only if A ≡ B
compare<A, B>().different // Available only if A ≠ B
```

> [!TIP]
>
> There's no need to memorize the full API.
>
> Your editor will show inline documentation and auto-completion for all available methods and properties

#### NOOP

A `Proxy`-based no-op object:

- Most accesses return itself.
- `toString()` returns `"[NOOP]"`.
- Not thenable (`then` is `undefined`).

```ts
NOOP.foo.bar().baz.qux // safe, returns NOOP
String(NOOP) // "[NOOP]"
await NOOP // does not await (not thenable)
```

### Type Tools

The main entry point provides a collection of utility types for common type-level programming tasks. All types are flat-exported from the main entry point — you don’t need to import from deep paths.

```ts
import type { Same } from 'lay-sing'
```

> All types are documented — your editor will show inline documentation on hover

### Examples

```typescript
// Conditional Types
type Result = If<true, 'yes', 'no'> // 'yes'

// Boolean Logic
type IsTrue = And<true, true> // true

// Tuple Manipulation
type Combined = ConcatTuple<[1, 2], [3, 4]> // [1, 2, 3, 4]

// Object Utilities
type PartialObj = DeepPartial<{ a: string; nested: { b: number } }>
// { a?: string; nested?: { b?: number } }
```

> [!NOTE]
>
> [Full API documentation is available on JSR](https://jsr.io/@leawind/lay-sing/doc)

---

> ## _Pronunciation of lay-sing_
>
> _"lay-sing" mimics Mandarin "lèi xíng" ("type") — Say "LAY-sing" with a sharp "LAY" (like a command) followed by a rising "sing" (like a question)._

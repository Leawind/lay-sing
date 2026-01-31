![NPM Version](https://img.shields.io/npm/v/lay-sing?style=flat&logo=npm&label=lay-sing)
[![JSR Version](https://img.shields.io/jsr/v/%40leawind/lay-sing?logo=jsr&label=@leawind%2Flay-sing)](https://jsr.io/@leawind/lay-sing)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Leawind/lay-sing/verify.yaml?logo=github&label=test)

# `lay-sing`

TypeScript utilities for compile-time type testing and utility types

## What is it

### 1. Testing Utilities

```ts
// They do nothing at runtime
expect<never>().toBe<never>().success
expect<never>().toBeNever // alias for the above
expect<never>().toBe<'should fail'>().fail

// Type Error: Property 'success' does not exist on type '{ fail: void; }'.
expect<never>().toBe<'should fail'>().success
//                                    ^^^^^^^
```

### 2. Type Tools

```ts
// Result is true
type Result = Same<boolean, true | false>

// Name is 'Bob'
type Name = Switch<2, [
  Case<1, 'Alice'>,
  Case<2, 'Bob'>,
  Case<3, 'Charlie'>,
], DefaultCase<'Unknown'>>
```

## Install

### [NPM](https://www.npmjs.com/package/lay-sing)

```sh
npm i -D lay-sing
```

```ts
import type { Same } from 'lay-sing'
import { expect } from 'lay-sing/test-utils'
```

> This library is also published to [JSR (`@leawind/lay-sing`)](https://jsr.io/@leawind/lay-sing)

---

## Usage

### Testing Utilities

```ts
import { compare, expect, NOOP } from 'lay-sing/test-utils'
```

The `test-utils` module provides utilities for **compile-time** type validation. These utilities have **no runtime impact** — they always return a special [`NOOP`](https://jsr.io/@leawind/lay-sing/doc/test-utils/~/NOOP) value that safely supports almost any property access or method call.

> [!IMPORTANT]
>
> A typical type test statement follows this pattern:
>
> ```ts
> expect<ActualType>().toBe<ExpectedType>().success
> ```
>
> - It starts with a function call like `expect<T>()` or `compare<T, U>()`
> - It ends with a property like `.success` or `.fail`
> - Type error occurs only if the assertion fails


At runtime, the function always returns the `NOOP` object, which performs **no operation**. It can be accessed, called, or chained indefinitely without throwing errors.

#### Common Usage

```ts
// Exact equality
expect<A>().toBe<B>().success // Passes only if A and B are identical

// Subtype check
expect<A>().toExtend<B>().success // Passes if A extends B

// Property existence
expect<{ name: string }>().toHaveKey<'name'>().success

// Primitive checks
expect<true>().toBeTrue.success
expect<'hello'>().toExtendString.success

// Type comparison
compare<A, B>().same // Available only if A ≡ B
compare<A, B>().different // Available only if A ≠ B
```

> [!TIP]
>
> You only need to remember `expect` and `compare` — all available methods and properties are listed by your editor and fully documented, so there’s no need to memorize them.

#### NOOP

A `Proxy`-based no-op object with the following behavior:

- Most property/method accesses return the NOOP object itself.
- `.toString()`, `.valueOf()` returns string `"[NOOP]"`.
- Not thenable (`then` is `undefined`).

It's used as returned value of `expect()` and `compare()`.

```ts
expect().foo.bar().baz.qux // Safe, returns NOOP
String(NOOP) // "[NOOP]"
await NOOP // Does not await (not thenable)
```

### Type Tools

The main entry point provides a collection of utility types for common type-level programming tasks. All types are flat-exported from the main entry point — no need to import from nested paths.

```ts
import type { Same } from 'lay-sing'
```

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

[Full API documentation is available on JSR](https://jsr.io/@leawind/lay-sing/doc)

[![GitHub License](https://img.shields.io/github/license/Leawind/lay-sing)](https://github.com/Leawind/lay-sing?tab=MIT-1-ov-file)
[![NPM Version](https://img.shields.io/npm/v/lay-sing?style=flat&logo=npm)](https://www.npmjs.com/package/lay-sing)
[![JSR Version](https://jsr.io/badges/@leawind/lay-sing)](https://jsr.io/@leawind/lay-sing)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Leawind/lay-sing/verify.yaml?branch=main&logo=github-actions&label=test)](https://github.com/Leawind/lay-sing/actions/workflows/verify.yaml)

# Lay-Sing

TypeScript utilities for compile-time type testing and utility types

```ts
// They do nothing at runtime
expect<never>().toBe<never>().success
expect<never>().toBeNever // alias for the above
expect<never>().toBe<'should fail'>().fail

// Type Error: Property 'success' does not exist on type '{ fail: void; }'.
expect<never>().toBe<'should fail'>().success
//                                    ^^^^^^^
```

> [!TIP]
>
> I know this library is quite simple and serves a specific purpose, so one of its API design principles is to minimize the cognitive load for users. You just need to remember to **start with an `expect<>()` call** and **end with some property access**. Leave the rest to editor suggestions and inline documentation.

## Install

### [NPM](https://www.npmjs.com/package/lay-sing)

```sh
npm i -D lay-sing
```

```ts
import type { Exact } from 'lay-sing'
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

A typical type test statement follows this pattern:

```ts
expect<ActualType>().toBe<ExpectedType>().success
```

- It starts with a function call like `expect<T>()` or `compare<T, U>()`
- It ends with a property like `.success` or `.fail`
- Type error occurs only if the assertion fails

> [!CAUTION]
>
> Only statements ending with property access are type assertions. Without property access, type error may never occur:
>
> ```diff
> - expect<true>().toBe<false>()         // Type error never occur
> + expect<true>().toBe<false>().success // Type Error: Property 'success' does not exist on type '{ fail: void; }'.
> ```

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

The main entry point provides some utility types for common type-level programming tasks. All types are flat-exported from the main entry point — no need to import from nested paths.

```ts
import type { Exact } from 'lay-sing'
```

### Examples

```typescript
// Test if exactly the same
type False = Exact<{ a: 1 }, { a?: 1 }> // false
type Yes = Exact<boolean, true | false, 'yes', 'no'> // 'yes'

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

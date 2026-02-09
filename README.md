[![GitHub License](https://img.shields.io/github/license/Leawind/lay-sing)](https://github.com/Leawind/lay-sing?tab=MIT-1-ov-file)
[![NPM Version](https://img.shields.io/npm/v/lay-sing?style=flat&logo=npm)](https://www.npmjs.com/package/lay-sing)
[![JSR Version](https://jsr.io/badges/@leawind/lay-sing)](https://jsr.io/@leawind/lay-sing)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Leawind/lay-sing/verify.yaml?branch=main&logo=github-actions&label=test)](https://github.com/Leawind/lay-sing/actions/workflows/verify.yaml)

# Lay-Sing

TypeScript utilities for compile-time type testing and utility types

```ts
// They do nothing at runtime
expect<never>().to.be<never>().pass
expect<never>().to.be.never // alias for the above
expect<never>().to.be<'should fail'>().fail

// Type Error: Property 'pass' does not exist on type '{ fail: void; }'.
expect<never>().to.be<'should fail'>().pass
//                                    ^^^^^^^
```

> [!TIP]
>
> I know this library is quite simple and serves a specific purpose, so one of its API design principles is to minimize the cognitive load for users. You just need to remember to **start with an `expect<>()` call** and **end with some property access**. Leave the rest to editor suggestions and inline documentation.

## Install & Import

<details>
<summary>NPM</summary>

```sh
npm i -D lay-sing
```

```ts
import { expect } from 'lay-sing'
```

</details>

<details>
<summary>Deno</summary>

### From NPM

```sh
deno add npm:lay-sing
```

```ts
import { expect } from 'lay-sing'
```

### From JSR

This library is also published to [JSR (`@leawind/lay-sing`)](https://jsr.io/@leawind/lay-sing)

```sh
deno add @leawind/lay-sing
```

```ts
import { expect } from '@leawind/lay-sing'
```

### From Latest commit

```ts
import { expect } from 'https://raw.githubusercontent.com/Leawind/lay-sing/refs/heads/main/src/main/index.ts'
import { Exact } from 'https://raw.githubusercontent.com/Leawind/lay-sing/refs/heads/main/src/utils/index.ts'
```

</details>

---

## Usage

```ts
import { expect } from 'lay-sing'
```

The main module provides utilities for **compile-time** type validation. These utilities have **no runtime impact** — they always return a special [`NOOP`](https://jsr.io/@leawind/lay-sing/doc/~/NOOP) value that safely supports almost any property access or method call.

A typical type test statement follows this pattern:

```ts
expect<ActualType>().to.be<ExpectedType>().pass
```

- It starts with a function call like `expect<T>()` or `compare<T, U>()`
- It ends with a property like `.pass` or `.fail`
- Type error occurs only if the assertion fails

> [!CAUTION]
>
> Only statements ending with property access are type assertions. Without property access, type error may never occur:
>
> ```diff
> - expect<true>().to.be<false>()         // Type error never occur
> + expect<true>().to.be<false>().pass // Type Error: Property 'pass' does not exist on type '{ fail: void; }'.
> ```

At runtime, the function always returns the `NOOP` object, which performs **no operation**. It can be accessed, called, or chained indefinitely without throwing errors.

#### Common Usage

```ts
// Passes only if A and B are identical
expect<keyof { a: 2 }>().to.be<'a'>().pass

// Passes if A extends B
expect<12138>().to.extend<number>().pass

// Passes if mutually assignable
expect<{ a: 1; b: 2 }>().to.equal<{ a: 1 } & { b: 2 }>().pass

// Test property existence
expect<{ name: string }>().to.haveKey<'name'>().pass
```

Aliases:

```ts
expect<never>().to.be<never>().pass
expect<never>().to.be.never

expect<'hello'>().to.extend<string>().pass
expect<'hello'>().to.extend.string
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

It provides some utility types organized into categories for common type-level programming tasks. These can be imported from the `lay-sing/utils` entry point.

```ts
import type { Exact, Extends, Overlap } from 'lay-sing/utils'
```

### Examples

```typescript
// Import the utility types
import type { ConcatTuple, Exact, If, KeysOfBaseType } from '@leawind/lay-sing/utils'

// Test if exactly the same
type False = Exact<{ a: 1 }, { a?: 1 }> // false
type Yes = Exact<boolean, true | false, 'yes', 'no'> // 'yes'

// Conditional Types
type Result = If<true, 'yes', 'no'> // 'yes'

type FailResult = If<Exact<number, string>, 'yes', 'no'> // 'no'

// Tuple Manipulation
type Combined = ConcatTuple<[1, 2], [3, 4]> // [1, 2, 3, 4]

type UniqueCombined = ConcatUniqueTuple<[1, 2], [2, 3]> // [1, 2, 3]
```

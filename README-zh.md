| [English](./README.md) | 中文 |
| ---------------------- | ---- |

![NPM Version](https://img.shields.io/npm/v/lay-sing?style=flat&logo=npm&label=lay-sing)
[![JSR Version](https://img.shields.io/jsr/v/%40leawind/lay-sing?logo=jsr&label=@leawind%2Flay-sing)](https://jsr.io/@leawind/lay-sing)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Leawind/lay-sing/verify.yaml?logo=github&label=test)

# `lay-sing`

用于编译时类型测试和工具类型的 TypeScript 实用工具

## 这是什么

1. **测试工具**

```ts
// 它们在运行时什么都不做
expect<never>().toBe<never>().success
expect<never>().toBeNever // 上面的别名
expect<never>().toBe<'should fail'>().fail

// 类型错误: 类型 '{ fail: void; }' 上不存在属性 'success'。
expect<never>().toBe<'should fail'>().success
//                                    ^^^^^^^
```

1. **类型操作工具**

```ts
// 结果是 'Bob'
type Result = Switch<2, [
  Case<1, 'Alice'>,
  Case<2, 'Bob'>,
  Case<3, 'Charlie'>,
], DefaultCase<'Unknown'>>
```

## 安装

> 此库同时发布在 [NPM](https://www.npmjs.com/package/lay-sing) 和 [JSR](https://jsr.io/@leawind/lay-sing)

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

或者直接导入：

```ts
import type { Same } from 'jsr:@leawind/lay-sing@^0.1'
import { expect } from 'jsr:@leawind/lay-sing@^0.1/test-utils'
```

---

## 使用方法

### 测试工具

```ts
import { compare, expect, NOOP } from 'lay-sing/test-utils'
```

`test-utils` 模块提供了用于**编译时**类型验证的工具。这些工具**在运行时没有作用** —— 它们总是返回一个特殊的 [`NOOP`](https://jsr.io/@leawind/lay-sing/doc/test-utils/~/NOOP) 值，该值安全地支持几乎任何属性访问或方法调用。

一个典型的类型测试语句遵循以下模式：

```ts
expect<实际类型>().toBe<期望类型>().success
```

- 它以函数调用开始，如 `expect<T>()` 或 `compare<T, U>()`
- 它以访问一个属性结束，如 `.success` 或 `.fail`
- **仅当断言失败时才会发生类型错误**，帮助你在编译时捕获错误的类型
- 在运行时，该函数总是返回实际值 `NOOP`，它执行**无操作**。它可以被访问、调用或无限链接而不会抛出错误

#### 常见用法

```ts
// 精确相等
expect<A>().toBe<B>().success // 仅当 A 和 B 完全相同时通过

// 子类型检查
expect<A>().toExtend<B>().success // 如果 A 继承自 B 则通过

// 属性存在性检查
expect<{ name: string }>().toHaveKey<'name'>().success

// 基本类型检查
expect<true>().toBeTrue.success
expect<'hello'>().toExtendString.success

// 类型比较
compare<A, B>().same // 仅当 A ≡ B 时可用
compare<A, B>().different // 仅当 A ≠ B 时可用
```

> [!TIP]
>
> 无需记忆完整的 API。
>
> 编辑器会显示所有可用方法和属性的内联文档和自动补全。

#### NOOP

一个基于 `Proxy` 的无操作对象：

- 大多数访问返回其自身。
- `toString()` 返回 `"[NOOP]"`。
- 不可等待 (`then` 是 `undefined`)。

```ts
NOOP.foo.bar().baz.qux // 安全，返回 NOOP
String(NOOP) // "[NOOP]"
await NOOP // 不等待（不可等待）
```

### 类型工具

主入口点提供了一系列用于常见类型级编程任务的工具类型。所有类型都从主入口点扁平导出 —— 你不需要从深层路径导入。

```ts
import type { Same } from 'lay-sing'
```

> 所有类型都有文档 —— 编辑器会在悬停时显示内联文档。

### 示例

```typescript
// 条件类型
type Result = If<true, 'yes', 'no'> // 'yes'

// 布尔逻辑
type IsTrue = And<true, true> // true

// 元组操作
type Combined = ConcatTuple<[1, 2], [3, 4]> // [1, 2, 3, 4]

// 对象工具
type PartialObj = DeepPartial<{ a: string; nested: { b: number } }>
// { a?: string; nested?: { b?: number } }
```

> [!NOTE]
>
> [完整的 API 文档位于 JSR](https://jsr.io/@leawind/lay-sing/doc)

---

> ## _lay-sing 的读音_
>
> _lèi xíng_

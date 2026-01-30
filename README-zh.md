| [English](./README.md) | 简体中文 |
| ---------------------- | -------- |
|                        |          |

# `lay-sing`

一个用于编译时类型验证和高级类型操作的测试工具与类型操控工具的集合。

## 这是什么

1. **测试工具集**

```ts
// 它们在运行时不做任何事情
expect<number>().toBe<number>().success
expect<number>().toBe<string>().fail

// 类型错误: 类型 '{ fail: void; }' 上不存在属性 'success'。
expect<number>().toBe<string>().success
```

2. **类型操控工具**

```ts
// 结果是 'Bob'
type Result = Switch<2, [
  Case<1, 'Alice'>,
  Case<2, 'Bob'>,
  Case<3, 'Charlie'>,
], DefaultCase<'Unknown'>>
```

## 安装

(#TODO)

## 测试工具集

`test-utils` 模块提供了用于编译时类型验证的类型级测试工具。

### 类型断言

`expect` 函数提供了一个用于类型级断言的流式 API：

```ts
// 测试两个类型是否完全相同
expect<number>().toBe<number>().success
expect<number>().toBe<string>().fail

// 测试一个类型是否扩展自另一个类型
expect<2>().toExtend<number>().success
expect<2>().toExtend<string>().fail

// 测试类型是否拥有特定属性
expect<{ name: string }>().toHaveProperty<'name'>().success

// 测试原始类型
expect<'hello'>().toExtendString.success
expect<true>().toExtendBoolean.success
```

可用的断言方法：

- `toBe<U>()` - 测试类型是否精确相等
- `toExtend<U>()` - 测试类型是否扩展自另一个类型
- `toProperExtend<U>()` - 测试类型是否真扩展自另一个类型（扩展但不是同一个类型）
- `toHaveProperty<K>()` - 测试类型是否拥有键为 K 的属性
- `toExtendNumber` - 测试类型是否扩展自 Number 原始类型（仅在类型扩展自 number 时可用）
- `toExtendString` - 测试类型是否扩展自 String 原始类型（仅在类型扩展自 string 时可用）
- `toExtendBoolean` - 测试类型是否扩展自 Boolean 原始类型（仅在类型扩展自 boolean 时可用）
- 特定原始类型检查：`toBeAny`, `toBeNever`, `toBeUnknown`, `toBeVoid`, `toBeTrue`, `toBeFalse`

### 类型比较

`compare` 函数允许进行复杂的类型间关系测试：

```ts
// 检查两个类型是否相同
compare<number, number>().same // 可用

// 检查两个类型是否不同
compare<number, string>().different // 可用

// 检查两个类型是否有重叠
compare<4, number>().overlap.different // 可用

// 检查两个类型是否互斥
compare<4, 'abc'>().different.disjoint // 可用

// 检查两个类型是否可以相互赋值
compare<1 | 2, 1 | 2>().mutuallyAssignable // 可用
```

可用的比较方法：

- `same` - 当类型完全相同时可用
- `different` - 当类型不同时可用
- `overlap` - 当类型有部分重叠时可用
- `disjoint` - 当类型完全不重叠时可用
- `mutuallyAssignable` - 当类型可以相互赋值时可用

这些工具对于在编译时验证你的类型定义而创建的类型级测试来说非常宝贵。

### NOOP 占位符

通过 `Proxy` 实现的通用无操作占位符。`NOOP` 可以被访问、调用或无限链接，而不会抛出错误。每次操作都返回其自身，使其可以安全地用作 API 的虚拟回退、可选钩子或未实现接口的占位符。

```ts
NOOP.foo.bar().baz.qux // 安全，返回 NOOP
String(NOOP) // "[NOOP]"
await NOOP // 不会等待（不可等待）
```

## 类型工具

这里是一些类型工具的例子：

### 条件类型

```typescript
type Result = If<true, 'yes', 'no'> // 'yes'
type Conditional = If<boolean, 'yes', 'no'> // 'yes' | 'no'
```

### 布尔运算

```typescript
type IsTrue = And<true, true> // true
type IsFalse = And<true, false> // false
type Either = Or<true, false> // true
type Negation = Not<true> // false
```

### 数组/元组操作

```typescript
type Combined = ConcatTuple<[1, 2], [3, 4]> // [1, 2, 3, 4]
type UniqueCombined = ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]> // [1, 2, 3, 4]
type HasElement = TupleIncludes<[1, 2, 3], 2> // true
```

### 对象操作

```typescript
type PartialObj = DeepPartial<{ a: string; nested: { b: number } }> // { a?: string; nested?: { b?: number } }
type PickedProps = PropsOfType<{ a: string; b: number; c: string }, string> // { a: string; c: string }
```

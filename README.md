|         |                            |
| ------- | -------------------------- |
| English | [简体中文](./README-zh.md) |

# `lay-sing`

A collection of testing utilities and type manipulation tools for compile-time type validation and advanced type operations.

## What is it

1. **Testing Utilities**

```ts
// They do nothing at runtime
expect<number>().toBe<number>().success
expect<number>().toBe<string>().fail

// Type error: Property 'success' does not exist on type '{ fail: void; }'.
expect<number>().toBe<string>().success
```

2. **Type Manipulation Tools**

```ts
// Result is 'Bob'
type Result = Switch<2, [
  Case<1, 'Alice'>,
  Case<2, 'Bob'>,
  Case<3, 'Charlie'>,
], DefaultCase<'Unknown'>>
```

## Install

(#TODO)

## Testing Utilities

The `test-utils` module provides type-level testing utilities for compile-time type validation.

### Type Expectations

The `expect` function provides a fluent API for type-level assertions:

```ts
// Test if two types are identical
expect<number>().toBe<number>().success
expect<number>().toBe<string>().fail

// Test if one type extends another
expect<2>().toExtend<number>().success
expect<2>().toExtend<string>().fail

// Test if type has a specific property
expect<{ name: string }>().toHaveProperty<'name'>().success

// Test primitive types
expect<'hello'>().toExtendString.success
expect<true>().toExtendBoolean.success
```

Available assertion methods:

- `toBe<U>()` - Tests exact type equality
- `toExtend<U>()` - Tests if type extends another
- `toProperExtend<U>()` - Tests if type properly extends another (extends but is not the same)
- `toHaveProperty<K>()` - Tests if type has a property with key K
- `toExtendNumber` - Tests if type extends the Number primitive (available only when type extends number)
- `toExtendString` - Tests if type extends the String primitive (available only when type extends string)
- `toExtendBoolean` - Tests if type extends the Boolean primitive (available only when type extends boolean)
- Specific primitive type checks: `toBeAny`, `toBeNever`, `toBeUnknown`, `toBeVoid`, `toBeTrue`, `toBeFalse`

### Type Comparisons

The `compare` function allows for sophisticated type-to-type relationship testing:

```ts
// Check if two types are the same
compare<number, number>().same // Available

// Check if two types are different
compare<number, string>().different // Available

// Check if two types overlap
compare<4, number>().overlap.different // Available

// Check if two types are disjoint
compare<4, 'abc'>().different.disjoint // Available

// Check if two types are mutually assignable
compare<1 | 2, 1 | 2>().mutuallyAssignable // Available
```

Available comparison methods:

- `same` - Available when types are exactly the same
- `different` - Available when types are different
- `overlap` - Available when types have some overlap
- `disjoint` - Available when types have no overlap
- `mutuallyAssignable` - Available when types are mutually assignable

These utilities are invaluable for creating type-level tests that validate your type definitions at compile time.

### NOOP Placeholder

A universal no-op placeholder implemented via `Proxy`. `NOOP` can be accessed, called, or chained indefinitely without throwing. Every operation returns itself, making it safe to use as a dummy fallback for APIs, optional hooks, or unimplemented interfaces.

```ts
NOOP.foo.bar().baz.qux // safe, returns NOOP
String(NOOP) // "[NOOP]"
await NOOP // does not await (not thenable)
```

## Type Tools

Here are some of type tools:

### Conditional Types

```typescript
type Result = If<true, 'yes', 'no'> // 'yes'
type Conditional = If<boolean, 'yes', 'no'> // 'yes' | 'no'
```

### Boolean Operations

```typescript
type IsTrue = And<true, true> // true
type IsFalse = And<true, false> // false
type Either = Or<true, false> // true
type Negation = Not<true> // false
```

### Array/Tuple Operations

```typescript
type Combined = ConcatTuple<[1, 2], [3, 4]> // [1, 2, 3, 4]
type UniqueCombined = ConcatUniqueTuple<[1, 2, 3], [2, 3, 4]> // [1, 2, 3, 4]
type HasElement = TupleIncludes<[1, 2, 3], 2> // true
```

### Object Manipulation

```typescript
type PartialObj = DeepPartial<{ a: string; nested: { b: number } }> // { a?: string; nested?: { b?: number } }
type PickedProps = PropsOfType<{ a: string; b: number; c: string }, string> // { a: string; c: string }
```

## Name

The name "lay-sing" (pronounced /leɪ sɪŋ/) is phonetically similar to the Chinese word "类型" (pinyin: lèi xíng), which translates to "type" in English.

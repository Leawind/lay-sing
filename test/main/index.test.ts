import { assertEquals, assertStrictEquals } from '@std/assert'
import { NOOP } from '@leawind/lay-sing'

Deno.test('Test NOOP', async (t) => {
  await t.step('call / new', () => {
    // Call
    assertStrictEquals(NOOP, NOOP())
    assertStrictEquals(NOOP, NOOP().foo())
    assertStrictEquals(NOOP, NOOP().foo().bar())

    // Mixed
    assertStrictEquals(NOOP, NOOP().foo)
    assertStrictEquals(NOOP, NOOP().foo.bar())
    assertStrictEquals(NOOP, NOOP().foo.bar().baz)

    assertStrictEquals(NOOP, NOOP.foo())
    assertStrictEquals(NOOP, NOOP.foo().bar)
    assertStrictEquals(NOOP, NOOP.foo().bar.baz())

    assertStrictEquals(NOOP, new NOOP())
  })

  await t.step('Object.*, Reflect.*', () => {
    // defineProperty
    {
      Object.defineProperty(NOOP, 'foo', {
        value: NOOP,
        writable: true,
        enumerable: true,
        configurable: true,
      })
      assertStrictEquals(NOOP, NOOP.foo)
    }
    // delete
    {
      delete NOOP.foo
      assertStrictEquals(NOOP, NOOP.foo)
    }
    // getOwnPropertyDescript
    assertStrictEquals(NOOP, Object.getOwnPropertyDescriptor(NOOP, 'foo')!.value)
    // getPrototypeOf
    assertStrictEquals(Object.getPrototypeOf(NOOP), null)

    // has
    assertStrictEquals('foo' in NOOP, true)

    // isExtensible
    assertStrictEquals(Object.isExtensible(NOOP), true)

    // ownKeys
    assertEquals(Reflect.ownKeys(NOOP), ['prototype'])

    // setPrototypeOf
    Object.setPrototypeOf(NOOP, Object.prototype)
    assertStrictEquals(Object.getPrototypeOf(NOOP), null)

    // preventExtensions
    Object.preventExtensions(NOOP)
    NOOP.foo = 123
    assertStrictEquals(Object.isExtensible(NOOP), false)
  })

  await t.step('get', async () => {
    // Property access
    assertStrictEquals(NOOP, NOOP.foo)
    assertStrictEquals(NOOP, NOOP.foo.bar)
    assertStrictEquals(NOOP, NOOP.foo.bar.baz)

    // Async
    assertStrictEquals(NOOP, await NOOP)
  })

  await t.step('set', () => {
    NOOP.foo = '.foo'
    NOOP.foo.bar = '.foo.bar'
    NOOP.foo.bar.baz = '.foo.bar.baz'

    NOOP.toString = '.toString'
    NOOP.valueOf = '.valueOf'
    NOOP.then = '.then'
  })

  await t.step('special property', () => {
    assertStrictEquals(NOOP.then, undefined)

    assertStrictEquals(NOOP.toString(), '[NOOP]')
    assertStrictEquals(NOOP.valueOf(), '[NOOP]')
    assertStrictEquals(NOOP[Symbol.toPrimitive](), '[NOOP]')
  })
})

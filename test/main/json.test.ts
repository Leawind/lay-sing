import { expect } from '@leawind/lay-sing/test-utils'
import type { Jsonable, JsonArray, JsonObject, JsonPrimitive, JsonValue } from '@leawind/lay-sing'

expect<JsonPrimitive>().toBe<string | number | boolean | null>().success
expect<JsonArray>().toBe<JsonValue[]>().success
expect<JsonObject>().toBe<{ [key: string]: JsonValue }>().success
expect<JsonValue>().toBe<JsonPrimitive | JsonArray | JsonObject>().success
expect<Jsonable>().toBe<
  string | number | boolean | null | Jsonable[] | { [key: string]: Jsonable }
>().success

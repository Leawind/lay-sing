import { expect } from '../../src/test-utils.ts'
import type { Jsonable, JsonArray, JsonObject, JsonPrimitive, JsonValue } from '../../src/main/json.ts'

expect<JsonPrimitive>().toBe<string | number | boolean | null>().success
expect<JsonArray>().toBe<JsonValue[]>().success
expect<JsonObject>().toBe<{ [key: string]: JsonValue }>().success
expect<JsonValue>().toBe<JsonPrimitive | JsonArray | JsonObject>().success
expect<Jsonable>().toBe<
  string | number | boolean | null | Jsonable[] | { [key: string]: Jsonable }
>().success

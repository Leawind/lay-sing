/**
 * Primitive values allowed by the JSON specification.
 *
 * This represents the set of non-object, non-array values
 * that can appear in valid JSON data.
 */
export type JsonPrimitive = string | number | boolean | null

/**
 * A JSON array.
 *
 * Each element of the array must itself be a valid `JsonValue`.
 */
export type JsonArray = JsonValue[]

/**
 * A JSON object.
 *
 * Keys are strings, and values must be valid `JsonValue`s.
 * This mirrors the object structure defined by the JSON specification.
 */
export type JsonObject = { [key: string]: JsonValue }

/**
 * Any valid JSON value.
 *
 * This is a strict representation of JSON data, suitable for
 * describing the result of `JSON.parse`, serialized payloads,
 * or schema-level JSON structures.
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonObject

/**
 * A JavaScript value that can be safely serialized to JSON.
 *
 * Unlike `JsonValue`, this type represents values *before*
 * serialization, describing the set of recursive structures
 * that `JSON.stringify` can handle.
 *
 * This is useful for constraining inputs that are expected to
 * be JSON-serializable, rather than already being JSON data.
 */
export type Jsonable =
  | string
  | number
  | boolean
  | null
  | Jsonable[]
  | { [key: string]: Jsonable }

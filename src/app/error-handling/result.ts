/**
 * Object returned by an operation which might fail, containing either the successful return value
 * and a `null` error or an `undefined` value and a non-`null` error. Returning this object instead
 * of try-catching is preferred due to
 * [the unrestricted nature of JavaScript and TypeScript errors](https://meowbark.dev/Better-error-handling).
 */
export type Result<Value> = [Value, Error | null]

/**
 * Produces a {@link Result} containing the given {@link value} in case it corresponds to one which
 * is not `null`; else, provides an error stating that such requirement was not satisfied.
 *
 * Calling this function is preferred even when the goal is to merely guarantee that a value is
 * non-`null`, given that it imposes the responsability of dealing such scenario in which the value
 * is absent on the accessor, enforcing clearer error handling and reflecting the possibility of an
 * error occurring into the call chain.
 *
 * For example, instead of
 *
 * ```ts
 * function add(a: number, b?: number) {
 *   return a + b!
 * }
 * ```
 *
 * prefer unwrapping `b` with the {@link Result} API:
 *
 * ```ts
 * function add(a: number, b?: number): Result<NonNullable<number>> {
 *   const [unwrappedB, error] = unwrapped(b, 'b')
 *   if (error) return failure(error)
 *   return success(unwrappedB)
 * }
 * ```
 *
 * @param name Description of the {@link value}. Ideally, equals to the text of the access to the
 *             {@link value} at the call site.
 * @param value Object required to be defined and non-`null`.
 */
export function unwrap<Value>(value: Value, name?: string): Result<NonNullable<Value>> {
  if (value == null)
    return failure(Error(`${name ? `\`${name}\`` : 'Value'} is required but is ${value}.`))
  return [value, null]
}

/**
 * Produces a {@link Result} of an operation which has failed unrecoverably.
 *
 * @param error {@link Error} because of which the failure occurred.
 * @see success
 */
export function failure<Value>(error: Error): Result<NonNullable<Value>> {
  return [undefined as never, error]
}

/**
 * Produces a {@link Result} of an operation which has completed without errors of unfeasible or
 * impossible recovery.
 *
 * @param value Value returned by the conclusion.
 * @see failure
 */
export function success<Value>(value: NonNullable<Value>): Result<NonNullable<Value>> {
  return [value, null]
}

import { describe, expect, test } from 'vitest'
import { failure, success, unwrap } from './result'

describe('Success', () => {
  test('Value of a successful result is that which has been passed in', () => {
    const expectedValue = {}
    const [actualValue] = success(expectedValue)
    expect(actualValue).toStrictEqual(expectedValue)
  })
  test('Error of a successful result is null', () => {
    const [, error] = success(0)
    expect(error).toBeNull()
  })
})

describe('Failure', () => {
  test('Value of a failed result is undefined', () => {
    const [value] = failure(Error())
    expect(value).toBeUndefined()
  })
  test('Error of a failed result is that which has been passed in', () => {
    const expectedError = Error()
    const [, actualError] = failure(expectedError)
    expect(actualError).toStrictEqual(expectedError)
  })
})

describe('Unwrapping', () => {
  test('Errors when unwrapping an undefined value', () => {
    const [, error] = unwrap(undefined, 'value')
    expect(error).toHaveProperty('message', '`value` is required but is undefined.')
  })
  test('Errors when unwrapping a null value', () => {
    const [, error] = unwrap(null, 'value')
    expect(error).toHaveProperty('message', '`value` is required but is null.')
  })
})

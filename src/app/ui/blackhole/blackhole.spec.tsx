import { render, RenderResult, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BlackholeClient from './blackhole-client'
import { unwrap } from '@/app/error-handling/result'

describe('Blackhole', () => {
  let renderer: RenderResult
  let canvas: HTMLCanvasElement
  beforeEach(async () => {
    renderer = render(<BlackholeClient />)
    await waitFor(() => canvas = truthy(renderer.container.querySelector('canvas')))
  })
  it('Clears canvas upon unmount', () => {
    const context = truthy(canvas.getContext('2d'))
    const canvasClearRectSpy = vi.spyOn(context, 'clearRect')
    renderer.unmount()
    expect(canvasClearRectSpy).toHaveBeenCalledExactlyOnceWith(0, 0, canvas.width, canvas.height)
  })
  afterEach(() => {
    renderer.unmount()
    vi.restoreAllMocks()
  })
})

/**
 * Defines a Vitest expectation for the "truthiness" of this value, returning it afterwards with a
 * non-`null` type.
 */
function truthy<Value>(value: Value): NonNullable<Value> {
  const [unwrappedValue, error] = unwrap(value, 'value')
  expect(value, error?.message).toBeTruthy()
  return unwrappedValue
}

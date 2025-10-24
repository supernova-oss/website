import { render, RenderResult, waitFor } from '@testing-library/react'
import { afterEach, assert, beforeEach, describe, expect, it, vi } from 'vitest'
import BlackholeClient from './blackhole-client'

describe('Blackhole', () => {
  const defaultGetContext = HTMLCanvasElement.prototype.getContext
  let renderer: RenderResult
  let canvas: HTMLCanvasElement
  beforeEach(async () => {
    renderer = render(<BlackholeClient />)
    await waitFor(() => {
      const _canvas = renderer.container.querySelector('canvas')
      expect(_canvas).toBeTruthy()
      assert(_canvas)
      canvas = _canvas
    })
    HTMLCanvasElement.prototype.getContext = () => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        clearRect: (_x: number, _y: number, _w: number, _h: number) => {}
      } as unknown as never
    }
  })
  it('Clears canvas upon unmount', async () => {
    const context = truthy(canvas.getContext('2d'))
    const canvasClearRectSpy = vi.spyOn(context, 'clearRect')
    renderer.unmount()
    expect(canvasClearRectSpy).toHaveBeenCalledExactlyOnceWith(0, 0, canvas.width, canvas.height)
  })
  afterEach(() => {
    renderer.unmount()
    HTMLCanvasElement.prototype.getContext = defaultGetContext
    vi.restoreAllMocks()
  })
})

/**
 * Defines a Vitest expectation for the "truthiness" of this value, returning it afterwards with a
 * non-null type.
 */
function truthy<Value>(value: Value): NonNullable<Value> {
  expect(value).toBeTruthy()
  assert(value)
  return value
}

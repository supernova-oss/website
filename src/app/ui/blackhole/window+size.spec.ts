import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useWindowSize } from './window+size'

describe('useWindowSize', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 512)
    vi.stubGlobal('innerHeight', 256)
  })
  it('Gets current size of window', () => {
    const { result } = renderHook(useWindowSize)
    expect(result.current).toStrictEqual({ width: 512, height: 256 })
  })
  it('Updates gotten size of window when the window gets resized', () => {
    const { result } = renderHook(useWindowSize)
    act(() => {
      vi.stubGlobal('innerWidth', 256)
      vi.stubGlobal('innerHeight', 512)
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toStrictEqual({ width: 256, height: 512 })
  })
  it('Removes listener from window upon unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(useWindowSize)
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledExactlyOnceWith('resize', expect.any(Function))
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })
})

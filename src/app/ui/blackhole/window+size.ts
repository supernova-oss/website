'use client'

import { useEffect, useState } from 'react'

/** 2D dimensions of an element of the UI. */
type Size = { width: number; height: number }

/** Effect by which the size of the window is provided and updated according to eventual changes. */
export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState(getSize)

  function onResize() {
    setWindowSize(getSize())
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })
  return windowSize
}

/** Obtains the current size of the window as a {@link Size}. */
function getSize(): Size {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

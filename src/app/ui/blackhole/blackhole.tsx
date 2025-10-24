'use client'

import { useEffect, useRef } from 'react'
import { useWindowSize } from './window+size'

export default function Blackhole() {
  const windowSize = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (canvas == null || context == null) return
    canvas.width = windowSize.width
    canvas.height = windowSize.height
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'white'
    return () => context.clearRect(0, 0, canvas.width, canvas.height)
  }, [canvasRef, windowSize])
  return <canvas ref={canvasRef} />
}

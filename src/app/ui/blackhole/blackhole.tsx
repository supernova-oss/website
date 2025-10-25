'use client'

import { JSX, useEffect, useRef } from 'react'
import { useWindowSize } from './window+size'
import { unwrap } from '@/app/error-handling/result'

export default function Blackhole(): JSX.Element {
  const windowSize = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const [canvas, canvasError] = unwrap(canvasRef.current, 'canvasRef.current')
    if (canvasError) throw canvasError
    const [context, contextError] = unwrap(canvas.getContext('2d'), "canvas.getContext('2d')")
    if (contextError) throw contextError
    canvas.width = windowSize.width
    canvas.height = windowSize.height
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    return () => context.clearRect(0, 0, canvas.width, canvas.height)
  }, [windowSize, canvasRef])
  return <canvas ref={canvasRef} />
}

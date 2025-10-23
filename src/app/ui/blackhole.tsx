'use client'

import {useEffect, useRef} from 'react'

export default function Blackhole() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (context == null) return
  })
  return <canvas ref={canvasRef} />
}

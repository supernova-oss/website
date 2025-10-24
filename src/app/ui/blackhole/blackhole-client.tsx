'use client'

import dynamic from 'next/dynamic'

const Blackhole = dynamic(() => import('./blackhole'), { ssr: false })

export default function BlackholeClient() {
  return <Blackhole />
}

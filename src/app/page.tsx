import { Metadata } from 'next'
import BlackholeClient from './ui/blackhole/blackhole-client'

export const metadata: Metadata = {
  title: 'Supernova'
}

export default function AppPage() {
  return <BlackholeClient />
}

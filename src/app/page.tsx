import {Metadata} from 'next'
import Blackhole from './ui/blackhole'

export const metadata: Metadata = {
  title: 'Supernova'
}

export default function AppPage() {
  return <Blackhole />
}

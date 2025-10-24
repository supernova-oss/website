import './global.css'
import React from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='end'>
      <body>{children}</body>
    </html>
  )
}

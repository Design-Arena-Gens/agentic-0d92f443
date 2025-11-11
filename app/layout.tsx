import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Calling Automation',
  description: 'N8N-style automation workflow for AI calling system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

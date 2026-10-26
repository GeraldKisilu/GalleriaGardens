import React from 'react'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './styles.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const serif = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['500', '600', '700'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Galleria Gardens',
  description: 'Luxury gated villas and resident services off Langata Road, Nairobi.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} min-h-screen bg-white text-slate-950 antialiased`}>
        <div id="root" tabIndex={-1}>
          {children}
        </div>
      </body>
    </html>
  )
}

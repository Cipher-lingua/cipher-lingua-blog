import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cipher Lingua - Saudi Language & Culture Blog',
  description: 'Exploring the rich linguistic heritage and cultural traditions of Saudi Arabia through in-depth articles, analysis, and insights.',
  keywords: 'Saudi Arabia, Arabic language, Saudi culture, linguistics, Middle East culture',
  authors: [{ name: 'Cipher Lingua' }],
  openGraph: {
    title: 'Cipher Lingua - Saudi Language & Culture Blog',
    description: 'Exploring the rich linguistic heritage and cultural traditions of Saudi Arabia',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cipher Lingua - Saudi Language & Culture Blog',
    description: 'Exploring the rich linguistic heritage and cultural traditions of Saudi Arabia',
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

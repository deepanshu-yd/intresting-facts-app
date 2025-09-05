import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Factly - AI-Powered Fact Discovery',
  description: 'Discover fascinating facts about any topic with AI-powered precision. Get instant, accurate information in seconds.',
  keywords: ['facts', 'AI', 'knowledge', 'learning', 'discovery', 'information'],
  authors: [{ name: 'Factly Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#0a0a0a',
          colorText: '#ffffff',
          colorTextSecondary: '#a1a1a1',
          colorNeutral: '#111111',
          colorShimmer: '#1a1a1a'
        }
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
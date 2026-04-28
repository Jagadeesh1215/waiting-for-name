import type { Metadata } from 'next'
import { Playfair_Display, Sora, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'yodhaMedia | Digital Growth Agency',
  description:
    'yodhaMedia — Digital marketing solutions built for healthcare professionals and modern businesses. SEO, Social Media, Content Marketing, Brand Strategy.',
  keywords: ['digital marketing', 'healthcare marketing', 'SEO', 'social media', 'yodhaMedia'],
  openGraph: {
    title: 'yodhaMedia | Digital Growth Agency',
    description: 'Digital growth for the modern age.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${sora.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

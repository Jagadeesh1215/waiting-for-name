import type { Metadata } from 'next'
import { Playfair_Display, Sora, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'YodhaMedia | Premium Healthcare Marketing Agency',
    template: '%s | YodhaMedia',
  },
  description:
    'YodhaMedia — Premium digital marketing solutions built for hospitals, doctors, clinics, and modern businesses in India. Expert SEO, Social Media, Content Marketing, Brand Strategy, ORM and Web Design.',
  keywords: [
    'digital marketing', 'healthcare marketing', 'hospital marketing',
    'doctor marketing', 'clinic marketing', 'SEO', 'social media management',
    'content marketing', 'brand strategy', 'online reputation management',
    'web design', 'influencer marketing', 'YodhaMedia', 'India',
  ],
  openGraph: {
    title: 'YodhaMedia | Premium Healthcare Marketing Agency',
    description: 'Premium digital marketing for healthcare professionals and modern businesses in India.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YodhaMedia | Premium Healthcare Marketing Agency',
    description: 'Premium digital marketing for healthcare and modern businesses.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${sora.variable} ${dmSans.variable} ${spaceMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0d0a1e" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

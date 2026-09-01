import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gulffiber.co'),
  title: 'Gulf Fiber Company (PVT) Limited — Premium Fiber Manufacturer',
  description: 'Pakistan\'s leading manufacturer of recycled polyester staple fiber, conjugate fiber, non-woven felt, and hollow fiber since 1999. GRS certified, ISO 9001.',
  applicationName: 'Gulf Fiber',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Gulf Fiber Company (PVT) Limited',
    description: 'Premier manufacturer of recycled polyester staple fiber, thermal-bonded wadding, and non-woven felts in Pakistan since 1999.',
    url: 'https://www.gulffiber.co',
    siteName: 'Gulf Fiber Company',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Gulf Fiber Company Logo Emblem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gulf Fiber Company (PVT) Limited',
    description: 'Premier manufacturer of recycled polyester staple fiber, thermal-bonded wadding, and non-woven felts in Pakistan since 1999.',
    images: ['/icon-512.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.gulffiber.co/#organization',
    name: 'Gulf Fiber Company (PVT) Limited',
    alternateName: ['Gulf Fiber', 'Gulf Fiber Company', 'Gulf Fibre', 'Gulffiber'],
    url: 'https://www.gulffiber.co',
    logo: 'https://www.gulffiber.co/icon-512.png',
    image: 'https://www.gulffiber.co/icon-512.png',
    description: "Pakistan's leading manufacturer of recycled polyester staple fiber, conjugate fiber, non-woven felt, and hollow fiber since 1999. GRS certified, ISO 9001:2015.",
    foundingDate: '1999',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '32-KM Sheikhupura Road',
      addressLocality: 'Faisalabad',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-300-8651666',
      contactType: 'sales and customer service',
      areaServed: ['PK', 'Global'],
      availableLanguage: ['English', 'Urdu'],
    },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.gulffiber.co/#website',
    url: 'https://www.gulffiber.co',
    name: 'Gulf Fiber Company (PVT) Limited',
    alternateName: ['Gulf Fiber', 'Gulf Fibre', 'Gulffiber'],
    publisher: {
      '@id': 'https://www.gulffiber.co/#organization',
    },
    inLanguage: 'en',
  }

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

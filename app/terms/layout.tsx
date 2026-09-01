import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Terms & Conditions & Copyright Notice — Gulf Fiber Company'
const description =
  'Commercial supply terms, specification tolerances, shipping & delivery, intellectual property rights, and copyright policy for Gulf Fiber Company (PVT) Limited.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title,
    description,
    url: '/terms',
    siteName: 'Gulf Fiber Company',
    images: ['/icon-512.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/icon-512.png'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: 'https://www.gulffiber.co/terms' },
  ],
}

/**
 * Route layout for /terms.
 */
export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}

import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Contact & Enquiries - Gulf Fiber Company (PVT) Limited'
const description =
  'Send a specification, request a sample, or open a commercial enquiry with Gulf Fiber Company (PVT) Limited, Pakistan.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title,
    description,
    url: '/contact',
    siteName: 'Gulf Fiber Company',
    images: ['/images/hero-loom.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/hero-loom.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.gulffiber.co/contact' },
  ],
}

/**
 * Route layout for /contact.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function ContactLayout({ children }: { children: React.ReactNode }) {
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

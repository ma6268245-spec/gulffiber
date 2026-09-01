import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Quality & Compliance - ISO 9001:2015, GRS, OEKO-TEX Standard 100'
const description =
  'Certified quality management, in-house tensile and moisture verification, and a Certificate of Analysis with every consignment.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/quality',
  },
  openGraph: {
    title,
    description,
    url: '/quality',
    siteName: 'Gulf Fiber Company',
    images: ['/images/quality-lab.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/quality-lab.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Quality & Compliance', item: 'https://www.gulffiber.co/quality' },
  ],
}

/**
 * Route layout for /quality.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function QualityLayout({ children }: { children: React.ReactNode }) {
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

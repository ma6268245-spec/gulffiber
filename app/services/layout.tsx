import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Manufacturing & Services - Gulf Fiber Company (PVT) Limited'
const description =
  'Custom denier and cut-length specification, in-house testing, 200–300 kg moisture-sealed baling, and export documentation prepared in-house.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title,
    description,
    url: '/services',
    siteName: 'Gulf Fiber Company',
    images: ['/images/factory-loom-machinery.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/factory-loom-machinery.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.gulffiber.co/services' },
  ],
}

/**
 * Route layout for /services.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
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

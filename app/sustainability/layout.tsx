import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Sustainability - Recycled Polyester Under GRS Chain of Custody'
const description =
  'Regenerated polyester staple fiber produced from 100% post-consumer PET under Global Recycled Standard chain of custody.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/sustainability',
  },
  openGraph: {
    title,
    description,
    url: '/sustainability',
    siteName: 'Gulf Fiber Company',
    images: ['/images/process-fiber.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/process-fiber.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Sustainability', item: 'https://www.gulffiber.co/sustainability' },
  ],
}

/**
 * Route layout for /sustainability.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function SustainabilityLayout({ children }: { children: React.ReactNode }) {
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

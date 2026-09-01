import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Company - Gulf Fiber Company (PVT) Limited'
const description =
  'Polyester fiber manufacturer established in Pakistan in 1999. 15,000 T annual production capacity, 250+ people, 350+ customers across spinning, wadding and nonwoven conversion.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/company',
  },
  openGraph: {
    title,
    description,
    url: '/company',
    siteName: 'Gulf Fiber Company',
    images: ['/images/workshop-factory.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/workshop-factory.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Company', item: 'https://www.gulffiber.co/company' },
  ],
}

/**
 * Route layout for /company.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
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

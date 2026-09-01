import type { Metadata } from 'next'
import '@/styles/subpage.css'

const title = 'Gallery - The Gulf Fiber Visual Archive'
const description =
  'The visual archive of Gulf Fiber: factory, materials, manufacturing, products, quality, people and sustainability - real photographs where the record holds them, labelled frames where it does not.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title,
    description,
    url: '/gallery',
    siteName: 'Gulf Fiber Company',
    images: ['/images/gallery-hero.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/gallery-hero.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Gallery', item: 'https://www.gulffiber.co/gallery' },
  ],
}

/**
 * Route layout for /gallery, following the same pattern as the other
 * subpages: metadata + the scoped subpage stylesheet, nothing else.
 */
export default function GalleryLayout({ children }: { children: React.ReactNode }) {
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

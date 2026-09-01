import type { Metadata } from 'next'
import { PRODUCT_LINES } from '@/lib/data/company'
import '@/styles/subpage.css'

const title = 'Products - Polyester Staple Fibre, Wadding, Felt & Interlinings'
const description =
  'Regenerated solid and conjugate hollow polyester staple fibre (1.2D to 60D), high-loft thermal wadding, needle-punched felts, and woven and nonwoven interlinings.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title,
    description,
    url: '/products',
    siteName: 'Gulf Fiber Company',
    images: ['/images/fiber-production-line.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/fiber-production-line.jpg'],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gulffiber.co/' },
    { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.gulffiber.co/products' },
  ],
}

// Product catalogue schema built from the same verified product data the page
// renders (lib/data/company.ts) — names, factual descriptions, categories and
// existing product images only. No prices, offers, reviews or ratings.
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Gulf Fiber Product Range',
  itemListElement: PRODUCT_LINES.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.title,
      description: product.positioning,
      category: product.subtitle,
      brand: {
        '@type': 'Brand',
        name: 'Gulf Fiber',
      },
      manufacturer: {
        '@id': 'https://www.gulffiber.co/#organization',
      },
      ...(product.image
        ? { image: `https://www.gulffiber.co${encodeURI(product.image)}` }
        : {}),
    },
  })),
}

/**
 * Route layout for /products.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {children}
    </>
  )
}

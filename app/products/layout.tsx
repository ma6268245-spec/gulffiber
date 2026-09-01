import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Products - Polyester Staple Fiber, Wadding, Felt & Interlinings',
  description:
    'Regenerated solid and conjugate hollow polyester staple fiber (1.2D to 60D), high-loft thermal wadding, needle-punched felts, and woven and nonwoven interlinings.',
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
  return <>{children}</>
}

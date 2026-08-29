import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Quality & Compliance - ISO 9001:2015, GRS, OEKO-TEX Standard 100',
  description:
    'Certified quality management, in-house tensile and moisture verification, and a Certificate of Analysis with every consignment.',
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
  return <>{children}</>
}

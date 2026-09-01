import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Company - Gulf Fiber Company (PVT) Limited',
  description:
    'Polyester fibre manufacturer established in Pakistan in 1999. 15,000 T annual production capacity, 250+ people, 350+ customers across spinning, wadding and nonwoven conversion.',
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
  return <>{children}</>
}

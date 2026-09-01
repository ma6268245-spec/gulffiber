import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Sustainability - Recycled Polyester Under GRS Chain of Custody',
  description:
    'Regenerated polyester staple fiber produced from 100% post-consumer PET under Global Recycled Standard chain of custody.',
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
  return <>{children}</>
}

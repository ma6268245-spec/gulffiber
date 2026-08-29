import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Manufacturing & Services - Gulf Fibre Company (PVT) Limited',
  description:
    'Custom denier and cut-length specification, in-house testing, 280 kg moisture-sealed baling, and export documentation prepared in-house.',
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
  return <>{children}</>
}

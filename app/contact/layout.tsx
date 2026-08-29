import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Contact & Enquiries - Gulf Fibre Company (PVT) Limited',
  description:
    'Send a specification, request a sample, or open a commercial enquiry with Gulf Fibre Company (PVT) Limited, Pakistan.',
}

/**
 * Route layout for /contact.
 *
 * Exists so the page itself can stay a client component while still shipping
 * metadata, and so the subpage stylesheet loads on this route only - the frozen
 * homepage never sees it. No extra font is loaded: the subpages use the same
 * Inter and Cormorant Garamond faces as the homepage.
 */
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

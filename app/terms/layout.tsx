import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Terms & Conditions & Copyright Notice — Gulf Fiber Company',
  description:
    'Commercial supply terms, specification tolerances, shipping & delivery, intellectual property rights, and copyright policy for Gulf Fiber Company (PVT) Limited.',
}

/**
 * Route layout for /terms.
 */
export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

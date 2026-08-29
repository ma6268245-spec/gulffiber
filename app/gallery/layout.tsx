import type { Metadata } from 'next'
import '@/styles/subpage.css'

export const metadata: Metadata = {
  title: 'Gallery - The Gulf Fibre Visual Archive',
  description:
    'The visual archive of Gulf Fibre: factory, materials, manufacturing, products, quality, people and sustainability - real photographs where the record holds them, labelled frames where it does not.',
}

/**
 * Route layout for /gallery, following the same pattern as the other
 * subpages: metadata + the scoped subpage stylesheet, nothing else.
 */
export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

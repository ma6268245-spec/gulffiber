import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gulf Fiber Company (PVT) Limited',
    short_name: 'Gulf Fiber',
    description: 'Premier manufacturer of recycled polyester staple fiber, thermal-bonded wadding, and non-woven felts in Pakistan since 1999.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A1128',
    theme_color: '#0A4BB8',
    icons: [
      {
        src: '/icon-48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}

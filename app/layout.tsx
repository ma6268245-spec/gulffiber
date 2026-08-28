import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { ThemeProvider } from '@/components/layout/ThemeProvider'

export const metadata: Metadata = {
  title: 'Gulf Fibre Company (PVT) Limited — Premium Fibre Manufacturer',
  description: 'Pakistan\'s leading manufacturer of recycled polyester staple fibre, conjugate fibre, non-woven felt, and hollow fibre since 1999. GRS certified, ISO 9001.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

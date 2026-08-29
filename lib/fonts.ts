import { JetBrains_Mono } from 'next/font/google'

/**
 * Monospace technical face used exclusively by the subpages for engineering
 * labels, measurements, batch markers and spec tables.
 *
 * Exposed as `--font-mono` on whatever element carries `jetbrainsMono.variable`.
 * It is applied in the subpage route layouts only, so the frozen homepage never
 * loads it and `app/globals.css` needs no change.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

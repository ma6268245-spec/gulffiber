import { Resend } from 'resend'
import { z } from 'zod'

// The Resend SDK requires the Node.js runtime (not Edge), and this route must
// never be cached / prerendered.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Server-side validation. Mirrors the browser validation in app/contact/page.tsx. */
const Schema = z.object({
  company: z.string().trim().min(1),
  person: z.string().trim().min(1),
  email: z.string().trim().refine((s) => EMAIL_RE.test(s)),
  phone: z.string().trim().optional(),
  country: z.string().trim().min(1),
  line: z.string().trim().optional(),
  denier: z.string().trim().optional(),
  volume: z.string().trim().optional(),
  message: z.string().trim().min(1),
  intent: z.string().trim().optional(),
})

/** Escape user input before it goes into the HTML email body. */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ ok: false, error: 'Please complete the required fields.' }, { status: 400 })
  }
  const d = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Gulf Fibre Website <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.')
    return Response.json({ ok: false, error: 'Email is not configured yet.' }, { status: 500 })
  }

  const rows: [string, string][] = [
    ['Enquiry type', d.intent || 'general'],
    ['Company', d.company],
    ['Contact name', d.person],
    ['Email', d.email],
    ['Phone', d.phone || '—'],
    ['Destination country', d.country],
    ['Product line', d.line || '—'],
    ['Denier / cut length', d.denier || '—'],
    ['Volume', d.volume || '—'],
  ]

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${d.message}`

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0A1128">
    <h2 style="color:#0A4BB8;margin:0 0 4px">New website enquiry</h2>
    <p style="margin:0 0 16px;color:#475569;font-size:13px">Submitted via the Gulf Fibre contact form</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px;border:1px solid #E2E8F0;background:#F8FAFC;font-weight:700;width:190px">${esc(
              k,
            )}</td><td style="padding:8px 12px;border:1px solid #E2E8F0">${esc(v)}</td></tr>`,
        )
        .join('')}
    </table>
    <h3 style="color:#0A4BB8;margin:20px 0 6px">Message</h3>
    <p style="white-space:pre-wrap;line-height:1.6;margin:0">${esc(d.message)}</p>
  </div>`

  const subject = `New enquiry — ${d.company} (${d.intent || 'general'})`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({ from, to, replyTo: d.email, subject, html, text })
    if (error) {
      console.error('[contact] Resend error:', error)
      return Response.json({ ok: false, error: 'Could not send your enquiry right now.' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return Response.json({ ok: false, error: 'Could not send your enquiry right now.' }, { status: 502 })
  }
}

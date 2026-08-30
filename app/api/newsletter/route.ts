import { Resend } from 'resend'
import { z } from 'zod'

// The Resend SDK requires the Node.js runtime (not Edge), and this route must
// never be cached / prerendered.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const Schema = z.object({
  email: z.string().trim().refine((s) => EMAIL_RE.test(s)),
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
    return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }
  const email = parsed.data.email

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NEWSLETTER_TO_EMAIL || process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Gulf Fibre Website <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.error('[newsletter] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.')
    return Response.json({ ok: false, error: 'Signups are not configured yet.' }, { status: 500 })
  }

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0A1128">
    <h2 style="color:#0A4BB8;margin:0 0 4px">New newsletter signup</h2>
    <p style="margin:0 0 16px;color:#475569;font-size:13px">Submitted via the Gulf Fibre website footer</p>
    <p style="font-size:15px;margin:0"><strong>Email:</strong> ${esc(email)}</p>
  </div>`

  const text = `New newsletter signup\n\nEmail: ${email}`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New newsletter signup — ${email}`,
      html,
      text,
    })
    if (error) {
      console.error('[newsletter] Resend error:', error)
      return Response.json({ ok: false, error: 'Could not subscribe you right now.' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err)
    return Response.json({ ok: false, error: 'Could not subscribe you right now.' }, { status: 502 })
  }
}

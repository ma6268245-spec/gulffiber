import { Resend } from 'resend'
import { z } from 'zod'
import { contactAcknowledgementEmail, enquiryNotificationEmail, siteOrigin } from '@/lib/email/templates'

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
  const from = process.env.CONTACT_FROM_EMAIL || 'Gulf Fiber Website <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.')
    return Response.json({ ok: false, error: 'Email is not configured yet.' }, { status: 500 })
  }
  const origin = siteOrigin(request)

  /* ---- Enquiry notification to the desk ---- */
  const notification = enquiryNotificationEmail({ origin, data: d })

  /* ---- Acknowledgement to the sender: we have it, someone will reply ---- */
  const ack = contactAcknowledgementEmail({ origin })

  try {
    const resend = new Resend(apiKey)

    /* Both are sent; the internal enquiry decides the response, so a failed
       acknowledgement never loses the enquiry itself. */
    const [notified, acknowledged] = await Promise.allSettled([
      resend.emails.send({ from, to, replyTo: d.email, subject: notification.subject, html: notification.html, text: notification.text }),
      resend.emails.send({
        from,
        to: d.email,
        replyTo: to,
        subject: ack.subject,
        html: ack.html,
        text: ack.text,
      }),
    ])

    if (acknowledged.status === 'rejected') {
      console.error('[contact] Acknowledgement threw:', acknowledged.reason)
    } else if (acknowledged.value.error) {
      console.error('[contact] Acknowledgement rejected by Resend:', acknowledged.value.error)
    }

    if (notified.status === 'rejected') {
      console.error('[contact] Enquiry email threw:', notified.reason)
      return Response.json({ ok: false, error: 'Could not send your enquiry right now.' }, { status: 502 })
    }
    if (notified.value.error) {
      console.error('[contact] Resend error:', notified.value.error)
      return Response.json({ ok: false, error: 'Could not send your enquiry right now.' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return Response.json({ ok: false, error: 'Could not send your enquiry right now.' }, { status: 502 })
  }
}

import { Resend } from 'resend'
import { z } from 'zod'
import { newsletterNotificationEmail, newsletterSubscriptionEmail, siteOrigin } from '@/lib/email/templates'

// The Resend SDK requires the Node.js runtime (not Edge), and this route must
// never be cached / prerendered.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const Schema = z.object({
  email: z.string().trim().refine((s) => EMAIL_RE.test(s)),
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
    return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }
  const email = parsed.data.email

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NEWSLETTER_TO_EMAIL || process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Gulf Fiber Website <onboarding@resend.dev>'
  /* Replies to the subscriber's confirmation should reach a person, not the
     no-reply mailbox the notification is sent from. */
  const replyDesk = process.env.CONTACT_TO_EMAIL || to

  if (!apiKey || !to) {
    console.error('[newsletter] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.')
    return Response.json({ ok: false, error: 'Signups are not configured yet.' }, { status: 500 })
  }

  const origin = siteOrigin(request)

  /* ---- 1) Internal notification: a signup landed ---- */
  const notification = newsletterNotificationEmail({ origin, email })

  /* ---- 2) Confirmation to the subscriber: you are on the list ---- */
  const welcome = newsletterSubscriptionEmail({ origin })

  try {
    const resend = new Resend(apiKey)

    /* Both are sent; the internal notification decides the response, so a
       failed confirmation never loses the signup itself. */
    const [notified, confirmed] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
      }),
      resend.emails.send({
        from,
        to: email,
        replyTo: replyDesk,
        subject: welcome.subject,
        html: welcome.html,
        text: welcome.text,
      }),
    ])

    if (confirmed.status === 'rejected') {
      console.error('[newsletter] Confirmation email threw:', confirmed.reason)
    } else if (confirmed.value.error) {
      console.error('[newsletter] Confirmation email rejected by Resend:', confirmed.value.error)
    }

    if (notified.status === 'rejected') {
      console.error('[newsletter] Notification threw:', notified.reason)
      return Response.json({ ok: false, error: 'Could not subscribe you right now.' }, { status: 502 })
    }
    if (notified.value.error) {
      console.error('[newsletter] Resend error:', notified.value.error)
      return Response.json({ ok: false, error: 'Could not subscribe you right now.' }, { status: 502 })
    }
    return Response.json({ ok: true })
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err)
    return Response.json({ ok: false, error: 'Could not subscribe you right now.' }, { status: 502 })
  }
}

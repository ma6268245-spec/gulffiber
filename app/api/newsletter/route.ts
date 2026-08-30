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
  const from = process.env.CONTACT_FROM_EMAIL || 'Gulf Fiber Website <onboarding@resend.dev>'
  /* Replies to the subscriber's confirmation should reach a person, not the
     no-reply mailbox the notification is sent from. */
  const replyDesk = process.env.CONTACT_TO_EMAIL || to

  if (!apiKey || !to) {
    console.error('[newsletter] Missing RESEND_API_KEY or CONTACT_TO_EMAIL env var.')
    return Response.json({ ok: false, error: 'Signups are not configured yet.' }, { status: 500 })
  }

  /* ---- 1) Internal notification: a signup landed ---- */
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0A1128">
    <h2 style="color:#0A4BB8;margin:0 0 4px">New newsletter signup</h2>
    <p style="margin:0 0 16px;color:#475569;font-size:13px">Submitted via the Gulf Fiber website footer</p>
    <p style="font-size:15px;margin:0"><strong>Email:</strong> ${esc(email)}</p>
  </div>`

  const text = `New newsletter signup\n\nEmail: ${email}`

  /* ---- 2) Confirmation to the subscriber: you are on the list ---- */
  const welcomeHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0A1128">
    <h2 style="color:#0A4BB8;margin:0 0 4px">You are subscribed</h2>
    <p style="margin:0 0 20px;color:#475569;font-size:13px">Gulf Fiber · polyester fibre manufacturing</p>

    <p style="font-size:15px;line-height:1.65;margin:0 0 16px">
      Thank you for subscribing. Your address — <strong>${esc(email)}</strong> — has been added to
      the Gulf Fiber updates list, and this note confirms the signup went through.
    </p>
    <p style="font-size:15px;line-height:1.65;margin:0 0 16px">
      From here you will receive occasional updates on our polyester fibre range, our
      certifications and what our production capability can take on — sent only when there is
      something worth your time, never on a schedule for its own sake. Your address stays with us
      and is not shared with anyone else.
    </p>
    <p style="font-size:15px;line-height:1.65;margin:0 0 24px">
      If you have a specification in front of you now — denier, cut length, volume and destination —
      simply reply to this email and it reaches the enquiry desk directly. And if you would rather
      not hear from us again, reply with <strong>unsubscribe</strong> and we will remove you right away.
    </p>

    <p style="font-size:15px;line-height:1.65;margin:0;padding-top:16px;border-top:1px solid #E2E8F0">
      Kind regards,<br />
      <strong style="color:#0A4BB8">Gulf Fiber</strong>
    </p>
  </div>`

  const welcomeText = `You are subscribed

Thank you for subscribing. Your address - ${email} - has been added to the Gulf Fiber updates list, and this note confirms the signup went through.

From here you will receive occasional updates on our polyester fibre range, our certifications and what our production capability can take on - sent only when there is something worth your time, never on a schedule for its own sake. Your address stays with us and is not shared with anyone else.

If you have a specification in front of you now - denier, cut length, volume and destination - simply reply to this email and it reaches the enquiry desk directly. And if you would rather not hear from us again, reply with "unsubscribe" and we will remove you right away.

Kind regards,
Gulf Fiber`

  try {
    const resend = new Resend(apiKey)

    /* Both are sent; the internal notification decides the response, so a
       failed confirmation never loses the signup itself. */
    const [notified, confirmed] = await Promise.allSettled([
      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New newsletter signup — ${email}`,
        html,
        text,
      }),
      resend.emails.send({
        from,
        to: email,
        replyTo: replyDesk,
        subject: 'Thanks for subscribing to Gulf Fiber updates',
        html: welcomeHtml,
        text: welcomeText,
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

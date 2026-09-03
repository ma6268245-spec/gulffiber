/**
 * Customer-facing email templates.
 *
 * Two of them, both sent by the existing route handlers:
 *
 *   newsletterSubscriptionEmail()   app/api/newsletter/route.ts  -> the subscriber
 *   contactAcknowledgementEmail()   app/api/contact/route.ts     -> the sender
 *
 * The internal notifications those routes also send are unrelated and stay
 * where they are. Nothing here touches the website: this module renders email
 * HTML only and is imported by server code exclusively.
 *
 * Client constraints the markup below is written against: table layout, inline
 * CSS, no JavaScript, no web fonts, no inline SVG (Gmail strips it), absolute
 * image URLs, and one <style> block whose media queries handle Gmail/Apple Mail
 * mobile while Outlook desktop simply ignores them and keeps the wide layout.
 */

/* ---- Brand tokens: taken from app/globals.css and the Gulf Fiber logo ---- */
const NAVY = '#0A1128' // --ink
const NAVY_DEEP = '#071738' // --burg-dark, the footer
const BLUE = '#0A4BB8' // --burg-primary, Gulf Fiber blue
const BLUE_TINT = '#EAF1FD'
const BLUE_TINT_LINE = '#D5E1F3'
const GREEN = '#16A34A' // --accent-green, darkened for text contrast
const GREEN_LINE = '#22C55E'
const GREEN_TINT = '#E7F7EE'
const PAGE_BG = '#EAF0F8' // --ivory-deep
const TINT = '#F4F8FD'
const BORDER = '#E1E9F5'
const TEXT = '#475569'
const MUTED = '#64748B'
const FOOT_TEXT = '#A9BBD8'
const FOOT_LINK = '#8FC0FF'
const FOOT_LINE = '#1C3255'

/** No web fonts in email — a system stack with an Arial floor for Outlook. */
const F = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"

const WIDTH = 640

/* ---- Company details (as they appear on the website) ---- */
const COMPANY = 'Gulf Fiber Company (Pvt) Limited'
const BRAND_LINE = 'Pioneers of Regenerated Polyester Fiber in Pakistan'
const PHONES = [
  { label: '+92 52 111 505 505', href: 'tel:+9252111505505' },
  { label: '+92 322 9400077', href: 'tel:+923229400077' },
]
const MAILBOX = 'gulffiber@gmail.com'
const ADDRESS = ['33-KM Multan Road,', 'Behind Daewoo Bus Terminal,', 'Lahore, 54000, Pakistan']
const WEBSITE = 'gulffiber.co'
/* The live, verified domain (see CONTACT_FROM_EMAIL in .env.local). Also the
   fallback origin for email images, so they resolve even for mail sent from a
   local dev server. */
const WEBSITE_HREF = 'https://gulffiber.co'

/**
 * Absolute origin for the logo, the product photograph and the button links.
 *
 * Emails are read outside the browser, so every URL has to be absolute and
 * publicly reachable. The host the form was submitted from is by definition the
 * live host serving /public, so it is the first choice; local development and
 * anything without a usable Host header fall back to the public website.
 */
export function siteOrigin(request: Request): string {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto') || 'https'
  if (host && !/^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host)) {
    return `${proto}://${host}`.replace(/\/$/, '')
  }
  return WEBSITE_HREF
}

/* ===========================================================================
   Shared pieces
   =========================================================================== */

/** Spacer cell between columns: a gap on desktop, a vertical gap once stacked. */
const GUTTER = `<td class="gutter" width="2%" style="width:2%;font-size:0;line-height:0;">&nbsp;</td>`

/** Round icon tile holding one text glyph — no SVG, no image request. */
function badge(
  glyph: string,
  o: { size?: number; bg?: string; color?: string; border?: string; glyphSize?: number; radius?: number } = {},
) {
  const size = o.size ?? 32
  const radius = o.radius ?? Math.round(size / 2)
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;"><tr>
                <td width="${size}" height="${size}" align="center" valign="middle" style="width:${size}px;height:${size}px;background:${o.bg ?? BLUE_TINT};border:1px solid ${o.border ?? 'transparent'};border-radius:${radius}px;font-family:${F};font-size:${o.glyphSize ?? Math.round(size * 0.46)}px;line-height:1;color:${o.color ?? BLUE};text-align:center;">${glyph}</td>
              </tr></table>`
}

/** The small green rule that sits under both headlines. */
function greenRule() {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>
                <td width="52" height="3" style="width:52px;height:3px;background:${GREEN_LINE};border-radius:2px;font-size:0;line-height:3px;">&nbsp;</td>
              </tr></table>`
}

/** Table-based button: works with images off, no JavaScript, full width on phones. */
function button(href: string, label: string) {
  return `<table role="presentation" class="btnwrap" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;"><tr>
                <td align="center" bgcolor="${BLUE}" style="border-radius:8px;">
                  <a class="btnlink" href="${href}" style="display:inline-block;padding:14px 28px;font-family:${F};font-size:13px;font-weight:700;line-height:1;letter-spacing:0.02em;color:#FFFFFF;text-decoration:none;border-radius:8px;">${label}</a>
                </td>
              </tr></table>`
}

/** White header: logo left, establishment line right. Identical in both emails. */
function header(origin: string) {
  return `<tr>
          <td class="px" style="padding:22px 28px;background:#FFFFFF;border-bottom:1px solid ${BORDER};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td align="left" valign="middle">
                <a href="${origin}" style="text-decoration:none;"><img class="logo" src="${origin}/gulf-fiber-logo.png" width="150" height="57" alt="${COMPANY}" style="display:block;width:150px;height:57px;border:0;outline:none;text-decoration:none;" /></a>
              </td>
              <td align="right" valign="middle" class="eyebrow" style="font-family:${F};font-size:10px;font-weight:700;line-height:1.4;letter-spacing:0.14em;color:${MUTED};text-transform:uppercase;white-space:nowrap;">EST. 1999 &#8226; PAKISTAN</td>
            </tr></table>
          </td>
        </tr>`
}

/** Sign-off. Identical in both emails. No social icons: the site has no official accounts. */
function signature() {
  return `<tr>
          <td class="px" style="padding:28px 28px 6px;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td style="border-top:1px solid ${BORDER};padding-top:22px;">
                <p style="margin:0 0 6px;font-family:${F};font-size:14px;line-height:1.6;color:${TEXT};">Warm regards,</p>
                <p style="margin:0 0 3px;font-family:${F};font-size:15px;font-weight:700;line-height:1.5;color:${BLUE};">Gulf Fiber Team</p>
                <p style="margin:0;font-family:${F};font-size:12px;line-height:1.6;color:${MUTED};">${BRAND_LINE}</p>
              </td>
            </tr></table>
          </td>
        </tr>`
}

/** One labelled line in the navy footer. */
function footItem(label: string, value: string) {
  return `<p style="margin:0 0 3px;font-family:${F};font-size:9px;font-weight:700;line-height:1.4;letter-spacing:0.14em;color:#6E86AE;text-transform:uppercase;">${label}</p>
                    <p style="margin:0 0 14px;font-family:${F};font-size:13px;line-height:1.55;color:${FOOT_TEXT};">${value}</p>`
}

/** Deep navy footer with the company's contact details. Identical in both emails. */
function footer() {
  const link = `font-family:${F};font-size:13px;line-height:1.55;color:${FOOT_LINK};text-decoration:none;`
  return `<tr>
          <td class="px" style="padding:30px 28px 26px;background:${NAVY_DEEP};border-radius:0 0 14px 14px;">
            <p style="margin:0 0 20px;font-family:${F};font-size:11px;font-weight:700;line-height:1.4;letter-spacing:0.12em;color:#FFFFFF;text-transform:uppercase;">${COMPANY}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td class="footcol" width="50%" valign="top" style="width:50%;padding-right:12px;">
                ${footItem('Phone', PHONES.map((p) => `<a href="${p.href}" style="${link}">${p.label}</a>`).join('<br />'))}
                ${footItem('Email', `<a href="mailto:${MAILBOX}" style="${link}">${MAILBOX}</a>`)}
              </td>
              <td class="footcol" width="50%" valign="top" style="width:50%;">
                ${footItem('Address', ADDRESS.join('<br />'))}
                ${footItem('Website', `<a href="${WEBSITE_HREF}" style="${link}">${WEBSITE}</a>`)}
              </td>
            </tr></table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td style="border-top:1px solid ${FOOT_LINE};padding-top:16px;">
                <p style="margin:0;font-family:${F};font-size:11px;line-height:1.6;color:#7F94B8;">&copy; ${COMPANY}. All Rights Reserved.</p>
              </td>
            </tr></table>
          </td>
        </tr>`
}

/* ---- Pieces for the notifications the owner receives ---- */

/** Escape before interpolating anything a stranger typed into a form. */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Escaped, with newlines preserved as real line breaks (Outlook ignores pre-wrap). */
const escLines = (s: string) => esc(s).replace(/\r?\n/g, '<br />')

/** Compact footer for internal mail: provenance, not a marketing block. */
function internalFooter() {
  return `<tr>
          <td class="px" style="padding:22px 28px;background:${NAVY_DEEP};border-radius:0 0 14px 14px;">
            <p style="margin:0 0 4px;font-family:${F};font-size:11px;font-weight:700;line-height:1.5;letter-spacing:0.1em;color:#FFFFFF;text-transform:uppercase;">Automated notification</p>
            <p style="margin:0;font-family:${F};font-size:12px;line-height:1.6;color:#7F94B8;">Sent by the ${WEBSITE} website. Reply directly to this email to answer the sender.</p>
          </td>
        </tr>`
}

/** One labelled detail row. Blank values collapse to an em dash, never to nothing. */
function dataRow(label: string, value: string, opts: { tint?: boolean; link?: string } = {}) {
  const shown = value && value.trim() ? esc(value) : '&#8212;'
  const body = opts.link ? `<a href="${opts.link}" style="font-family:${F};font-size:14px;color:${BLUE};text-decoration:none;">${shown}</a>` : shown
  return `<tr>
                <td width="42%" valign="top" style="width:42%;padding:11px 14px;background:${opts.tint ? TINT : '#FFFFFF'};border-bottom:1px solid ${BORDER};font-family:${F};font-size:11px;font-weight:700;line-height:1.5;letter-spacing:0.06em;color:${MUTED};text-transform:uppercase;">${label}</td>
                <td valign="top" style="padding:11px 14px;background:${opts.tint ? TINT : '#FFFFFF'};border-bottom:1px solid ${BORDER};font-family:${F};font-size:14px;line-height:1.55;color:${NAVY};word-break:break-word;">${body}</td>
              </tr>`
}

/** Left-aligned hero for internal mail: what happened, and the headline fact. */
function internalHero(eyebrow: string, headline: string, meta: string) {
  return `<tr>
          <td class="px" style="padding:26px 28px 4px;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;"><tr>
              <td style="padding:22px 24px;background:${BLUE_TINT};border:1px solid ${BLUE_TINT_LINE};border-radius:12px;">
                <p style="margin:0 0 8px;font-family:${F};font-size:10px;font-weight:700;line-height:1.4;letter-spacing:0.16em;color:${BLUE};text-transform:uppercase;">${eyebrow}</p>
                <h1 class="h1" style="margin:0 0 8px;font-family:${F};font-size:25px;font-weight:700;line-height:1.25;color:${NAVY};word-break:break-word;">${headline}</h1>
                <p style="margin:0;font-family:${F};font-size:13px;line-height:1.6;color:${TEXT};">${meta}</p>
              </td>
            </tr></table>
          </td>
        </tr>`
}

/** Section label above a block. */
function sectionLabel(text: string) {
  return `<p style="margin:0 0 10px;font-family:${F};font-size:10px;font-weight:700;line-height:1.4;letter-spacing:0.16em;color:${MUTED};text-transform:uppercase;">${text}</p>`
}

/** Document shell: resets, media queries, centred 640px card, header and footer.
 *
 *  `internal: true` is for the notifications the owner receives: it drops the
 *  customer sign-off and swaps the full contact footer for a compact one, since
 *  quoting the company's own address back to its own staff is just noise. Left
 *  unset, the output is exactly what the two customer emails already render. */
function shell(o: { title: string; preheader: string; origin: string; body: string; internal?: boolean }) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${esc(o.title)}</title>
  <style type="text/css">
    body{margin:0;padding:0;width:100% !important;background:${PAGE_BG};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    table{border-collapse:collapse;}
    img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
    p,h1{mso-line-height-rule:exactly;}
    .ExternalClass{width:100%;}
    .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div{line-height:inherit;}
    @media only screen and (max-width:620px){
      .wrap{width:100% !important;}
      .px{padding-left:18px !important;padding-right:18px !important;}
      .col{display:block !important;width:100% !important;max-width:100% !important;}
      .gutter{display:block !important;width:100% !important;height:10px !important;}
      .footcol{display:block !important;width:100% !important;padding:0 !important;}
      .logo{width:128px !important;height:48px !important;}
      .eyebrow{font-size:9px !important;letter-spacing:0.1em !important;}
      .h1{font-size:23px !important;}
      .btnwrap{width:100% !important;}
      .btnlink{display:block !important;text-align:center !important;padding-left:12px !important;padding-right:12px !important;}
      .photocell{display:block !important;width:100% !important;padding:0 0 18px !important;text-align:center !important;}
      .photo{width:200px !important;height:268px !important;}
      .photocopy{display:block !important;width:100% !important;text-align:center !important;}
    }
  </style>
  <!--[if mso]>
  <style type="text/css">
    body,table,td,p,h1,a,span{font-family:Arial,Helvetica,sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:${PAGE_BG};">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${esc(o.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAGE_BG};">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" class="wrap" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:${WIDTH}px;max-width:${WIDTH}px;background:#FFFFFF;border:1px solid ${BORDER};border-radius:14px;">
          ${header(o.origin)}
          ${o.body}
          ${o.internal ? '' : signature()}
          ${o.internal ? internalFooter() : footer()}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ===========================================================================
   EMAIL 1 — newsletter subscription confirmation
   =========================================================================== */

/** The four value points, in order. The fourth carries the green accent. */
const VALUE_POINTS: { glyph: string; title: string; copy: string; green?: boolean }[] = [
  {
    glyph: '&#10022;',
    title: 'Industry Updates',
    copy: 'Stay informed with the latest in polyester fiber and textile innovation.',
  },
  {
    glyph: '&#10003;',
    title: 'Quality You Can Trust',
    copy: 'ISO 9001:2015 certified processes ensuring premium quality.',
  },
  {
    glyph: '&#9670;',
    title: 'Innovative Solutions',
    copy: 'High-performance fiber solutions for diverse industrial applications.',
  },
  {
    glyph: '&#10054;',
    title: 'Sustainability First',
    copy: 'Committed to responsible manufacturing and a greener tomorrow.',
    green: true,
  },
]

export interface NewsletterEmail {
  subject: string
  html: string
  text: string
}

/**
 * Confirmation sent to a subscriber once the signup has gone through.
 * `origin` is the public site origin — see siteOrigin().
 */
export function newsletterSubscriptionEmail({ origin }: { origin: string }): NewsletterEmail {
  /* The card is the <td> itself, so all four share one row and therefore one
     height; the spacer cells become the vertical gaps once they stack. */
  const cards = VALUE_POINTS.map(
    (v) => `<td class="col" width="23.5%" valign="top" style="width:23.5%;background:${TINT};border:1px solid ${BORDER};border-radius:12px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td style="padding:16px 13px 18px;">
                      ${badge(v.glyph, {
                        size: 30,
                        radius: 8,
                        glyphSize: 14,
                        bg: v.green ? GREEN_TINT : BLUE_TINT,
                        color: v.green ? GREEN : BLUE,
                      })}
                      <p style="margin:11px 0 5px;font-family:${F};font-size:13px;font-weight:700;line-height:1.35;color:${NAVY};">${v.title}</p>
                      <p style="margin:0;font-family:${F};font-size:11.5px;line-height:1.6;color:#5D6E88;">${v.copy}</p>
                    </td>
                  </tr></table>
                </td>`,
  ).join(`\n                ${GUTTER}\n                `)

  const body = `<!-- hero -->
        <tr>
          <td class="px" style="padding:30px 28px 0;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TINT};border:1px solid ${BORDER};border-radius:14px;"><tr>
              <td align="center" style="padding:38px 30px 34px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 22px;"><tr><td>
                  ${badge('&#10003;', { size: 62, glyphSize: 27, bg: '#FFFFFF', border: BLUE_TINT_LINE, color: BLUE })}
                </td></tr></table>
                <h1 class="h1" style="margin:0 0 16px;font-family:${F};font-size:27px;font-weight:700;line-height:1.25;color:${NAVY};">You&rsquo;re <span style="color:${BLUE};">Subscribed!</span></h1>
                ${greenRule()}
                <p style="margin:22px 0 12px;font-family:${F};font-size:15px;font-weight:600;line-height:1.6;color:${NAVY};">Thank you for subscribing to Gulf Fiber updates.</p>
                <p style="margin:0;font-family:${F};font-size:14px;line-height:1.75;color:${TEXT};">You&rsquo;ll now receive the latest news, product updates, certifications and industry insights directly in your inbox.</p>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- four value points -->
        <tr>
          <td class="px" style="padding:22px 28px 0;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;"><tr>
                ${cards}
            </tr></table>
          </td>
        </tr>

        <!-- call to action -->
        <tr>
          <td class="px" style="padding:22px 28px 0;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BLUE_TINT};border:1px solid ${BLUE_TINT_LINE};border-radius:14px;"><tr>
              <td align="center" style="padding:32px 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 18px;"><tr><td>
                  ${badge('&#9993;', { size: 52, glyphSize: 22, bg: '#FFFFFF', border: BLUE_TINT_LINE, color: BLUE })}
                </td></tr></table>
                <p style="margin:0 0 8px;font-family:${F};font-size:18px;font-weight:700;line-height:1.35;color:${NAVY};">You&rsquo;re All Set!</p>
                <p style="margin:0 0 24px;font-family:${F};font-size:13.5px;line-height:1.7;color:${TEXT};">We&rsquo;ll keep you updated with what matters most to your business.</p>
                ${button(`${origin}/products`, 'Explore Our Products &rarr;')}
              </td>
            </tr></table>
          </td>
        </tr>`

  const html = shell({
    title: "You're Subscribed — Gulf Fiber",
    preheader: 'You are on the Gulf Fiber updates list — news, products, certifications and industry insights.',
    origin,
    body,
  })

  const text = `YOU'RE SUBSCRIBED!

Thank you for subscribing to Gulf Fiber updates.

You'll now receive the latest news, product updates, certifications and industry insights directly in your inbox.

WHAT YOU'LL RECEIVE

Industry Updates
Stay informed with the latest in polyester fiber and textile innovation.

Quality You Can Trust
ISO 9001:2015 certified processes ensuring premium quality.

Innovative Solutions
High-performance fiber solutions for diverse industrial applications.

Sustainability First
Committed to responsible manufacturing and a greener tomorrow.

YOU'RE ALL SET!
We'll keep you updated with what matters most to your business.

Explore our products: ${origin}/products

Warm regards,
Gulf Fiber Team
${BRAND_LINE}

${COMPANY}
Phone: ${PHONES.map((p) => p.label).join(' / ')}
Email: ${MAILBOX}
${ADDRESS.join(' ')}
${WEBSITE}

(c) ${COMPANY}. All Rights Reserved.`

  return { subject: 'Thanks for subscribing to Gulf Fiber updates', html, text }
}

/* ===========================================================================
   EMAIL 2 — contact / enquiry acknowledgement
   =========================================================================== */

/**
 * The three steps, in order.
 *
 * Numbered badges rather than pictorial envelope/person/check icons: inline SVG
 * is stripped by Gmail, and no glyph for "person" renders as text across the
 * clients we target, so numbers keep the three steps consistent and legible
 * everywhere. They also read directly onto the STEP 1/2/3 labels.
 */
const NEXT_STEPS: { label: string; title: string; copy: string }[] = [
  { label: 'Step 1', title: 'Message Received', copy: "We've received your enquiry successfully." },
  { label: 'Step 2', title: 'Personal Follow-up', copy: 'Our team will review your enquiry and get in touch soon.' },
  { label: 'Step 3', title: 'Tailored Solutions', copy: "We'll provide the best solution for your requirements." },
]

export interface ContactEmail {
  subject: string
  html: string
  text: string
}

/**
 * The five enquiry types the contact form offers, keyed by the `intent` id it
 * posts. The ids are duplicated here rather than imported: `INTENTS` lives in
 * app/contact/page.tsx, which is a client component, and pulling that into a
 * server-only email module would drag the whole page in with it.
 *
 * `subject` is what the sender sees in their inbox — a generic "thank you" gives
 * them no way to tell a quotation acknowledgement from a sample one, or to find
 * it again later, so each type names itself. `received` is written with a plain
 * apostrophe so the text/plain alternative can use it as-is; the HTML curls it.
 */
const ENQUIRY_KINDS: Record<string, { label: string; subject: string; received: string }> = {
  quotation: {
    label: 'Quotation request',
    subject: 'We have your quotation request — Gulf Fiber',
    received: "We've received your quotation request",
  },
  sample: {
    label: 'Sample request',
    subject: 'We have your sample request — Gulf Fiber',
    received: "We've received your sample request",
  },
  technical: {
    label: 'Technical question',
    subject: 'We have your technical question — Gulf Fiber',
    received: "We've received your technical question",
  },
  product: {
    label: 'Product enquiry',
    subject: 'We have your product enquiry — Gulf Fiber',
    received: "We've received your product enquiry",
  },
  general: {
    label: 'General enquiry',
    subject: 'We have your enquiry — Gulf Fiber',
    received: "We've received your enquiry",
  },
}

const enquiryKind = (intent?: string) => ENQUIRY_KINDS[(intent || '').trim()] ?? ENQUIRY_KINDS.general

/**
 * Acknowledgement sent to whoever submitted the contact / enquiry form once the
 * submission has gone through. `origin` is the public site origin.
 *
 * `data` is the enquiry as submitted, echoed back as a receipt: the sender can
 * see that the details actually arrived, and which ones, without waiting for a
 * human reply. It is a stranger's own text coming back to their own inbox, but
 * it is still escaped — nothing typed into the form reaches the markup raw.
 */
export function contactAcknowledgementEmail({
  origin,
  data,
}: {
  origin: string
  data?: EnquiryFields
}): ContactEmail {
  const kind = enquiryKind(data?.intent)
  const steps = NEXT_STEPS.map(
    (s, i) => `<td class="col" width="32%" valign="top" style="width:32%;background:${TINT};border:1px solid ${BORDER};border-radius:12px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td align="center" style="padding:20px 14px 22px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 12px;"><tr><td>
                        ${badge(String(i + 1), { size: 34, glyphSize: 15, bg: BLUE, color: '#FFFFFF' })}
                      </td></tr></table>
                      <p style="margin:0 0 7px;font-family:${F};font-size:9px;font-weight:700;line-height:1.4;letter-spacing:0.14em;color:${BLUE};text-transform:uppercase;">${s.label}</p>
                      <p style="margin:0 0 5px;font-family:${F};font-size:13px;font-weight:700;line-height:1.35;color:${NAVY};">${s.title}</p>
                      <p style="margin:0;font-family:${F};font-size:11.5px;line-height:1.6;color:#5D6E88;">${s.copy}</p>
                    </td>
                  </tr></table>
                </td>`,
  ).join(`\n                ${GUTTER}\n                `)

  /* Only the fields they actually filled. The owner's triage grid wants every
     row present so the layout never shifts between enquiries; a customer receipt
     with half its rows collapsed to an em dash just reads like something went
     wrong. */
  const rows = [
    { label: 'Enquiry type', value: kind.label },
    { label: 'Company', value: data?.company || '' },
    { label: 'Destination country', value: data?.country || '' },
    { label: 'Product line', value: data?.line || '' },
    { label: 'Denier / cut length', value: data?.denier || '' },
    { label: 'Volume', value: data?.volume || '' },
  ].filter((r) => r.value.trim() !== '')

  /* Their own words, quoted back. Skipped when the caller passed no data (the
     signature keeps it optional), never rendered empty. */
  const quoted = !data?.message?.trim()
    ? ''
    : `
        <tr>
          <td class="px" style="padding:22px 28px 0;background:#FFFFFF;">
            ${sectionLabel('Your message')}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;"><tr>
              <td style="padding:16px 18px;background:${TINT};border-left:3px solid ${BLUE};border-radius:0 8px 8px 0;font-family:${F};font-size:14px;line-height:1.7;color:${NAVY};">${escLines(data.message)}</td>
            </tr></table>
          </td>
        </tr>`

  const receipt = !data
    ? ''
    : `
        <!-- receipt: the enquiry as it reached us -->
        <tr>
          <td class="px" style="padding:28px 28px 0;background:#FFFFFF;">
            ${sectionLabel('What reached us')}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;">
              ${rows.map((r, i) => dataRow(r.label, r.value, { tint: i % 2 === 0 })).join('')}
            </table>
          </td>
        </tr>${quoted}`

  const body = `<!-- hero -->
        <tr>
          <td class="px" style="padding:30px 28px 0;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${TINT};border:1px solid ${BORDER};border-radius:14px;"><tr>
              <td align="center" style="padding:38px 30px 34px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 22px;"><tr><td>
                  ${badge('&#10003;', { size: 62, glyphSize: 27, bg: '#FFFFFF', border: '#CFE9DA', color: GREEN })}
                </td></tr></table>
                <h1 class="h1" style="margin:0 0 16px;font-family:${F};font-size:26px;font-weight:700;line-height:1.28;color:${NAVY};">Thank You for <span style="color:${BLUE};">Reaching Out!</span></h1>
                ${greenRule()}
                <p style="margin:22px 0 12px;font-family:${F};font-size:15px;font-weight:600;line-height:1.6;color:${NAVY};">${kind.received.replace("'", '&rsquo;')} and our team will get back to you shortly.</p>
                <p style="margin:0;font-family:${F};font-size:14px;line-height:1.75;color:${TEXT};">In the meantime, feel free to explore our products or learn more about how we can support your business.</p>
              </td>
            </tr></table>
          </td>
        </tr>
${receipt}
        <!-- what happens next -->
        <tr>
          <td class="px" style="padding:28px 28px 0;background:#FFFFFF;">
            <p style="margin:0 0 4px;font-family:${F};font-size:17px;font-weight:700;line-height:1.4;color:${NAVY};text-align:center;">What Happens Next?</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:10px auto 20px;"><tr>
              <td width="40" height="3" style="width:40px;height:3px;background:${GREEN_LINE};border-radius:2px;font-size:0;line-height:3px;">&nbsp;</td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:0 28px;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;"><tr>
                ${steps}
            </tr></table>
          </td>
        </tr>

        <!-- solutions panel -->
        <tr>
          <td class="px" style="padding:22px 28px 0;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BLUE_TINT};border:1px solid ${BLUE_TINT_LINE};border-radius:14px;"><tr>
              <td style="padding:24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td class="photocell" width="176" valign="top" style="width:176px;padding-right:22px;">
                    <img class="photo" src="${origin}/images/process-fiber.jpg" width="176" height="236" alt="Polyester fiber extrusion line at the Gulf Fiber plant" style="display:block;width:176px;height:236px;border:0;outline:none;border-radius:10px;" />
                  </td>
                  <td class="photocopy" valign="middle">
                    <p style="margin:0 0 8px;font-family:${F};font-size:18px;font-weight:700;line-height:1.35;color:${NAVY};">Explore Our Solutions</p>
                    <p style="margin:0 0 22px;font-family:${F};font-size:13.5px;line-height:1.7;color:${TEXT};">Discover our range of polyester fiber products and technical capabilities.</p>
                    <table role="presentation" class="btnwrap" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td align="center" bgcolor="${BLUE}" style="border-radius:8px;">
                        <a class="btnlink" href="${origin}/products" style="display:inline-block;padding:13px 26px;font-family:${F};font-size:13px;font-weight:700;line-height:1;letter-spacing:0.02em;color:#FFFFFF;text-decoration:none;border-radius:8px;">View Products &rarr;</a>
                      </td>
                    </tr></table>
                  </td>
                </tr></table>
              </td>
            </tr></table>
          </td>
        </tr>`

  const html = shell({
    title: `${kind.subject}`,
    preheader: `${kind.received} and our team will get back to you shortly.`,
    origin,
    body,
  })

  /* The same receipt, as plain text, for clients that show the alternative. */
  const receiptText = !data
    ? ''
    : `WHAT REACHED US

${rows.map((r) => `${r.label}: ${r.value}`).join('\n')}
${data.message?.trim() ? `\nYOUR MESSAGE\n${data.message.trim()}\n` : ''}
`

  const text = `THANK YOU FOR REACHING OUT!

${kind.received} and our team will get back to you shortly.

In the meantime, feel free to explore our products or learn more about how we can support your business.

${receiptText}WHAT HAPPENS NEXT?

Step 1 - Message Received
We've received your enquiry successfully.

Step 2 - Personal Follow-up
Our team will review your enquiry and get in touch soon.

Step 3 - Tailored Solutions
We'll provide the best solution for your requirements.

EXPLORE OUR SOLUTIONS
Discover our range of polyester fiber products and technical capabilities.

View products: ${origin}/products

Warm regards,
Gulf Fiber Team
${BRAND_LINE}

${COMPANY}
Phone: ${PHONES.map((p) => p.label).join(' / ')}
Email: ${MAILBOX}
${ADDRESS.join(' ')}
${WEBSITE}

(c) ${COMPANY}. All Rights Reserved.`

  return { subject: kind.subject, html, text }
}

/* ===========================================================================
   EMAIL 3 — enquiry notification (to the owner)
   ===========================================================================
   Functional before decorative: the owner is triaging, so the company, the
   enquiry type and the reply actions come first, then the specification, then
   the message. Every interpolated value is escaped — this is the one email in
   the file that renders text a stranger typed. */

export type EnquiryFields = {
  company: string
  person: string
  email: string
  phone?: string
  country: string
  line?: string
  denier?: string
  volume?: string
  message: string
  intent?: string
}

export function enquiryNotificationEmail(o: { origin: string; data: EnquiryFields }) {
  const d = o.data
  const intent = d.intent && d.intent.trim() ? d.intent : 'general'
  const tel = (d.phone || '').replace(/[^\d+]/g, '')

  const replyHref = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent(`Re: Your enquiry to Gulf Fiber — ${d.company}`)}`

  /* Reply is the action taken on nearly every enquiry; call only if a number came
     through. Each button is its own left-floated table so a long name or number
     wraps the pair onto separate lines on a phone instead of forcing a sideways
     scroll. The trailing cleared table puts the cell back in normal flow. */
  const actionBtn = (opts: { href: string; label: string; primary: boolean }) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left" style="float:left;margin:0 8px 8px 0;"><tr>
                  <td valign="middle" align="center"${opts.primary ? ` bgcolor="${BLUE}"` : ''} style="border-radius:8px;${opts.primary ? '' : `border:1px solid ${BLUE};`}">
                    <a href="${esc(opts.href)}" style="display:inline-block;padding:${opts.primary ? '13px 24px' : '12px 22px'};font-family:${F};font-size:13px;font-weight:700;line-height:1;color:${opts.primary ? '#FFFFFF' : BLUE};text-decoration:none;border-radius:8px;">${opts.label}</a>
                  </td>
                </tr></table>`

  const actions = `${actionBtn({ href: replyHref, label: `Reply to ${esc(d.person)}`, primary: true })}
              ${tel ? actionBtn({ href: `tel:${tel}`, label: `Call ${esc(d.phone || '')}`, primary: false }) : ''}
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="clear:both;"><tr><td style="height:1px;font-size:0;line-height:1px;">&nbsp;</td></tr></table>`

  const details = [
    dataRow('Contact name', d.person, { tint: true }),
    dataRow('Email', d.email, { link: `mailto:${encodeURIComponent(d.email)}` }),
    dataRow('Phone', d.phone || '', { tint: true, link: tel ? `tel:${tel}` : undefined }),
    dataRow('Destination country', d.country),
    dataRow('Product line', d.line || '', { tint: true }),
    dataRow('Denier / cut length', d.denier || ''),
    dataRow('Volume', d.volume || '', { tint: true }),
  ].join('')

  const body = `${internalHero('New enquiry', esc(d.company), `${esc(intent)} enquiry &#8226; ${esc(d.country)}`)}
        <tr>
          <td class="px" style="padding:20px 28px 0;background:#FFFFFF;">${actions}</td>
        </tr>
        <tr>
          <td class="px" style="padding:28px 28px 0;background:#FFFFFF;">
            ${sectionLabel('Enquiry details')}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;">
              ${details}
            </table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:26px 28px 30px;background:#FFFFFF;">
            ${sectionLabel('Message')}
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;"><tr>
              <td style="padding:16px 18px;background:${TINT};border-left:3px solid ${BLUE};border-radius:0 8px 8px 0;font-family:${F};font-size:14px;line-height:1.7;color:${NAVY};">${escLines(d.message)}</td>
            </tr></table>
          </td>
        </tr>`

  const html = shell({
    title: `New enquiry — ${d.company}`,
    preheader: `${intent} enquiry from ${d.company} (${d.country}) — ${d.person}`,
    origin: o.origin,
    body,
    internal: true,
  })

  const text = `NEW ENQUIRY

Company: ${d.company}
Enquiry type: ${intent}

Contact name: ${d.person}
Email: ${d.email}
Phone: ${d.phone || '-'}
Destination country: ${d.country}
Product line: ${d.line || '-'}
Denier / cut length: ${d.denier || '-'}
Volume: ${d.volume || '-'}

Message:
${d.message}

--
Automated notification from the ${WEBSITE} website.
Reply directly to this email to answer the sender.`

  return { subject: `New enquiry — ${d.company} (${intent})`, html, text }
}

/* ===========================================================================
   EMAIL 4 — newsletter signup notification (to the owner)
   =========================================================================== */

export function newsletterNotificationEmail(o: { origin: string; email: string }) {
  const body = `${internalHero('New subscriber', esc(o.email), 'Added to the Gulf Fiber updates list.')}
        <tr>
          <td class="px" style="padding:20px 28px 0;background:#FFFFFF;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="left"><tr>
              <td valign="middle" align="center" bgcolor="${BLUE}" style="border-radius:8px;">
                <a href="mailto:${esc(encodeURIComponent(o.email))}" style="display:inline-block;padding:13px 24px;font-family:${F};font-size:13px;font-weight:700;line-height:1;color:#FFFFFF;text-decoration:none;border-radius:8px;">Email this subscriber</a>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:26px 28px 30px;background:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:10px;">
              ${dataRow('Email address', o.email, { tint: true, link: `mailto:${encodeURIComponent(o.email)}` })}
              ${dataRow('Source', 'Website footer signup form')}
            </table>
            <p style="margin:14px 0 0;font-family:${F};font-size:12.5px;line-height:1.65;color:${MUTED};">A confirmation email has already been sent to the subscriber automatically.</p>
          </td>
        </tr>`

  const html = shell({
    title: `New newsletter signup — ${o.email}`,
    preheader: `${o.email} subscribed to Gulf Fiber updates.`,
    origin: o.origin,
    body,
    internal: true,
  })

  const text = `NEW NEWSLETTER SIGNUP

Email address: ${o.email}
Source: Website footer signup form

A confirmation email has already been sent to the subscriber automatically.

--
Automated notification from the ${WEBSITE} website.`

  return { subject: `New newsletter signup — ${o.email}`, html, text }
}

# Resend email — setup

The contact form and the footer newsletter now send real emails through
[Resend](https://resend.com). Two things are wired up:

| Form | Route | Sends to |
| --- | --- | --- |
| Contact / RFQ (`/contact`) | `POST /api/contact` | `CONTACT_TO_EMAIL` |
| Footer newsletter (all pages) | `POST /api/newsletter` | `NEWSLETTER_TO_EMAIL` or `CONTACT_TO_EMAIL` |

## One-time step: add your API key

Open **`.env.local`** (in the project root, already git-ignored) and paste your
Resend API key after `RESEND_API_KEY=`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=ma6268245@gmail.com
CONTACT_FROM_EMAIL="Gulf Fiber <noreply@gulffiber.co>"
NEWSLETTER_TO_EMAIL=
```

- Get the key at https://resend.com/api-keys (starts with `re_`).
- `CONTACT_FROM_EMAIL` uses your verified domain `gulffiber.co`. You can change
  the mailbox (e.g. `sales@gulffiber.co`) any time — no code change needed.
- Leave `NEWSLETTER_TO_EMAIL` blank to send newsletter signups to the same inbox
  as enquiries.

## Test locally

```
npm run dev
```

Then submit the contact form at http://localhost:3000/contact and the newsletter
box in the footer. Both should land in `ma6268245@gmail.com`.

## Notes

- The API key is only ever read on the server (the route handlers). It is never
  exposed to the browser, and `.env.local` is never committed.
- If the key is missing the forms fail gracefully with an inline message instead
  of crashing.

import 'server-only'
import { CONTACT_EMAIL } from '@/content/site'
import type { ContactValues } from '@/features/contact/schema'

export type SendResult = 'sent' | 'not-configured' | 'failed'

const singleLine = (v: string) => v.replace(/[\r\n]+/g, ' ')

/**
 * Emails an enquiry to the company inbox through Resend (https://resend.com).
 *
 * Environment:
 *   RESEND_API_KEY      API key from the Resend dashboard (required)
 *   CONTACT_FROM_EMAIL  Sender on a domain verified in Resend (required),
 *                       e.g. "Benchmack Website <website@benchmacktech.co.tz>"
 *   CONTACT_TO_EMAIL    Inbox for enquiries (optional, defaults to CONTACT_EMAIL)
 */
export async function sendEnquiryEmail(values: ContactValues): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL

  if (!apiKey || !from) {
    console.error('[contact] Form is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.')
    return 'not-configured'
  }

  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || '-'}`,
    `Company: ${values.company || '-'}`,
    `Service: ${values.service || '-'}`,
    `Timeline: ${values.timeline || '-'}`,
    '',
    values.message,
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: singleLine(`New enquiry from ${values.name}${values.company ? ` (${values.company})` : ''}`),
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      console.error('[contact] Resend rejected the message:', res.status, await res.text())
      return 'failed'
    }
    return 'sent'
  } catch (err) {
    console.error('[contact] Failed to reach Resend:', err)
    return 'failed'
  }
}

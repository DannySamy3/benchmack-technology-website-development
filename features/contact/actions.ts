'use server'

import { headers } from 'next/headers'
import { CONTACT_EMAIL } from '@/content/site'
import { type ContactState, readContactValues, validateContact } from '@/features/contact/schema'
import { sendEnquiryEmail } from '@/features/contact/send-email'
import { verifyTurnstile } from '@/features/contact/verify-turnstile'
import { createRateLimiter } from '@/lib/rate-limit'

// At most 5 delivered enquiries per visitor IP every 10 minutes.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 })

const SUCCESS_MESSAGE = 'Thank you — your message has been sent. We will reply within one business day.'

/**
 * The visitor's IP as reported by the reverse proxy. nginx must overwrite
 * X-Real-IP with $remote_addr (see deploy/nginx.conf) and the app must not be
 * reachable directly, otherwise visitors could spoof this header.
 */
async function clientIp(): Promise<string> {
  const h = await headers()
  return h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

/**
 * Contact form server action: honeypot → validation → Turnstile → rate limit → email.
 *
 * Optional environment:
 *   TURNSTILE_SECRET_KEY + NEXT_PUBLIC_TURNSTILE_SITE_KEY  spam protection (both or neither)
 *   CONTACT_DRY_RUN=1  log enquiries instead of emailing them (automated tests only)
 * Email delivery settings are documented in send-email.ts.
 */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (String(formData.get('website') ?? '').trim()) {
    return { status: 'success', message: SUCCESS_MESSAGE }
  }

  const values = readContactValues(formData)
  const errors = validateContact(values)
  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please check the highlighted fields.', errors, values }
  }

  const ip = await clientIp()

  if (!(await verifyTurnstile(String(formData.get('cf-turnstile-response') ?? ''), ip))) {
    return { status: 'error', message: 'Please complete the security check and try again.', values }
  }

  if (!limiter.check(ip).allowed) {
    return {
      status: 'error',
      message: `You have sent several messages in a short time. Please wait a few minutes, or email us at ${CONTACT_EMAIL}.`,
      values,
    }
  }

  if (process.env.CONTACT_DRY_RUN === '1') {
    console.info('[contact] Dry run — enquiry not emailed:', {
      service: values.service,
      chars: values.message.length,
    })
    return { status: 'success', message: SUCCESS_MESSAGE }
  }

  if ((await sendEnquiryEmail(values)) !== 'sent') {
    return {
      status: 'error',
      message: `Sorry, we could not send your message right now. Please email us directly at ${CONTACT_EMAIL}.`,
      values,
    }
  }

  return { status: 'success', message: SUCCESS_MESSAGE }
}

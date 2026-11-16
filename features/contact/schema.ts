// Contact form fields, limits and validation. Safe to import from client and server.

export const CONTACT_FIELDS = ['name', 'email', 'phone', 'company', 'service', 'timeline', 'message'] as const

export type ContactField = (typeof CONTACT_FIELDS)[number]
export type ContactValues = Record<ContactField, string>

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<ContactField, string>>
  /** Echoed back on error so the visitor does not lose what they typed. */
  values?: Partial<ContactValues>
}

/** Maximum length kept for each field; longer input is truncated. */
const MAX_LENGTH: Record<ContactField, number> = {
  name: 120,
  email: 200,
  phone: 40,
  company: 160,
  service: 80,
  timeline: 80,
  message: 5000,
}

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1–3 months',
  'Within 3–6 months',
  'Just exploring for now',
]

export const OTHER_SERVICE_OPTION = 'Not sure yet / Other'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Reads, trims and length-limits every field from submitted form data. */
export function readContactValues(formData: FormData): ContactValues {
  return Object.fromEntries(
    CONTACT_FIELDS.map((key) => [
      key,
      String(formData.get(key) ?? '')
        .trim()
        .slice(0, MAX_LENGTH[key]),
    ]),
  ) as ContactValues
}

/** Returns an error message per invalid field (empty object when valid). */
export function validateContact(values: ContactValues): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {}
  if (!values.name) errors.name = 'Please enter your name.'
  if (!values.email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (!values.message) errors.message = 'Please tell us a little about your project.'
  return errors
}

import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'

// Company identity, contact details and navigation used across the whole site.

export const SITE_URL = 'https://benchmacktech.co.tz'

export const COMPANY_NAME = 'Benchmack Technology'

export const COMPANY_LEGAL_NAME = 'Benchmack Technology Tanzania Company Limited'

export const CONTACT_EMAIL = 'support@benchmacktech.co.tz'

/**
 * Fill these in to show them across the site (header menu, contact page,
 * footer, and Google business data). Leave a value empty to hide it.
 * Use international format, e.g. '+255 712 345 678'.
 */
export const CONTACT_PHONE = ''

export const WHATSAPP_NUMBER = ''

export const BUSINESS_HOURS = 'Mon – Fri, 8:00 – 18:00 EAT'

export const LOCATION = 'Dar es Salaam, Tanzania'

/** Company profiles, e.g. { label: 'LinkedIn', href: 'https://www.linkedin.com/company/...' } */
export const socialLinks: { label: string; href: string }[] = []

export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, '')}`

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
]

export type ContactChannel = { icon: LucideIcon; label: string; href?: string; external?: boolean }

/** Ways to reach the company, in display order. Empty phone/WhatsApp values are skipped. */
export const contactChannels: ContactChannel[] = [
  { icon: Mail, label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  ...(CONTACT_PHONE ? [{ icon: Phone, label: CONTACT_PHONE, href: phoneHref(CONTACT_PHONE) }] : []),
  ...(WHATSAPP_NUMBER
    ? [
        {
          icon: MessageCircle,
          label: 'Chat with us on WhatsApp',
          href: whatsappHref(WHATSAPP_NUMBER),
          external: true,
        },
      ]
    : []),
  { icon: Clock, label: BUSINESS_HOURS },
  { icon: MapPin, label: LOCATION },
]

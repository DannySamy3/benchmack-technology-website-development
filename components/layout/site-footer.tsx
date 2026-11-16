import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import {
  COMPANY_LEGAL_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  LOCATION,
  WHATSAPP_NUMBER,
  navLinks,
  phoneHref,
  socialLinks,
  whatsappHref,
} from '@/content/site'
import { CONTAINER } from '@/lib/styles'

const linkClass = 'inline-block py-1 transition-colors hover:text-fg'

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className={`${CONTAINER} flex flex-col justify-between gap-6 py-10 md:flex-row md:items-center`}>
        <div>
          <Logo />
          <p className="mt-2 text-sm text-fg-muted">Custom software development in {LOCATION}.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div
          className={`${CONTAINER} flex flex-col justify-between gap-2.5 py-6 text-xs text-fg-subtle md:flex-row md:items-center`}
        >
          <p>
            © {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved. ·{' '}
            <Link href="/privacy" className="transition-colors hover:text-fg">
              Privacy Policy
            </Link>
          </p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all transition-colors hover:text-fg">
                {CONTACT_EMAIL}
              </a>
            </li>
            {CONTACT_PHONE && (
              <li>
                <a href={phoneHref(CONTACT_PHONE)} className="transition-colors hover:text-fg">
                  {CONTACT_PHONE}
                </a>
              </li>
            )}
            {WHATSAPP_NUMBER && (
              <li>
                <a
                  href={whatsappHref(WHATSAPP_NUMBER)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-fg"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {socialLinks.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>{LOCATION}</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

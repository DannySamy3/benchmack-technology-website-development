import Link from 'next/link'
import { Logo } from '@/components/site/header'
import { CONTAINER, navLinks } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className={`${CONTAINER} flex flex-col justify-between gap-6 py-10 md:flex-row md:items-center`}>
        <div>
          <Logo />
          <p className="mt-2 text-sm text-fg-muted">
            Custom software development in Dar es Salaam, Tanzania.
          </p>
        </div>

        <ul className="flex flex-wrap gap-7 text-sm text-fg-muted">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="transition-colors hover:text-fg">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-line">
        <div className={`${CONTAINER} flex flex-col justify-between gap-2 py-5 text-xs text-fg-subtle sm:flex-row`}>
          <p>© 2026 Benchmack Technology Tanzania Company Limited. All rights reserved.</p>
          <p>hello@benchmack.co.tz · Dar es Salaam, Tanzania</p>
        </div>
      </div>
    </footer>
  )
}

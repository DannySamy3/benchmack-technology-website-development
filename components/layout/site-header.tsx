import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { ContactDetails } from '@/components/layout/contact-details'
import { DesktopNav } from '@/components/layout/desktop-nav'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { NavLink } from '@/components/layout/nav-link'
import { navLinks } from '@/content/site'
import { CONTAINER } from '@/lib/styles'

/**
 * Site header (server component). Only the parts that depend on the current
 * route or on menu state are client components: DesktopNav, NavLink and
 * MobileMenu. Everything else is rendered once on the server.
 */
export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className={`${CONTAINER} flex h-16 items-center justify-between`}>
        <Logo />

        <DesktopNav links={navLinks} />

        <div className="flex items-center gap-3">
          <NavLink
            href="/contact"
            className="btn-lift hidden rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors sm:inline-flex"
            activeClassName="bg-brand"
            inactiveClassName="bg-fg hover:bg-brand"
          >
            Contact us
          </NavLink>

          <MobileMenu links={navLinks} logo={<Logo />} footer={<MobileMenuFooter />} />
        </div>
      </div>
    </header>
  )
}

function MobileMenuFooter() {
  return (
    <div className="mt-6 border-t border-line pt-5">
      <Link
        href="/contact"
        className="btn-lift flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-soft"
      >
        Start a project
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>

      <div className="mt-5 rounded-xl border border-line bg-ink-2/60 p-4">
        <p className="text-xs font-semibold text-fg">Direct Consultation</p>
        <div className="mt-2.5">
          <ContactDetails variant="compact" />
        </div>
      </div>
    </div>
  )
}

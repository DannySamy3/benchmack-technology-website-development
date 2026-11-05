'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layers, Menu } from 'lucide-react'
import { CONTAINER, navLinks } from '@/lib/content'

export function Logo() {
  return (
    <Link
      href="/"
      id="logo-link"
      className="group inline-flex items-center gap-2.5"
      aria-label="Benchmack Technology home"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-brand text-white transition-colors group-hover:bg-brand-soft">
        <Layers className="size-4" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="text-base font-semibold tracking-tight text-fg">
        Benchmack <span className="font-normal text-fg-subtle">Technology</span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <nav
        className={`${CONTAINER} flex h-16 items-center justify-between`}
        aria-label="Primary"
      >
        <Logo />

        <ul className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <li key={link.href}>
                <Link
                  id={`nav-${link.label.toLowerCase()}`}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 font-semibold text-brand'
                      : 'text-fg-muted hover:bg-ink-2 hover:text-fg'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            id="header-cta"
            href="/contact"
            aria-current={pathname === '/contact' ? 'page' : undefined}
            className={`hidden rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:inline-flex ${
              pathname === '/contact'
                ? 'bg-brand text-white'
                : 'bg-fg text-white hover:bg-brand'
            }`}
          >
            Contact us
          </Link>

          {/* Mobile menu */}
          <details className="group relative md:hidden">
            <summary
              id="mobile-menu-toggle"
              className="grid size-9 cursor-pointer list-none place-items-center rounded-lg border border-line bg-white text-fg hover:bg-ink-2 [&::-webkit-details-marker]:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="size-4" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-11 w-56 rounded-xl border border-line bg-white p-2 shadow-lg">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-blue-50 font-semibold text-brand'
                        : 'text-fg-muted hover:bg-ink-2 hover:text-fg'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-1 border-t border-line pt-1">
                <Link
                  href="/contact"
                  className="block rounded-lg bg-fg px-3 py-2 text-center text-sm font-medium text-white hover:bg-brand"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}

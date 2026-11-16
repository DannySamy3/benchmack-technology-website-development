'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { isActivePath } from '@/components/layout/is-active-path'

type NavItem = { label: string; href: string }

/**
 * Mobile menu button and slide-in drawer.
 *
 * Only the toggle, the drawer frame and the nav links live here. The drawer's
 * logo and footer are server-rendered and passed in as props, so opening or
 * closing the menu does not re-render them.
 */
export function MobileMenu({
  links,
  logo,
  footer,
}: {
  links: NavItem[]
  logo: React.ReactNode
  footer: React.ReactNode
}) {
  const pathname = usePathname()
  // The path the menu was opened on. Navigating anywhere else closes it
  // without an extra effect-driven render.
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const isOpen = openedOn === pathname
  // Drop a stale value (e.g. after the browser back button) so the menu does not
  // reopen when returning to that page. Only runs in that rare case.
  if (openedOn !== null && openedOn !== pathname) setOpenedOn(null)

  const close = () => setOpenedOn(null)

  // Lock page scroll and close on Escape while open.
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenedOn(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenedOn(isOpen ? null : pathname)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        className="flex size-11 items-center justify-center rounded-lg border border-line bg-white text-fg transition-colors hover:bg-ink-2 md:hidden"
      >
        {isOpen ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <Menu className="size-5" aria-hidden="true" />
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer. Any link click inside it closes the menu (event delegation). */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- delegates clicks from the links inside; keyboard users activate those links directly */}
      <aside
        id="mobile-navigation-drawer"
        aria-label="Mobile Navigation"
        inert={!isOpen}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) close()
        }}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-[340px] flex-col justify-between overflow-y-auto overscroll-contain bg-white p-5 transition-transform duration-300 ease-out sm:max-w-sm md:hidden ${
          isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            {logo}
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-lg border border-line bg-ink-2 text-fg transition-colors hover:bg-slate-200/70"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-5" aria-label="Mobile menu links">
            <ul className="flex flex-col gap-1.5">
              {links.map((link) => {
                const isActive = isActivePath(pathname, link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 font-semibold text-brand'
                          : 'text-fg hover:bg-ink-2 active:bg-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight
                        className={`size-4 ${isActive ? 'text-brand' : 'text-fg-subtle opacity-70'}`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {footer}
      </aside>
    </>
  )
}

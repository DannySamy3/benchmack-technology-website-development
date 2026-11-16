'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActivePath } from '@/components/layout/is-active-path'

type NavItem = { label: string; href: string }

/** Desktop navigation links. Client-side only to highlight the current page. */
export function DesktopNav({ links }: { links: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-1.5">
        {links.map((link) => {
          const isActive = isActivePath(pathname, link.href)
          return (
            <li key={link.href}>
              <Link
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
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActivePath } from '@/components/layout/is-active-path'

/** A link that switches styles and sets aria-current when it points at the current page. */
export function NavLink({
  href,
  className,
  activeClassName,
  inactiveClassName,
  children,
}: {
  href: string
  className: string
  activeClassName: string
  inactiveClassName: string
  children: React.ReactNode
}) {
  const isActive = isActivePath(usePathname(), href)

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      {children}
    </Link>
  )
}

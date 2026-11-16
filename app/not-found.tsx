import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONTAINER, arrowIcon, btnPrimary, btnSecondary } from '@/lib/styles'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[70dvh] items-center border-b border-line bg-ink-2/50 pt-24 pb-16">
      <div className={CONTAINER}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">Error 404</p>
        <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-3.5 max-w-xl text-pretty text-sm leading-relaxed text-fg-muted sm:text-base">
          The link may be out of date, or the page may have moved. Here are a few good places to start.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={btnPrimary}>
            Back to home
            <ArrowRight className={arrowIcon} aria-hidden="true" />
          </Link>
          <Link href="/work" className={btnSecondary}>
            See our work
          </Link>
          <Link href="/contact" className={btnSecondary}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONTAINER, arrowIcon, btnPrimary } from '@/lib/styles'

export function CtaBanner({
  title,
  text,
  label = 'Start a project',
  href = '/contact',
  tone = 'muted',
}: {
  title: string
  text: string
  label?: string
  href?: string
  tone?: 'muted' | 'white'
}) {
  return (
    <section
      className={`border-t border-line py-12 sm:py-16 ${tone === 'muted' ? 'bg-ink-2/60' : 'bg-white'}`}
    >
      <div
        className={`${CONTAINER} reveal flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}
      >
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{title}</h2>
          <p className="mt-1.5 text-sm text-fg-muted">{text}</p>
        </div>
        <Link href={href} className={btnPrimary}>
          {label}
          <ArrowRight className={arrowIcon} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

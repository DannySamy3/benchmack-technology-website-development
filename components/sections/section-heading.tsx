import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { arrowIcon, sectionLabel } from '@/lib/styles'

export function SectionHeading({
  id,
  label,
  title,
  text,
  linkHref,
  linkLabel,
}: {
  id?: string
  label: string
  title: React.ReactNode
  text?: string
  linkHref?: string
  linkLabel?: string
}) {
  return (
    <div className="reveal mb-8 sm:mb-10 flex flex-col justify-between gap-3 sm:gap-4 border-b border-line pb-5 sm:pb-7 lg:flex-row lg:items-end">
      <div className="max-w-xl">
        <p className={sectionLabel}>{label}</p>
        <h2 id={id} className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {title}
        </h2>
      </div>
      {(text || (linkHref && linkLabel)) && (
        <div className="flex flex-col items-start gap-2 lg:items-end">
          {text && (
            <p className="max-w-md text-pretty text-sm sm:text-[15px] leading-relaxed text-fg-muted lg:text-right">
              {text}
            </p>
          )}
          {linkHref && linkLabel && (
            <Link
              href={linkHref}
              className="group inline-flex min-h-[40px] items-center gap-1.5 py-1 text-sm font-medium text-brand transition-colors hover:text-brand-soft"
            >
              {linkLabel}
              <ArrowRight className={arrowIcon} aria-hidden="true" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

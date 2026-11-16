import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CONTAINER, arrowIcon, btnPrimary, btnSecondary, sectionLabel } from '@/lib/styles'

export function HomeCta() {
  return (
    <section
      className="border-t border-line bg-ink-2/60 py-12 sm:py-16 lg:py-20"
      aria-labelledby="home-cta-title"
    >
      <div className={CONTAINER}>
        <div className="reveal flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-6 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className={sectionLabel}>Ready to Get Started?</p>
            <h2
              id="home-cta-title"
              className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl"
            >
              Have a software project in mind? Let&apos;s talk.
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-fg-muted">
              Tell us about your business goals and we will get back to you within one business day with a
              clear plan and fixed-price proposal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link href="/contact" className={btnPrimary}>
              Start a project
              <ArrowRight className={arrowIcon} aria-hidden="true" />
            </Link>
            <Link href="/faq" className={btnSecondary}>
              Read common questions
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CONTAINER, caseStudies } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Selected Work | Benchmack Technology',
  description:
    'See how Benchmack Technology builds point-of-sale systems, mobile apps, and property management platforms that deliver measurable business results.',
}

export default function WorkPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-line bg-ink-2/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className={CONTAINER}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
              Selected Work
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              Built for real businesses and measurable results.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              A closer look at the systems we have designed, built, and rolled out for companies across retail, finance, and hospitality.
            </p>
          </div>
        </section>

        {/* Detailed Case Studies */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-label="Case studies">
          <div className="flex flex-col gap-10">
            {caseStudies.map((study, i) => (
              <article
                key={study.title}
                className="card-border grid overflow-hidden rounded-2xl lg:grid-cols-[1fr_1.15fr]"
              >
                <div
                  className={`aspect-[16/10] overflow-hidden border-b border-line bg-surface-2 lg:aspect-auto lg:border-b-0 ${
                    i % 2 === 1 ? 'lg:order-2 lg:border-l' : 'lg:border-r'
                  }`}
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="block size-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                        {study.category}
                      </p>
                      <span className="text-xs text-fg-subtle">{study.client}</span>
                    </div>

                    <h2 className="mt-2.5 text-balance text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                      {study.title}
                    </h2>

                    <div className="mt-5 grid gap-4 rounded-xl border border-line bg-ink-2/50 p-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold text-fg">What the client needed</p>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">
                          {study.need}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand">What we delivered</p>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-fg">
                          {study.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-5">
                    <div className="flex items-center gap-8 sm:gap-10">
                      {study.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="text-2xl font-semibold tracking-tight text-fg">
                            {m.value}
                          </p>
                          <p className="mt-0.5 text-xs text-fg-muted">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-soft"
                    >
                      Build something similar
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-line bg-ink-2/60 py-16">
          <div className={`${CONTAINER} flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Have a similar project in mind?
              </h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Let&apos;s discuss how we can design and build the right system for your business.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
            >
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

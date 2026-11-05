import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CONTAINER, industries, services } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services | Benchmack Technology',
  description:
    'Mobile applications, Point of Sale (POS), Property Management Systems (PMS), custom business software, UI/UX design, and support.',
}

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-line bg-ink-2/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className={CONTAINER}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
              Our Services
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              Practical software solutions for everyday operations.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              We handle everything from initial planning and screen design to launch, staff training, and long-term local support.
            </p>
          </div>
        </section>

        {/* Detailed Services Grid */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-label="Services list">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article
                  key={service.title}
                  className="card-border flex flex-col justify-between rounded-xl p-6 sm:p-7"
                >
                  <div>
                    <span className="mb-4 inline-grid size-10 place-items-center rounded-lg bg-blue-50 text-brand">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h2 className="text-lg font-semibold tracking-tight text-fg">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {service.text}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5 text-sm text-fg">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue-50 text-brand">
                          <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-[13.5px] leading-snug text-fg-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="border-t border-line bg-ink-2/60 py-16 lg:py-24" aria-labelledby="industries-title">
          <div className={CONTAINER}>
            <div className="mb-10 max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
                Industries We Serve
              </p>
              <h2 id="industries-title" className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Tailored to the way your industry works.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind) => (
                <div key={ind.title} className="card-border rounded-xl p-6">
                  <h3 className="text-[16px] font-semibold tracking-tight text-fg">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {ind.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-line bg-white py-16">
          <div className={`${CONTAINER} flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Need a custom system or mobile app for your business?
              </h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Talk to our team for a free consultation and fixed-price proposal.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
            >
              Discuss your project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}


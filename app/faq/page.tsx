import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CONTAINER, faqs } from '@/lib/content'

export const metadata: Metadata = {
  title: 'FAQ | Benchmack Technology',
  description:
    'Common questions about project pricing, timelines, mobile money and TRA EFD integrations, software ownership, and ongoing support.',
}

export default function FaqPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-line bg-ink-2/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className={CONTAINER}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
              Frequently Asked Questions
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              Clear answers before we start.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              Everything you need to know about how we price, build, deliver, and support software for your business.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-label="Questions and answers">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="rounded-xl border border-line bg-ink-2/60 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-fg">
                Still have a question?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                If you do not see your question here, send us a quick message and our team will be happy to help.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
              >
                Ask us directly
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((item, i) => (
                <details
                  key={item.q}
                  name="faq"
                  className="group rounded-xl border border-line bg-white px-6 open:bg-ink-2/40"
                  open={i === 0}
                >
                  <summary
                    id={`faq-${i + 1}`}
                    className="flex cursor-pointer list-none items-center justify-between gap-4 py-4.5 text-left text-[15px] font-semibold text-fg [&::-webkit-details-marker]:hidden"
                  >
                    {item.q}
                    <Plus
                      className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45 group-open:text-brand"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-5 pr-6 text-sm leading-relaxed text-fg-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}


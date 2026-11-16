import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { PageHeader } from '@/components/sections/page-header'
import { JsonLd } from '@/components/ui/json-ld'
import { faqs } from '@/content/faqs'
import { pageMetadata } from '@/lib/seo'
import { CONTAINER, arrowIcon, btnPrimary } from '@/lib/styles'

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Common questions about project pricing, timelines, mobile money and TRA EFD integrations, software ownership, and ongoing support.',
  path: '/faq',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        label="Frequently Asked Questions"
        title="Clear answers before we start."
        text="Everything you need to know about how we price, build, deliver, and support software for your business."
      />

      {/* FAQ List */}
      <section className={`${CONTAINER} py-12 lg:py-24`} aria-label="Questions and answers">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="animate-fade-up delay-2 rounded-xl border border-line bg-ink-2/60 p-5 sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-fg">Still have a question?</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              If you do not see your question here, send us a quick message and our team will be happy to
              help.
            </p>
            <Link href="/contact" className={`${btnPrimary} mt-5`}>
              Ask us directly
              <ArrowRight className={arrowIcon} aria-hidden="true" />
            </Link>
          </div>

          <div className="animate-fade-up delay-3 flex flex-col gap-3">
            {faqs.map((item, i) => (
              <details
                key={item.q}
                name="faq"
                className="group rounded-xl border border-line bg-white px-4 sm:px-6 transition-colors hover:border-line-strong open:bg-ink-2/40"
                open={i === 0}
              >
                <summary
                  id={`faq-${i + 1}`}
                  className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-fg sm:text-[15px] [&::-webkit-details-marker]:hidden"
                >
                  {item.q}
                  <Plus
                    className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 group-open:rotate-45 group-open:text-brand"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-4 pt-1 pr-2 text-sm leading-relaxed text-fg-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <JsonLd data={faqJsonLd} />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CONTAINER, team, testimonials, values } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Us | Benchmack Technology',
  description:
    'Learn about Benchmack Technology, our team in Dar es Salaam, and how we partner with businesses to build dependable software.',
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-line bg-ink-2/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className={CONTAINER}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
              About Benchmack Technology
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              A dedicated software partner based in Dar es Salaam.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              We founded Benchmack Technology with a simple goal: to build reliable, easy-to-use software that solves real operational problems for businesses in Tanzania and beyond.
            </p>
          </div>
        </section>

        {/* What We Stand For */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-labelledby="values-title">
          <div className="mb-10 max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
              Why Clients Choose Us
            </p>
            <h2 id="values-title" className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Dependable delivery without the complexity.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="card-border rounded-xl p-6">
                <h3 className="text-lg font-semibold tracking-tight text-fg">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Team */}
        <section className="border-t border-line bg-ink-2/60 py-16 lg:py-24" aria-labelledby="team-title">
          <div className={CONTAINER}>
            <div className="mb-10 max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
                Our Team
              </p>
              <h2 id="team-title" className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Work directly with the people building your product.
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted">
                You never get passed around between account managers. You work directly with our leads from initial planning through launch.
              </p>
            </div>

            <ul className="grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <li
                  key={member.name}
                  className="card-border rounded-xl p-6"
                >
                  <span className="mb-4 grid size-10 place-items-center rounded-lg bg-fg text-xs font-semibold text-white">
                    {member.initials}
                  </span>
                  <h3 className="text-[17px] font-semibold text-fg">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-brand">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {member.bio}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Client Stories */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-labelledby="stories-title">
          <div className="mb-10 max-w-xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
              Client Stories
            </p>
            <h2 id="stories-title" className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Trusted by businesses across Tanzania.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.quote}
                className="card-border flex flex-col justify-between rounded-xl p-6"
              >
                <blockquote className="text-pretty text-[15px] leading-relaxed text-fg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-fg">{t.name}</p>
                  <p className="text-xs text-fg-subtle">{t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-line bg-ink-2/60 py-16">
          <div className={`${CONTAINER} flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center`}>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                Want to work with our team?
              </h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Reach out to schedule a friendly conversation about your business needs.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
            >
              Contact us
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

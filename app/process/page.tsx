import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CONTAINER, process, workingModels } from '@/lib/content'

export const metadata: Metadata = {
  title: 'How We Work | Benchmack Technology',
  description:
    'Our simple, transparent 4-step process from initial idea and screen design to software launch and ongoing support.',
}

export default function ProcessPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-line bg-ink-2/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className={CONTAINER}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
              How We Work
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              A simple, transparent process from idea to launch.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              No confusing jargon or surprises — just clear milestones, regular demos every two weeks, and a team that stays with you after launch.
            </p>
          </div>
        </section>

        {/* 4-Step Process */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-label="Four-step process">
          <ol className="grid gap-6 md:grid-cols-2">
            {process.map((item) => (
              <li
                key={item.step}
                className="card-border flex flex-col justify-between rounded-xl p-6 sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand">
                      Step {item.step}
                    </span>
                    <span className="text-xs font-medium text-fg-subtle">
                      {item.duration}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-fg">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                    {item.text}
                  </p>
                </div>

                <div className="mt-6 border-t border-line pt-4">
                  <p className="text-xs font-semibold text-fg">What you get:</p>
                  <p className="mt-0.5 text-sm text-fg-muted">{item.outcome}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Ways to Work Together */}
        <section className="border-t border-line bg-ink-2/60 py-16 lg:py-24" aria-labelledby="models-title">
          <div className={CONTAINER}>
            <div className="mb-10 max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
                Ways to Work Together
              </p>
              <h2 id="models-title" className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Flexible options that fit your stage and budget.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {workingModels.map((model) => (
                <div
                  key={model.title}
                  className="card-border flex flex-col justify-between rounded-xl p-6 sm:p-7"
                >
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-fg">
                      {model.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {model.text}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                    {model.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-fg">
                        <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue-50 text-brand">
                          <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-[13.5px] leading-snug text-fg-muted">{pt}</span>
                      </li>
                    ))}
                  </ul>
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
                Ready to start with Step 01?
              </h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Book a free discovery conversation and receive a clear plan for your project.
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


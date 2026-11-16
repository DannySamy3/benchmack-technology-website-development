import { CtaBanner } from '@/components/sections/cta-banner'
import { PageHeader } from '@/components/sections/page-header'
import { SectionHeading } from '@/components/sections/section-heading'
import { CheckList } from '@/components/ui/check-list'
import { processSteps, workingModels } from '@/content/process'
import { pageMetadata } from '@/lib/seo'
import { CONTAINER } from '@/lib/styles'

export const metadata = pageMetadata({
  title: 'How We Work',
  description:
    'Our simple, transparent 4-step process from initial idea and screen design to software launch and ongoing support.',
  path: '/process',
})

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        label="How We Work"
        title="A simple, transparent process from idea to launch."
        text="No confusing jargon or surprises — just clear milestones, regular demos every two weeks, and a team that stays with you after launch."
      />

      <section className={`${CONTAINER} py-12 lg:py-24`} aria-label="Four-step process">
        <ol className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {processSteps.map((item) => (
            <li
              key={item.step}
              className="reveal card-border flex flex-col justify-between rounded-xl p-5 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand">
                    Step {item.step}
                  </span>
                  <span className="text-xs font-medium text-fg-subtle">{item.duration}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-fg">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted sm:text-[15px]">{item.text}</p>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-xs font-semibold text-fg">What you get:</p>
                <p className="mt-0.5 text-sm text-fg-muted">{item.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-ink-2/60 py-12 lg:py-24" aria-labelledby="models-title">
        <div className={CONTAINER}>
          <SectionHeading
            id="models-title"
            label="Ways to Work Together"
            title="Flexible options that fit your stage and budget."
          />

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
            {workingModels.map((model) => (
              <div
                key={model.title}
                className="reveal card-border flex flex-col justify-between rounded-xl p-5 sm:p-7"
              >
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">{model.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{model.text}</p>
                </div>
                <CheckList items={model.points} className="mt-6 border-t border-line pt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to start with Step 01?"
        text="Book a free discovery conversation and receive a clear plan for your project."
        tone="white"
      />
    </>
  )
}

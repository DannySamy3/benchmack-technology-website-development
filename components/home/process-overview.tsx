import { SectionHeading } from '@/components/sections/section-heading'
import { processSteps } from '@/content/process'
import { CONTAINER } from '@/lib/styles'

export function ProcessOverview() {
  return (
    <section className="border-y border-line bg-ink-2/60 py-16 lg:py-24" aria-labelledby="home-process-title">
      <div className={CONTAINER}>
        <SectionHeading
          id="home-process-title"
          label="How We Work"
          title="Four clear steps, with a working demo every two weeks."
          text="No confusing jargon or surprises — just clear milestones and working software you can review every two weeks."
          linkHref="/process"
          linkLabel="Learn more about our process"
        />

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item) => (
            <li key={item.step} className="reveal card-border rounded-xl p-6">
              <span className="text-xs font-semibold text-brand">Step {item.step}</span>
              <h3 className="mt-2 text-[17px] font-semibold tracking-tight text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

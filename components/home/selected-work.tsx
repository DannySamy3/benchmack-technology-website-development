import { SectionHeading } from '@/components/sections/section-heading'
import { CaseStudyCard } from '@/components/work/case-study-card'
import { caseStudies } from '@/content/work'
import { CONTAINER } from '@/lib/styles'

export function SelectedWork() {
  return (
    <section className="border-y border-line bg-ink-2/60 py-16 lg:py-24" aria-labelledby="home-work-title">
      <div className={CONTAINER}>
        <SectionHeading
          id="home-work-title"
          label="Selected Work"
          title="Systems running in real businesses today."
          text="A look at some of the platforms we have designed, built, and rolled out for our clients."
          linkHref="/work"
          linkLabel="See all projects"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  )
}

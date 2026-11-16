import { CtaBanner } from '@/components/sections/cta-banner'
import { PageHeader } from '@/components/sections/page-header'
import { CaseStudyRow } from '@/components/work/case-study-row'
import { caseStudies } from '@/content/work'
import { pageMetadata } from '@/lib/seo'
import { CONTAINER } from '@/lib/styles'

export const metadata = pageMetadata({
  title: 'Selected Work',
  description:
    'Case studies from healthcare, retail, financial services, and hospitality: the platforms Benchmack Technology has designed, built, and launched.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Selected Work"
        title="Built for real businesses and measurable results."
        text="A closer look at the systems we have designed, built, and rolled out for organizations across healthcare, retail, financial services, and hospitality."
      />

      <section className={`${CONTAINER} py-12 lg:py-24`} aria-label="Case studies">
        <div className="flex flex-col gap-8 sm:gap-10">
          {caseStudies.map((study, index) => (
            <CaseStudyRow key={study.slug} study={study} index={index} />
          ))}
        </div>
      </section>

      <CtaBanner
        title="Have a similar project in mind?"
        text="Let's discuss how we can design and build the right system for your business."
      />
    </>
  )
}

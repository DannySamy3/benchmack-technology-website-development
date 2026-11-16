import Image from 'next/image'
import { PageHeader } from '@/components/sections/page-header'
import { SectionHeading } from '@/components/sections/section-heading'
import { CtaBanner } from '@/components/sections/cta-banner'
import { team, values } from '@/content/company'
import { CONTAINER } from '@/lib/styles'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'About Us',
  description:
    'Learn about Benchmack Technology, our team in Dar es Salaam, and how we partner with businesses to build dependable software.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Benchmack Technology"
        title="A dedicated software partner based in Dar es Salaam."
        text="We founded Benchmack Technology with a simple goal: to build reliable, easy-to-use software that solves real operational problems for businesses in Tanzania and beyond."
      />

      {/* What We Stand For */}
      <section className={`${CONTAINER} py-12 lg:py-24`} aria-labelledby="values-title">
        <SectionHeading
          id="values-title"
          label="Why Clients Choose Us"
          title="Dependable delivery without the complexity."
        />

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="reveal card-border rounded-xl p-5 sm:p-6">
              <h3 className="text-lg font-semibold tracking-tight text-fg">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="border-t border-line bg-ink-2/60 py-12 lg:py-24" aria-labelledby="team-title">
        <div className={CONTAINER}>
          <SectionHeading
            id="team-title"
            label="Our Leadership"
            title="The people accountable for your project."
            text="You never get passed around between account managers. Our leadership stays involved from the first conversation through launch and ongoing support."
          />

          <ul className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {team.map((member) => (
              <li key={member.name} className="reveal card-border flex flex-col overflow-hidden rounded-xl">
                <div className="relative aspect-square w-full overflow-hidden border-b border-line bg-surface-2">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`img-zoom object-cover ${member.imagePosition}`}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-[17px] font-semibold text-fg">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-brand">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{member.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title="Want to work with our team?"
        text="Reach out to schedule a friendly conversation about your business needs."
        label="Contact us"
        tone="white"
      />
    </>
  )
}

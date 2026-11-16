import { CtaBanner } from '@/components/sections/cta-banner'
import { PageHeader } from '@/components/sections/page-header'
import { SectionHeading } from '@/components/sections/section-heading'
import { ServiceCard } from '@/components/services/service-card'
import { industries, services } from '@/content/services'
import { pageMetadata } from '@/lib/seo'
import { CONTAINER } from '@/lib/styles'

export const metadata = pageMetadata({
  title: 'Services',
  description:
    'Mobile applications, Point of Sale (POS), Property Management Systems (PMS), custom business software, UI/UX design, and support.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Our Services"
        title="Practical software solutions for everyday operations."
        text="We handle everything from initial planning and screen design to launch, staff training, and long-term local support."
      />

      <section className={`${CONTAINER} py-12 lg:py-24`} aria-label="Services list">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} headingLevel="h2" showHighlights />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink-2/60 py-12 lg:py-24" aria-labelledby="industries-title">
        <div className={CONTAINER}>
          <SectionHeading
            id="industries-title"
            label="Industries We Serve"
            title="Tailored to the way your industry works."
            text="Whether you manage retail stores, hotel properties, financial services, or distribution fleets, we build around your real workflows."
          />

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry.title} className="reveal card-border rounded-xl p-5 sm:p-6">
                <h3 className="text-[16px] font-semibold tracking-tight text-fg">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{industry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need a custom system or mobile app for your business?"
        text="Talk to our team for a free consultation and fixed-price proposal."
        label="Discuss your project"
        tone="white"
      />
    </>
  )
}

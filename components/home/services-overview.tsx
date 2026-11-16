import { SectionHeading } from '@/components/sections/section-heading'
import { ServiceCard } from '@/components/services/service-card'
import { services } from '@/content/services'
import { CONTAINER } from '@/lib/styles'

export function ServicesOverview() {
  return (
    <section className={`${CONTAINER} py-16 lg:py-24`} aria-labelledby="home-services-title">
      <SectionHeading
        id="home-services-title"
        label="What We Do"
        title="One team for your apps, systems, and support."
        text="From customer mobile apps to multi-branch retail and hotel systems, we build software that makes daily work faster and simpler."
        linkHref="/services"
        linkLabel="See full service details"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  )
}

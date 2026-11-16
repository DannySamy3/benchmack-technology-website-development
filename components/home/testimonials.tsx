import { SectionHeading } from '@/components/sections/section-heading'
import { testimonials } from '@/content/company'
import { CONTAINER } from '@/lib/styles'

export function Testimonials() {
  return (
    <section className={`${CONTAINER} py-16 lg:py-24`} aria-labelledby="home-testimonials-title">
      <SectionHeading
        id="home-testimonials-title"
        label="Trusted by Clients"
        title="Long-term partnerships built on dependable delivery."
        text="What business owners and operations leaders say about working with Benchmack."
        linkHref="/about"
        linkLabel="Meet our team"
      />

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.quote} className="reveal card-border flex flex-col justify-between rounded-xl p-6">
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
  )
}

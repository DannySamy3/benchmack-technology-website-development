import { ContactDetails } from '@/components/layout/contact-details'
import { PageHeader } from '@/components/sections/page-header'
import { serviceTitles } from '@/content/services'
import { ContactForm } from '@/features/contact/contact-form'
import { pageMetadata } from '@/lib/seo'
import { CONTAINER } from '@/lib/styles'

export const metadata = pageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Benchmack Technology in Dar es Salaam to discuss your software, mobile app, POS, or property management project.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact Us"
        title="Let's discuss your project."
        text="Tell us a little about what you want to build and we will get back to you within one business day to schedule a free consultation."
      />

      <section className={`${CONTAINER} py-12 lg:py-24`} aria-label="Contact details and form">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="animate-fade-up delay-2">
            <h2 className="text-xl font-semibold tracking-tight text-fg">Reach us directly</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
              Prefer email or a direct conversation? Our team in Dar es Salaam is available Monday through
              Friday.
            </p>

            <div className="mt-6">
              <ContactDetails variant="full" />
            </div>

            <div className="mt-8 sm:mt-10 rounded-xl border border-line bg-ink-2/60 p-5">
              <h3 className="text-sm font-semibold text-fg">What happens after you message us?</h3>
              <ol className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-fg-muted">
                <li>1. We reply within one business day to arrange a short call or meeting.</li>
                <li>2. We listen to your goals and answer any questions you have.</li>
                <li>3. We prepare a clear project plan, timeline, and fixed-price quote.</li>
              </ol>
            </div>
          </div>

          <ContactForm serviceOptions={serviceTitles} />
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { CONTAINER, services } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact Us | Benchmack Technology',
  description:
    'Get in touch with Benchmack Technology in Dar es Salaam to discuss your software, mobile app, POS, or property management project.',
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Page Header */}
        <section className="border-b border-line bg-ink-2/50 pt-28 pb-14 sm:pt-32 sm:pb-16">
          <div className={CONTAINER}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
              Contact Us
            </p>
            <h1 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
              Let&apos;s discuss your project.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              Tell us a little about what you want to build and we will get back to you within one business day to schedule a free consultation.
            </p>
          </div>
        </section>

        {/* Contact Details + Form */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-label="Contact details and form">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg">
                Reach us directly
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                Prefer email or a direct conversation? Our team in Dar es Salaam is available Monday through Friday.
              </p>

              <ul className="mt-6 flex flex-col gap-4 text-sm text-fg">
                <li>
                  <a
                    href="mailto:hello@benchmack.co.tz"
                    className="inline-flex items-center gap-3 font-medium transition-colors hover:text-brand"
                  >
                    <span className="grid size-9 place-items-center rounded-lg border border-line bg-ink-2 text-brand">
                      <Mail className="size-4" aria-hidden="true" />
                    </span>
                    hello@benchmack.co.tz
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-line bg-ink-2 text-brand">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  Mon – Fri, 8:00 – 18:00 EAT
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-line bg-ink-2 text-brand">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  Dar es Salaam, Tanzania
                </li>
              </ul>

              <div className="mt-10 rounded-xl border border-line bg-ink-2/60 p-5">
                <h3 className="text-sm font-semibold text-fg">
                  What happens after you message us?
                </h3>
                <ol className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-fg-muted">
                  <li>1. We reply within one business day to arrange a short call or meeting.</li>
                  <li>2. We listen to your goals and answer any questions you have.</li>
                  <li>3. We prepare a clear project plan, timeline, and fixed-price quote.</li>
                </ol>
              </div>
            </div>

            <form
              id="contact-form"
              action="mailto:hello@benchmack.co.tz"
              method="post"
              encType="text/plain"
              className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 shadow-2xs sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-sm font-medium text-fg">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-brand"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium text-fg">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className="text-sm font-medium text-fg">
                    Company (optional)
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Your company"
                    className="rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-brand"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-service" className="text-sm font-medium text-fg">
                    What do you need?
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    defaultValue=""
                    className="rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-fg focus:border-brand"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-medium text-fg">
                  How can we help?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Briefly describe your project or business need…"
                  className="resize-none rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-brand"
                />
              </div>

              <button
                id="contact-submit"
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
              >
                Send message
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}


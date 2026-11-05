import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import { HeroShowcase } from '@/components/site/hero-showcase'
import { CONTAINER, stats } from '@/lib/content'

const quickPages = [
  {
    label: '01 · Services',
    title: 'What we build',
    text: 'Mobile apps, Point of Sale (POS), Property Management (PMS), and custom business software.',
    href: '/services',
  },
  {
    label: '02 · Selected Work',
    title: 'Case studies & results',
    text: 'See how our software powers 30+ retail branches, fintech wallets, and hotel groups.',
    href: '/work',
  },
  {
    label: '03 · How We Work',
    title: 'Our 4-step process',
    text: 'How we take your project from initial idea and screen design to launch and staff training.',
    href: '/process',
  },
  {
    label: '04 · About Us',
    title: 'Our team & client stories',
    text: 'Meet the Dar es Salaam team behind Benchmack and read feedback from our clients.',
    href: '/about',
  },
]

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* ================= HERO ================= */}
        <section
          className="flex min-h-dvh flex-col justify-between border-b border-line bg-ink-2/50 pt-24 pb-10 sm:pt-28 sm:pb-12"
          aria-labelledby="hero-title"
        >
          <div className={`${CONTAINER} my-auto grid items-center gap-10 py-8 lg:grid-cols-[1.06fr_.94fr] lg:gap-16`}>
            <div>
              <p className="mb-3.5 text-xs font-semibold uppercase tracking-wider text-brand">
                Software Development Company · Dar es Salaam
              </p>

              <h1
                id="hero-title"
                className="text-balance text-4xl font-semibold leading-[1.12] tracking-tight text-fg sm:text-5xl lg:text-[3.25rem]"
              >
                Reliable software built around how your business works.
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-[17px]">
                We design, build, and support mobile apps, point-of-sale systems, property management software, and custom web platforms for growing businesses across Tanzania and beyond.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  id="hero-cta-primary"
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-soft"
                >
                  Start a project
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  id="hero-cta-secondary"
                  href="/services"
                  className="inline-flex items-center rounded-lg border border-line-strong bg-white px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-ink-2"
                >
                  Explore our services
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-medium text-fg-muted">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
                  Fixed-price proposals
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-brand" aria-hidden="true" />
                  100% software ownership
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-4 text-brand" aria-hidden="true" />
                  Local team &amp; support
                </span>
              </div>
            </div>

            <div>
              <HeroShowcase />
            </div>
          </div>

          {/* Key Figures */}
          <div className={`${CONTAINER} mt-8`}>
            <div className="grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold tracking-tight text-fg">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EXPLORE PAGES DIRECTORY ================= */}
        <section className={`${CONTAINER} py-16 lg:py-24`} aria-labelledby="explore-title">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-line pb-7 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
                Explore Benchmack
              </p>
              <h2 id="explore-title" className="text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Everything you need to take your software from idea to launch.
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">
              Select a section below to explore our services, past projects, delivery process, and team.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-border group flex flex-col justify-between rounded-xl p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand">{item.label}</span>
                    <ArrowUpRight
                      className="size-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.text}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-fg group-hover:text-brand">
                  Open page
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

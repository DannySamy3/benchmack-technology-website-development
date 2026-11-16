import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react'
import { stats } from '@/content/company'
import { CONTAINER, arrowIcon, btnPrimary, btnSecondary } from '@/lib/styles'

export function Hero() {
  return (
    <section
      className="flex min-h-dvh flex-col justify-between border-b border-line bg-ink-2/50 pt-20 pb-8 sm:pt-28 sm:pb-12"
      aria-labelledby="hero-title"
    >
      <div
        className={`${CONTAINER} my-auto grid items-center gap-8 py-4 sm:gap-10 sm:py-8 lg:grid-cols-[1.06fr_.94fr] lg:gap-16`}
      >
        <div>
          <p className="animate-fade-up mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
            Software Development Company · Dar es Salaam
          </p>

          <h1
            id="hero-title"
            className="animate-fade-up delay-1 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-5xl lg:text-[3.25rem]"
          >
            Reliable software built around how your business works.
          </h1>

          <p className="animate-fade-up delay-2 mt-4 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:mt-5 sm:text-[17px]">
            We design, build, and support mobile apps, point-of-sale systems, property management software,
            and custom web platforms for growing businesses across Tanzania and beyond.
          </p>

          <div className="animate-fade-up delay-3 mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <Link href="/contact" className={btnPrimary}>
              Start a project
              <ArrowRight className={arrowIcon} aria-hidden="true" />
            </Link>
            <Link href="/services" className={btnSecondary}>
              Explore our services
            </Link>
          </div>

          <ul className="animate-fade-up delay-4 mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-fg-muted">
            <li className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
              Fixed-price proposals
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-brand shrink-0" aria-hidden="true" />
              100% software ownership
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-brand shrink-0" aria-hidden="true" />
              Local team &amp; support
            </li>
          </ul>
        </div>

        <HeroShowcase />
      </div>

      {/* Key figures */}
      <div className={`${CONTAINER} animate-fade-up delay-4 mt-6 sm:mt-8`}>
        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4 sm:gap-6 sm:pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-0.5 text-xs text-fg-muted sm:text-sm">{stat.label}</dt>
              <dd className="order-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function HeroShowcase() {
  return (
    <div className="animate-fade-up delay-2 relative w-full">
      <div className="animate-float-gentle group overflow-hidden rounded-2xl border border-line bg-white p-2.5 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="overflow-hidden rounded-xl bg-ink-2">
          <Image
            src="/hero-showcase.jpg"
            alt="Web and mobile business software designed by Benchmack Technology"
            width={1200}
            height={896}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="img-zoom block aspect-[16/10] w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-2 py-0.5 text-xs text-fg-muted">
          <span className="font-medium text-fg">Web, Mobile &amp; Point-of-Sale Systems</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="size-3.5 text-emerald-600" aria-hidden="true" />
            Tailored to your business
          </span>
        </div>
      </div>
    </div>
  )
}

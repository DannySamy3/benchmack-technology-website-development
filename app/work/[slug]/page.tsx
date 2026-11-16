import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { CtaBanner } from '@/components/sections/cta-banner'
import { CaseStudyCard } from '@/components/work/case-study-card'
import { caseStudies, getCaseStudy } from '@/content/work'
import { pageMetadata } from '@/lib/seo'
import { CONTAINER, sectionLabel } from '@/lib/styles'

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return pageMetadata({
    title: study.title,
    description: study.need,
    path: `/work/${study.slug}`,
    image: study.image,
  })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const others = caseStudies.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Header */}
      <section className="border-b border-line bg-ink-2/50 pt-20 pb-10 sm:pt-28 sm:pb-14">
        <div className={CONTAINER}>
          <Link
            href="/work"
            className="group mb-6 inline-flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-fg-muted transition-colors hover:text-brand"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            All projects
          </Link>

          <div className="flex items-start gap-4">
            {study.logo && (
              <Image
                src={study.logo}
                alt=""
                width={56}
                height={56}
                className="animate-fade-up hidden size-14 shrink-0 rounded-xl border border-line bg-white p-1.5 sm:block"
              />
            )}
            <div>
              <p className="animate-fade-up mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
                {study.category} · {study.client}
              </p>
              <h1 className="animate-fade-up delay-1 max-w-3xl text-balance text-2xl font-semibold tracking-tight text-fg sm:text-4xl">
                {study.title}
              </h1>
            </div>
          </div>

          {study.url && (
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-up delay-2 btn-lift group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-soft"
            >
              {study.urlLabel ?? 'Visit live platform'}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </section>

      {/* Showcase + story */}
      <section className={`${CONTAINER} py-12 lg:py-20`}>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
          <Image
            src={study.image}
            alt={`${study.title}: product screens`}
            width={1600}
            height={1000}
            sizes="(min-width: 1440px) 1312px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="block aspect-[16/10] w-full object-cover"
          />
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-6 sm:gap-6 sm:py-8">
          {study.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <dt className="order-2 mt-0.5 text-xs text-fg-muted sm:text-sm">{m.label}</dt>
              <dd className="order-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <h2 className={sectionLabel}>The challenge</h2>
            <p className="text-pretty text-base leading-relaxed text-fg sm:text-lg">{study.need}</p>
          </div>
          <div className="reveal">
            <h2 className={sectionLabel}>What we delivered</h2>
            <p className="text-pretty text-base leading-relaxed text-fg sm:text-lg">{study.text}</p>
          </div>
        </div>
      </section>

      {/* More work */}
      {others.length > 0 && (
        <section
          className="border-t border-line bg-ink-2/60 py-12 lg:py-20"
          aria-labelledby="more-work-title"
        >
          <div className={CONTAINER}>
            <h2 id="more-work-title" className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              More of our work
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {others.map((other) => (
                <CaseStudyCard key={other.slug} study={other} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Have a similar project in mind?"
        text="Tell us what you need and we will reply within one business day with next steps."
        label="Build something similar"
        tone="white"
      />
    </>
  )
}

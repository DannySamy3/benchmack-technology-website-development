import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { LiveBadge } from '@/components/work/live-badge'
import type { CaseStudy } from '@/content/work'

/** Wide case study row for the /work page. Image alternates sides; the first image loads eagerly. */
export function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
  const href = `/work/${study.slug}`
  const isFirst = index === 0

  return (
    <article className="reveal card-border grid overflow-hidden rounded-xl sm:rounded-2xl lg:grid-cols-[1fr_1.15fr]">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block aspect-[16/10] overflow-hidden border-b border-line bg-surface-2 lg:aspect-auto lg:border-b-0 ${
          index % 2 === 1 ? 'lg:order-2 lg:border-l' : 'lg:border-r'
        }`}
      >
        <Image
          src={study.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          fetchPriority={isFirst ? 'high' : undefined}
          loading={isFirst ? 'eager' : 'lazy'}
          className="img-zoom object-cover"
        />
      </Link>

      <div className="flex flex-col justify-between gap-6 p-5 sm:p-8 lg:p-10">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">{study.category}</p>
            <div className="flex items-center gap-2.5">
              {study.url && <LiveBadge />}
              <span className="text-xs text-fg-subtle">{study.client}</span>
            </div>
          </div>

          <h2 className="mt-2 text-balance text-lg font-semibold tracking-tight text-fg sm:text-2xl">
            <Link href={href} className="transition-colors hover:text-brand">
              {study.title}
            </Link>
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{study.text}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-line pt-5">
          <dl className="flex items-center gap-6 sm:gap-10">
            {study.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-0.5 text-xs text-fg-muted">{m.label}</dt>
                <dd className="order-1 text-xl sm:text-2xl font-semibold tracking-tight text-fg">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={href}
              className="btn-lift group inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand-soft"
              aria-label={`Read case study: ${study.title}`}
            >
              Read case study
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            {study.url && (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[40px] items-center justify-center gap-1.5 text-sm font-medium text-brand hover:text-brand-soft"
              >
                {study.urlLabel ?? 'Visit live platform'}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

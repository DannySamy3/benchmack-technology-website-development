import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { LiveBadge } from '@/components/work/live-badge'
import type { CaseStudy } from '@/content/work'

/** Compact case study card: used on the home page and under "More of our work". */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const href = `/work/${study.slug}`

  return (
    <article className="reveal card-border flex flex-col overflow-hidden rounded-xl">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={study.image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="img-zoom object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 p-6">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">{study.category}</p>
            {study.url && <LiveBadge />}
          </div>
          <h3 className="mt-2 text-balance text-lg font-semibold leading-snug tracking-tight text-fg">
            <Link href={href} className="transition-colors hover:text-brand">
              {study.title}
            </Link>
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{study.text}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <dl className="flex items-center gap-6">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-0.5 text-xs text-fg-muted">{m.label}</dt>
                <dd className="order-1 text-xl font-semibold tracking-tight text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={href}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-brand-soft"
            aria-label={`Read case study: ${study.title}`}
          >
            Read case study
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}

import type { Service } from '@/content/services'
import { CheckList } from '@/components/ui/check-list'

/**
 * A service with its icon and summary. The Services page shows the highlight
 * bullets too (`showHighlights`); the home page shows the summary only.
 */
export function ServiceCard({
  service,
  headingLevel: Heading = 'h3',
  showHighlights = false,
}: {
  service: Service
  headingLevel?: 'h2' | 'h3'
  showHighlights?: boolean
}) {
  const Icon = service.icon

  return (
    <article className="reveal card-border flex flex-col justify-between rounded-xl p-5 sm:p-6">
      <div>
        <span className="mb-4 inline-grid size-10 place-items-center rounded-lg bg-blue-50 text-brand">
          <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <Heading className="text-[17px] font-semibold tracking-tight text-fg">{service.title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.text}</p>
      </div>

      {showHighlights && <CheckList items={service.highlights} className="mt-6 border-t border-line pt-5" />}
    </article>
  )
}

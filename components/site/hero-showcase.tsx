import { CheckCircle2 } from 'lucide-react'

export function HeroShowcase() {
  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-2xl border border-line bg-white p-2.5 shadow-xs">
        <div className="overflow-hidden rounded-xl bg-ink-2">
          <img
            src="/hero-showcase.jpg"
            alt="Web and mobile business software designed by Benchmack Technology"
            className="block aspect-[16/10] w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-2 py-0.5 text-xs text-fg-muted">
          <span className="font-medium text-fg">
            Web, Mobile &amp; Point-of-Sale Systems
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="size-3.5 text-emerald-600" aria-hidden="true" />
            Tailored to your business
          </span>
        </div>
      </div>
    </div>
  )
}

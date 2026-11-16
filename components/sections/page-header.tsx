import { CONTAINER } from '@/lib/styles'

export function PageHeader({
  label,
  title,
  text,
  children,
}: {
  label: string
  title: React.ReactNode
  text?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-line bg-ink-2/50 pt-20 pb-10 sm:pt-32 sm:pb-16">
      <div className={CONTAINER}>
        <p className="animate-fade-up mb-3 text-xs font-semibold uppercase tracking-wider text-brand">
          {label}
        </p>
        <h1 className="animate-fade-up delay-1 max-w-2xl text-balance text-2xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        {text && (
          <p className="animate-fade-up delay-2 mt-3.5 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted sm:text-base">
            {text}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

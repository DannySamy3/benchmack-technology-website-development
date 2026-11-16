import { SectionHeading } from '@/components/sections/section-heading'
import { technology } from '@/content/technology'
import { CONTAINER } from '@/lib/styles'

export function TechnologyOverview() {
  return (
    <section className={`${CONTAINER} py-16 lg:py-24`} aria-labelledby="home-tech-title">
      <SectionHeading
        id="home-tech-title"
        label="Technology"
        title="Proven tools, local integrations, built-in security."
        text="We build on a modern, well-supported stack and connect your software to the payment and tax services your business already uses."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {technology.map((group) => (
          <div key={group.title} className="reveal card-border rounded-xl p-6">
            <h3 className="text-[17px] font-semibold tracking-tight text-fg">{group.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{group.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-ink-2 px-2.5 py-1 text-xs font-medium text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

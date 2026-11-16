import { Check } from 'lucide-react'

/** Bulleted list with blue check marks. */
export function CheckList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue-50 text-brand">
            <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-[13.5px] leading-snug text-fg-muted">{item}</span>
        </li>
      ))}
    </ul>
  )
}

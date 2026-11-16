import Link from 'next/link'
import { BrandMark } from '@/components/brand/brand-mark'

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Benchmack Technology home">
      <span className="grid size-8 place-items-center rounded-lg bg-brand transition-colors group-hover:bg-brand-soft">
        <BrandMark size={16} strokeWidth={2.2} />
      </span>
      <span className="text-base font-semibold tracking-tight text-fg">
        Benchmack <span className="font-normal text-fg-subtle">Technology</span>
      </span>
    </Link>
  )
}

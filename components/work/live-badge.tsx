/** Green "Live Platform" pill for case studies with a public URL. */
export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
      <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      Live Platform
    </span>
  )
}

import { contactChannels } from '@/content/site'

const styles = {
  // Large icon tiles, used on the contact page.
  full: {
    list: 'flex flex-col gap-3 sm:gap-4 text-sm text-fg',
    row: 'inline-flex min-h-[44px] items-center gap-3',
    link: 'font-medium transition-colors hover:text-brand',
    iconWrap: 'grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-ink-2 text-brand',
    icon: 'size-4',
    label: 'break-all',
  },
  // Small inline icons, used in the mobile menu.
  compact: {
    list: 'flex flex-col gap-2 text-xs text-fg-muted',
    row: 'flex items-center gap-2 py-0.5',
    link: 'transition-colors hover:text-brand',
    iconWrap: 'shrink-0 text-brand',
    icon: 'size-3.5',
    label: 'truncate',
  },
}

/** Email, phone, WhatsApp, hours and location from `content/site.ts`. */
export function ContactDetails({ variant }: { variant: keyof typeof styles }) {
  const s = styles[variant]

  return (
    <ul className={s.list}>
      {contactChannels.map(({ icon: Icon, label, href, external }) => {
        const content = (
          <>
            <span className={s.iconWrap}>
              <Icon className={s.icon} aria-hidden="true" />
            </span>
            <span className={s.label}>{label}</span>
          </>
        )
        return (
          <li key={label}>
            {href ? (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`${s.row} ${s.link}`}
              >
                {content}
              </a>
            ) : (
              <div className={s.row}>{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

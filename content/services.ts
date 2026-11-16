import { Building2, Headset, LayoutGrid, PenTool, ScanLine, Smartphone, type LucideIcon } from 'lucide-react'

export type Service = {
  icon: LucideIcon
  title: string
  text: string
  highlights: string[]
}

export const services: Service[] = [
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    text: 'Easy-to-use iOS and Android apps for your customers or field teams, complete with mobile money payments and offline access.',
    highlights: [
      'Works on both iPhone and Android phones',
      'Built-in M-Pesa, Airtel Money, and Mixx payments',
      'Continues working even when internet is slow',
    ],
  },
  {
    icon: ScanLine,
    title: 'Point of Sale (POS)',
    text: 'Fast, reliable checkout and inventory software for retail shops, supermarkets, pharmacies, and restaurants.',
    highlights: [
      'Quick barcode scanning and receipt printing',
      'Live stock tracking across all your branches',
      'Automatic TRA EFD receipts and daily sales reports',
    ],
  },
  {
    icon: Building2,
    title: 'Property Management (PMS)',
    text: 'All-in-one reservations, guest billing, housekeeping, and booking management for hotels, lodges, and apartments.',
    highlights: [
      'Visual room calendar and front-desk check-in',
      'Guest invoicing in both TZS and USD',
      'Housekeeping status and occupancy reports',
    ],
  },
  {
    icon: LayoutGrid,
    title: 'Custom Business Software',
    text: 'Tailored web systems, dashboards, and internal tools designed around the exact way your company operates.',
    highlights: [
      'Replaces scattered spreadsheets and manual paperwork',
      'Role-based access for staff, managers, and directors',
      'Clear financial and operational dashboards',
    ],
  },
  {
    icon: PenTool,
    title: 'Product & UI/UX Design',
    text: 'Clear, modern interface design and interactive prototypes so you can see and test your product before it is built.',
    highlights: [
      'Clickable screen previews before development starts',
      'Simple layouts your staff and customers learn in minutes',
      'Consistent branding across web and mobile',
    ],
  },
  {
    icon: Headset,
    title: 'Support & Maintenance',
    text: 'Ongoing updates, staff training, backups, and responsive local support to keep your business running smoothly.',
    highlights: [
      'Hands-on training for your staff and managers',
      'Regular security updates and automated backups',
      'Direct phone and email support from our local team',
    ],
  },
]

export const industries = [
  {
    title: 'Retail, Supermarkets & Pharmacies',
    text: 'Multi-branch point of sale, stock control, supplier tracking, and automated daily sales reconciliation.',
  },
  {
    title: 'Hotels, Safari Lodges & Real Estate',
    text: 'Room bookings, channel coordination, tenant billing, housekeeping workflows, and revenue reporting.',
  },
  {
    title: 'Financial Services & SACCOs',
    text: 'Customer mobile wallets, member portals, loan tracking, and mobile money collection and payouts.',
  },
  {
    title: 'Distribution, Logistics & Services',
    text: 'Field-sales ordering apps, delivery tracking, fleet scheduling, and customer invoicing portals.',
  },
]

/** Service names only — safe to pass to client components without the icons and copy. */
export const serviceTitles = services.map((s) => s.title)

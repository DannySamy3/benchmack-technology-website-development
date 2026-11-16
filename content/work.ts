export type CaseStudy = {
  slug: string
  image: string
  logo?: string
  category: string
  client: string
  title: string
  need: string
  text: string
  url?: string
  urlLabel?: string
  metrics: { value: string; label: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'smart-health',
    image: '/work/smart-health-showcase.jpg',
    logo: '/work/smart-health-logo.png',
    category: 'Healthcare & Supply Chain',
    client: 'Smart Health Platform · Tanzania',
    title: 'Smart Health — Pharmaceutical Supply Chain & Patient Care Network',
    need: 'Manufacturers, importers, distributors, pharmacies, and patients needed one verified network to track medicine authenticity, broadcast prescriptions to nearby pharmacies, consult licensed doctors, and dispatch emergency ambulances.',
    text: 'We designed and built the Smart Health web and mobile ecosystem — connecting verified pharmaceutical suppliers with instant patient care, prescription broadcasting, doctor consultations, and GPS emergency dispatch.',
    url: 'https://smarthealthapp.co/',
    urlLabel: 'Visit smarthealthapp.co',
    metrics: [
      { value: '6 Roles', label: 'Unified health network' },
      { value: '100%', label: 'Verified credentials' },
      { value: '24/7', label: 'Prescription & ambulance dispatch' },
    ],
  },
  {
    slug: 'multi-branch-pos',
    image: '/work/pos.jpg',
    category: 'Retail & Hospitality',
    client: 'Multi-Branch Retail Chain · Dar es Salaam',
    title: 'Point-of-sale system connecting 30+ retail branches',
    need: 'Store managers struggled with manual stock counts, slow cash-register queues, and end-of-day sales reconciliation across more than 30 locations.',
    text: 'We replaced disconnected cash registers with a unified POS that tracks stock in real time, accepts mobile money, and generates compliant receipts automatically.',
    metrics: [
      { value: '3×', label: 'Faster checkout' },
      { value: '30+', label: 'Branches connected' },
      { value: '-27%', label: 'Less stock loss' },
    ],
  },
  {
    slug: 'mobile-wallet',
    image: '/work/mobile.jpg',
    category: 'Financial Services',
    client: 'Digital Financial Services Provider · East Africa',
    title: 'Mobile wallet for everyday payments and savings',
    need: 'Customers needed a simple way to open accounts from their phones, transfer money instantly, and track savings without visiting a physical branch.',
    text: 'We designed and built a clean, secure mobile app that lets customers open accounts in minutes, send money instantly, and track their daily spending.',
    metrics: [
      { value: '120k+', label: 'Active users' },
      { value: '4.8★', label: 'Customer rating' },
      { value: '24/7', label: 'Instant transfers' },
    ],
  },
  {
    slug: 'hotel-property-management',
    image: '/work/pms.jpg',
    category: 'Hotels & Real Estate',
    client: 'Boutique Hotel & Lodge Group · Tanzania',
    title: 'Property management platform for a growing hotel group',
    need: 'Reservations, front-desk billing, and housekeeping were managed on separate spreadsheets, leading to double-bookings and slow guest check-ins.',
    text: 'We brought front-desk bookings, room status, and billing into one simple system — eliminating double-bookings and saving hours of manual paperwork every week.',
    metrics: [
      { value: '+22%', label: 'Room occupancy' },
      { value: '10 hrs', label: 'Saved every week' },
      { value: '0', label: 'Double-bookings' },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug)
}

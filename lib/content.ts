import {
  Building2,
  Headset,
  LayoutGrid,
  PenTool,
  ScanLine,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

export const CONTAINER = 'mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16'

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
]

export const stats = [
  { value: '40+', label: 'Products delivered' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '5+ yrs', label: 'Building for business' },
  { value: '24/7', label: 'Dedicated local support' },
]

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

export const caseStudies = [
  {
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

export const process = [
  {
    step: '01',
    title: 'Understand',
    duration: 'Weeks 1–2',
    text: 'We sit down with you to understand your business goals, daily workflows, and budget, then provide a clear plan and fixed quote.',
    outcome: 'You receive a clear project scope, timeline, and fixed-price proposal.',
  },
  {
    step: '02',
    title: 'Design',
    duration: 'Weeks 3–4',
    text: 'We design clean, intuitive screens you can click through and test on your phone or computer before development starts.',
    outcome: 'You approve the exact look and flow of every screen before we build.',
  },
  {
    step: '03',
    title: 'Build',
    duration: 'Every 2 Weeks',
    text: 'Our team builds your software step by step, sharing working progress with you every two weeks so you are always in control.',
    outcome: 'You test real, working software regularly with no surprises.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    duration: 'Ongoing',
    text: 'We launch your product, train your team on how to use it, and stay available for ongoing support and improvements.',
    outcome: 'Your team is trained, your system is live, and we are one call away.',
  },
]

export const workingModels = [
  {
    title: 'Fixed-Price Project',
    text: 'Best when you have a clear product or system you want built. We agree on the exact features, timeline, and fixed cost upfront.',
    points: [
      'Clear milestone schedule and fixed budget',
      'Complete design, build, and launch',
      'Free 60-day warranty after launch',
    ],
  },
  {
    title: 'Dedicated Product Team',
    text: 'Best for growing companies that want a dedicated team continuously building new features and expanding their platform month by month.',
    points: [
      'Dedicated designers and engineers for your business',
      'Flexible monthly priorities as your business grows',
      'Direct daily communication with your team',
    ],
  },
  {
    title: 'Support & Care Plan',
    text: 'Best for live systems that need reliable ongoing maintenance, staff onboarding, backups, and regular improvements.',
    points: [
      'Priority local phone and email support',
      'Daily backups and system health checks',
      'Monthly hours for updates and new features',
    ],
  },
]

export const values = [
  {
    title: 'Built around your business',
    text: 'We never force you into complicated templates. We learn how your staff and customers actually work and build software that fits naturally.',
  },
  {
    title: 'Plain language, no jargon',
    text: 'You will never get lost in confusing technical talk. We communicate clearly, show real progress every two weeks, and stick to our timelines.',
  },
  {
    title: '100% yours, with no lock-in',
    text: 'Once your project is complete, you own 100% of your software and business data.',
  },
  {
    title: 'Local team in Dar es Salaam',
    text: 'We understand East African business — from M-Pesa and Airtel Money to TRA receipts — and we are right here when you need us.',
  },
]

export const testimonials = [
  {
    quote:
      'Benchmack rebuilt our point-of-sale from the ground up. Checkout is faster, stock is accurate, and our managers finally trust the numbers.',
    name: 'Operations Director',
    company: 'Retail Chain, Dar es Salaam',
  },
  {
    quote:
      'They work like a true partner. Regular demos meant there were never surprises, and we launched our mobile app ahead of schedule.',
    name: 'Founder & CEO',
    company: 'Fintech Company',
  },
  {
    quote:
      'Our front desk and housekeeping now run on one simple system. Guests notice the difference, and so does our revenue.',
    name: 'General Manager',
    company: 'Boutique Hotel Group',
  },
]

export const team = [
  {
    name: 'Daniel Ntunduye',
    role: 'Engineering Lead',
    bio: 'Leads software architecture and ensures every system we deliver is fast, reliable, and built to last.',
    initials: 'DN',
  },
  {
    name: 'Jullu Masatu',
    role: 'Product & Delivery Lead',
    bio: 'Works closely with clients from day one to translate business goals into simple, effective software.',
    initials: 'JM',
  },
  {
    name: 'Samwel Soka',
    role: 'Senior Software Engineer',
    bio: 'Specializes in web and mobile applications, payment integrations, and smooth everyday user experiences.',
    initials: 'SS',
  },
]

export const faqs = [
  {
    q: 'How much does a project cost?',
    a: 'Cost depends on what you need built. After a short conversation about your goals, we provide a clear, fixed-price proposal with no hidden fees. We can also phase the work into stages to fit your budget.',
  },
  {
    q: 'How long does it take to build and launch?',
    a: 'Most first versions launch in 8 to 12 weeks. For larger systems, we roll out in stages so your team can start using key features early.',
  },
  {
    q: 'Can you connect mobile money, banks, and TRA receipts?',
    a: 'Yes. We regularly connect M-Pesa, Airtel Money, Mixx, local bank payments, SMS alerts, and TRA EFD receipts directly into your software.',
  },
  {
    q: 'Do we own the software once it is finished?',
    a: 'Yes. You own 100% of your software and business data upon completion, with no lock-in.',
  },
  {
    q: 'Do you train our staff and provide support after launch?',
    a: 'Absolutely. We train your team to use the system confidently, include a free 60-day warranty period after launch, and offer ongoing monthly support plans.',
  },
  {
    q: 'What if we only have an idea and do not have designs yet?',
    a: 'That is completely fine. Most of our clients come to us with a business goal or problem. We guide you through planning, screen design, building, and launch step by step.',
  },
  {
    q: 'Can you improve or replace a system we already use?',
    a: 'Yes. We can modernize your existing software, migrate your current business records safely, and train your staff on the upgraded system without disrupting daily operations.',
  },
]

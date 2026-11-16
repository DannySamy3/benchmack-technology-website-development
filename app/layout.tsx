import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { SkipLink } from '@/components/layout/skip-link'
import { JsonLd } from '@/components/ui/json-ld'
import { serviceTitles } from '@/content/services'
import {
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  socialLinks,
} from '@/content/site'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const description =
  'Benchmack Technology builds reliable mobile apps, point-of-sale systems, property management software, and custom web platforms for businesses in Tanzania.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Benchmack Technology | Software Development Company in Tanzania',
    template: `%s | ${COMPANY_NAME}`,
  },
  description,
  keywords: [
    'software development company Tanzania',
    'mobile app development',
    'POS system Tanzania',
    'property management system PMS',
    'custom software Dar es Salaam',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Benchmack Technology | Software Development Company',
    description: 'Reliable software built around how your business works.',
    url: '/',
    siteName: COMPANY_NAME,
    locale: 'en_TZ',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
  themeColor: '#ffffff',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: COMPANY_NAME,
  legalName: COMPANY_LEGAL_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
  description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dar es Salaam',
    addressCountry: 'TZ',
  },
  areaServed: ['Tanzania', 'East Africa'],
  openingHours: 'Mo-Fr 08:00-18:00',
  knowsAbout: serviceTitles,
  ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.href) } : {}),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  )
}

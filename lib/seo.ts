import type { Metadata } from 'next'
import { COMPANY_NAME } from '@/content/site'

const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Benchmack Technology — software development company in Dar es Salaam, Tanzania',
}

/**
 * Per-page metadata with a canonical URL and matching Open Graph tags.
 * Next.js replaces (not merges) `openGraph` per page, so we rebuild it here.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${COMPANY_NAME}`,
      description,
      url: path,
      siteName: COMPANY_NAME,
      locale: 'en_TZ',
      type: 'website',
      // Fall back to the generated app/opengraph-image, which a page-level
      // openGraph object would otherwise drop.
      images: [image ?? DEFAULT_OG_IMAGE],
    },
  }
}

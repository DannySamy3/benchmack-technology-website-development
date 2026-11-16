import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'
import { caseStudies } from '@/content/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/services', '/work', '/process', '/about', '/faq', '/contact', '/privacy']

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === '/privacy' ? 0.3 : 0.8,
    })),
    ...caseStudies.map((study) => ({
      url: `${SITE_URL}/work/${study.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}

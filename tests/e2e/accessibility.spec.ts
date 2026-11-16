import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const paths = [
  '/',
  '/services',
  '/work',
  '/work/smart-health',
  '/process',
  '/about',
  '/faq',
  '/contact',
  '/privacy',
]

for (const path of paths) {
  test(`${path} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const summary = results.violations.map((v) => ({
      rule: v.id,
      impact: v.impact,
      help: v.help,
      targets: v.nodes.map((n) => n.target.join(' ')).slice(0, 5),
    }))
    expect(summary).toEqual([])
  })
}

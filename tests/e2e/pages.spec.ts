import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', h1: /Reliable software built around how your business works/ },
  { path: '/services', h1: /Practical software solutions/ },
  { path: '/work', h1: /Built for real businesses/ },
  { path: '/process', h1: /A simple, transparent process/ },
  { path: '/about', h1: /A dedicated software partner/ },
  { path: '/faq', h1: /Clear answers before we start/ },
  { path: '/contact', h1: /discuss your project/ },
  { path: '/privacy', h1: /How we handle your information/ },
  { path: '/work/smart-health', h1: /Smart Health/ },
]

for (const { path, h1 } of pages) {
  test(`${path} renders with title, heading, and canonical URL`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(/Benchmack Technology/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(h1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://benchmacktech.co.tz${path === '/' ? '' : path}`,
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  })
}

test('pages load without console errors or hydration mismatches', async ({ page }) => {
  // A hydration mismatch makes React throw away the server HTML and re-render on the client.
  const problems: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' || /hydrat/i.test(msg.text())) problems.push(`${page.url()}: ${msg.text()}`)
  })
  page.on('pageerror', (err) => problems.push(`${page.url()}: ${err.message}`))

  for (const { path } of pages) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
  }
  expect(problems).toEqual([])
})

test('unknown pages return a helpful 404', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/couldn.t find that page/)
  await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible()
})

test('every case study on /work links to a working detail page', async ({ page }) => {
  await page.goto('/work')
  const links = page.getByRole('link', { name: /^Read case study:/ })
  const hrefs = await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')))
  expect(hrefs.length).toBeGreaterThanOrEqual(4)

  for (const href of hrefs) {
    const response = await page.goto(href!)
    expect(response?.status(), href!).toBe(200)
    await expect(page.getByRole('link', { name: 'All projects' })).toBeVisible()
  }
})

test('responses carry security headers', async ({ request }) => {
  const response = await request.get('/')
  const headers = response.headers()
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers['strict-transport-security']).toContain('max-age=')
  expect(headers['x-content-type-options']).toBe('nosniff')
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  expect(headers['x-powered-by']).toBeUndefined()
})

test('sitemap and robots are published', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBeTruthy()
  const xml = await sitemap.text()
  expect(xml).toContain('https://benchmacktech.co.tz/work/smart-health')
  expect(xml).toContain('https://benchmacktech.co.tz/privacy')

  const robots = await request.get('/robots.txt')
  expect(await robots.text()).toContain('Sitemap: https://benchmacktech.co.tz/sitemap.xml')
})

test.describe('navigation', () => {
  test('desktop nav marks the current page', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Desktop navigation only')
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Services' }).click()
    await expect(page).toHaveURL(/\/services$/)
    await expect(
      page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Services' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  test('mobile menu opens, navigates, and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile navigation only')
    await page.goto('/')
    const drawer = page.locator('#mobile-navigation-drawer')
    const workLink = drawer.getByRole('link', { name: 'Work' })

    // Closed drawer is off-screen and inert, so keyboard users cannot focus its links.
    await expect(drawer).toHaveAttribute('inert', '')
    await expect(drawer).not.toBeInViewport()
    await workLink.focus()
    await expect(workLink).not.toBeFocused()

    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await expect(drawer).not.toHaveAttribute('inert')
    await expect(workLink).toBeInViewport()

    await page.keyboard.press('Escape')
    await expect(drawer).toHaveAttribute('inert', '')

    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await workLink.click()
    await expect(page).toHaveURL(/\/work$/)
    await expect(drawer).toHaveAttribute('inert', '')
  })

  test('skip link moves focus to the main content', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard navigation')
    await page.goto('/about')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await skip.press('Enter')
    await expect(page).toHaveURL(/#main-content$/)
  })
})

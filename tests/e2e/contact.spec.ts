import { expect, test } from '@playwright/test'

test.describe('contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('shows field errors and keeps what the visitor typed', async ({ page }) => {
    await page.getByLabel('Email').fill('not-an-email')
    await page.getByLabel('Company (optional)').fill('Acme Ltd')
    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByRole('status')).toContainText('Please check the highlighted fields.')
    await expect(page.getByText('Please enter your name.')).toBeVisible()
    await expect(page.getByText('Please enter a valid email address.')).toBeVisible()
    await expect(page.getByText('Please tell us a little about your project.')).toBeVisible()

    await expect(page.getByLabel('Name')).toHaveAttribute('aria-invalid', 'true')
    await expect(page.getByLabel('Email')).toHaveValue('not-an-email')
    await expect(page.getByLabel('Company (optional)')).toHaveValue('Acme Ltd')
  })

  test('sends a valid enquiry and clears the form', async ({ page }) => {
    await page.getByLabel('Name').fill('Asha Mwita')
    await page.getByLabel('Email').fill('asha@example.com')
    await page.getByLabel('Phone / WhatsApp (optional)').fill('+255 700 000 000')
    await page.getByLabel('What do you need?').selectOption('Point of Sale (POS)')
    await page.getByLabel('When do you want to start?').selectOption('Within 1–3 months')
    await page.getByLabel('How can we help?').fill('We need a POS for three pharmacy branches.')
    await page.getByRole('button', { name: 'Send message' }).click()

    await expect(page.getByRole('status')).toContainText('your message has been sent')
    await expect(page.getByLabel('Name')).toHaveValue('')
    await expect(page.getByLabel('How can we help?')).toHaveValue('')
  })

  test('links to the privacy policy', async ({ page }) => {
    await page.getByRole('link', { name: 'Privacy Policy' }).first().click()
    await expect(page).toHaveURL(/\/privacy$/)
  })
})

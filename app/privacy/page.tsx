import { PageHeader } from '@/components/sections/page-header'
import { COMPANY_LEGAL_NAME, CONTACT_EMAIL, LOCATION } from '@/content/site'
import { CONTAINER } from '@/lib/styles'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Benchmack Technology collects, uses, and protects the personal information you share with us through this website.',
  path: '/privacy',
})

const LAST_UPDATED = '16 November 2026'

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Who we are',
    body: (
      <p>
        This website is operated by {COMPANY_LEGAL_NAME} (&ldquo;Benchmack Technology&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;), a software development company based in {LOCATION}. We are
        responsible for the personal information described in this policy.
      </p>
    ),
  },
  {
    title: 'What we collect',
    body: (
      <>
        <p>When you use our contact form, we collect the details you choose to give us:</p>
        <ul>
          <li>your name and email address;</li>
          <li>optionally, your phone or WhatsApp number and company name;</li>
          <li>the service and timeline you select, and the message you write.</li>
        </ul>
        <p>
          This website does not use cookies or analytics tracking. Like most websites, our server keeps
          short-lived technical logs, such as IP addresses and the pages requested, to keep the site secure
          and prevent spam.
        </p>
      </>
    ),
  },
  {
    title: 'How we use it',
    body: (
      <ul>
        <li>to reply to your enquiry and arrange a consultation;</li>
        <li>to prepare a project proposal or quote you have asked for;</li>
        <li>to protect this website and its contact form from abuse and spam.</li>
      </ul>
    ),
  },
  {
    title: 'Who we share it with',
    body: (
      <p>
        We do not sell or rent your personal information. Contact form messages are delivered to our team by a
        trusted email delivery provider, the form uses a security check from Cloudflare to block spam, and
        this website runs on a cloud server rented from a hosting provider. These providers process data only
        on our behalf, to provide their service to us.
      </p>
    ),
  },
  {
    title: 'How long we keep it',
    body: (
      <p>
        We keep enquiry details for as long as needed to respond to you and, if we work together, for the
        duration of our business relationship and any period required by law. You can ask us to delete your
        details at any time.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <p>
        In line with Tanzania&apos;s Personal Data Protection Act, 2022, you may ask to see the personal
        information we hold about you, ask us to correct or delete it, or object to how we use it. To make a
        request, email us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-brand hover:text-brand-soft">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    ),
  },
  {
    title: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The date at the top of this page shows when it was last
        changed.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        label="Privacy Policy"
        title="How we handle your information."
        text={`Last updated: ${LAST_UPDATED}`}
      />

      <section className={`${CONTAINER} py-12 lg:py-20`}>
        <div className="max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold tracking-tight text-fg">{s.title}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-fg-muted [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

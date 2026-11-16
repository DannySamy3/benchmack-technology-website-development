'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { sendContactMessage } from '@/features/contact/actions'
import {
  OTHER_SERVICE_OPTION,
  TIMELINE_OPTIONS,
  type ContactField,
  type ContactState,
} from '@/features/contact/schema'
import { TurnstileWidget } from '@/features/contact/turnstile-widget'
import { arrowIcon, btnPrimary } from '@/lib/styles'

const initialState: ContactState = { status: 'idle' }

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

const inputClass =
  'min-h-[44px] rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-base sm:text-sm text-fg placeholder:text-fg-subtle focus:border-brand aria-[invalid=true]:border-red-500'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: React.ReactNode
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Contact form (client). `serviceOptions` is passed in from the server page so
 * the full services content and its icons are not bundled into the browser.
 */
export function ContactForm({ serviceOptions }: { serviceOptions: string[] }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState)
  const v = state.values ?? {}
  const err = (field: ContactField) => state.errors?.[field]
  const a11y = (field: ContactField) =>
    err(field) ? { 'aria-invalid': true as const, 'aria-describedby': `contact-${field}-error` } : {}

  return (
    <form
      id="contact-form"
      action={formAction}
      noValidate
      className="animate-fade-up delay-3 flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-2xs sm:p-8"
    >
      <div role="status" aria-live="polite">
        {state.status === 'success' && (
          <p className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}
        {state.status === 'error' && state.message && (
          <p className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}
      </div>

      {/* Honeypot for spam bots — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={err('name')}>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            defaultValue={v.name}
            className={inputClass}
            {...a11y('name')}
          />
        </Field>
        <Field id="contact-email" label="Email" error={err('email')}>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            defaultValue={v.email}
            className={inputClass}
            {...a11y('email')}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-phone" label="Phone / WhatsApp (optional)">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+255 7xx xxx xxx"
            defaultValue={v.phone}
            className={inputClass}
          />
        </Field>
        <Field id="contact-company" label="Company (optional)">
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            placeholder="Your company"
            defaultValue={v.company}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-service" label="What do you need?">
          <select id="contact-service" name="service" defaultValue={v.service ?? ''} className={inputClass}>
            <option value="">Select an option</option>
            {serviceOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
            <option value={OTHER_SERVICE_OPTION}>{OTHER_SERVICE_OPTION}</option>
          </select>
        </Field>
        <Field id="contact-timeline" label="When do you want to start?">
          <select
            id="contact-timeline"
            name="timeline"
            defaultValue={v.timeline ?? ''}
            className={inputClass}
          >
            <option value="">Select an option</option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="contact-message" label="How can we help?" error={err('message')}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Briefly describe your project or business need…"
          defaultValue={v.message}
          className={`${inputClass} resize-none`}
          {...a11y('message')}
        />
      </Field>

      {TURNSTILE_SITE_KEY && <TurnstileWidget siteKey={TURNSTILE_SITE_KEY} resetKey={state} />}

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">
          We only use your details to reply to you. See our{' '}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
            Privacy Policy
          </Link>
          .
        </p>
        <button id="contact-submit" type="submit" disabled={pending} className={`${btnPrimary} shrink-0`}>
          {pending ? (
            <>
              Sending…
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send message
              <ArrowRight className={arrowIcon} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}

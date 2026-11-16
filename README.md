# Benchmack Technology website

Marketing site for Benchmack Technology, a software development company in Dar es Salaam, Tanzania.
Live at [benchmacktech.co.tz](https://benchmacktech.co.tz).

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Every page is statically
generated; the only server code is the contact form action. It is self-hosted on a VPS with Docker and
nginx — see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

## Getting started

Requires Node.js 20.19 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see below)
npm run dev                  # http://localhost:3000
```

## Scripts

| Command                | What it does                                                            |
| ---------------------- | ----------------------------------------------------------------------- |
| `npm run dev`          | Start the development server                                            |
| `npm run build`        | Production build (standalone server in `.next/standalone`)              |
| `npm start`            | Serve the production build (`PORT` / `HOSTNAME` env vars, default 3000) |
| `npm run lint`         | ESLint (Next.js, React Hooks, TypeScript and accessibility rules)       |
| `npm run typecheck`    | TypeScript type-check                                                   |
| `npm run format`       | Format all files with Prettier                                          |
| `npm run format:check` | Check formatting without changing files                                 |
| `npm run check`        | Lint + type-check + format check                                        |
| `npm test`             | Playwright tests: pages, contact form, accessibility (axe), unit tests  |

Tests build the site and run it on port 3100. Locally they use your installed Google Chrome; run
`npx playwright install chromium` if you don't have Chrome.

## Project structure

```
app/                  Routes only. Each page.tsx is thin and composes components below.
  work/[slug]/          Case study pages, generated from content/work.ts
  opengraph-image.tsx   Generated share image; icon.svg / apple-icon.tsx are the favicons
components/
  brand/                Logo and the brand mark (shared by logo, favicon and share image)
  layout/               Header, footer, skip link, contact details
                        (desktop-nav, nav-link and mobile-menu are the only client parts)
  sections/             Reusable page blocks: page header, section heading, CTA banner
  home/                 One file per home page section
  services/ work/       Cards used on more than one page
  ui/                   Small primitives: check list, JSON-LD
features/contact/     Contact form (client), server action, validation, email and Turnstile helpers
content/              All site text and data, one file per topic
lib/                  Generic helpers: SEO metadata, rate limiter, shared class names
tests/e2e/            Playwright browser tests      tests/unit/  Unit tests
deploy/               nginx config                  scripts/     Build helpers
```

Conventions:

- **Server components by default.** Add `'use client'` only to the smallest component that needs
  state, effects or the current route, and pass server-rendered content into it as props or
  children so it isn't re-rendered or shipped as JavaScript.
- **Don't import `content/` into client components.** Pass in only the values they need (see
  `serviceOptions` on the contact form) to keep site copy out of the browser bundle.
- Files that must never reach the browser start with `import 'server-only'`.

## Editing content

All text lives in [`content/`](content/):

| File            | Contains                                                        |
| --------------- | --------------------------------------------------------------- |
| `site.ts`       | Company name, domain, contact details, navigation, social links |
| `services.ts`   | Services and industries                                         |
| `work.ts`       | Case studies                                                    |
| `technology.ts` | Technology section                                              |
| `process.ts`    | Process steps and ways to work together                         |
| `company.ts`    | Home page figures, values, team and testimonials                |
| `faqs.ts`       | FAQ questions and answers                                       |

To show a phone number, WhatsApp link or social profiles across the site, fill in `CONTACT_PHONE`,
`WHATSAPP_NUMBER` and `socialLinks` in `content/site.ts`.

Adding a case study to `caseStudies` automatically creates its page at `/work/<slug>` and adds it to
the sitemap. Put images in `public/work/`.

## Environment variables

See [`.env.example`](.env.example). Put them in `.env.local` for local development and in
`.env.production` on the server ([DEPLOYMENT.md](DEPLOYMENT.md), step 4). `NEXT_PUBLIC_*` values are
built into the browser code, so changing one requires a rebuild.

| Variable                         | Required | Purpose                                                                |
| -------------------------------- | -------- | ---------------------------------------------------------------------- |
| `RESEND_API_KEY`                 | Yes      | Sends contact form enquiries by email via [Resend](https://resend.com) |
| `CONTACT_FROM_EMAIL`             | Yes      | Sender address on a domain verified in Resend                          |
| `CONTACT_TO_EMAIL`               | No       | Inbox for enquiries (defaults to `support@benchmacktech.co.tz`)        |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No\*     | Cloudflare Turnstile spam protection (public site key)                 |
| `TURNSTILE_SECRET_KEY`           | No\*     | Cloudflare Turnstile secret key                                        |
| `CONTACT_DRY_RUN`                | No       | `1` logs enquiries instead of emailing them — tests only               |

\* Strongly recommended in production. Set both Turnstile keys or neither.

Without the Resend variables the form still validates input but asks visitors to email directly.

## Security

- Security headers (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in
  [`next.config.mjs`](next.config.mjs). If you add a third-party script, image host or iframe, allow
  its origin in the Content Security Policy there.
- The contact form has server-side validation, a honeypot field, optional Cloudflare Turnstile, and a
  per-IP rate limit: 5 delivered enquiries per 10 minutes in the app, plus 10 submissions per minute
  enforced by nginx ([`deploy/nginx.conf`](deploy/nginx.conf)).

## Deployment

Production runs as a Docker container behind nginx on a VPS. Files:

- [`Dockerfile`](Dockerfile) and [`docker-compose.yml`](docker-compose.yml): the app container
- [`deploy/nginx.conf`](deploy/nginx.conf): HTTPS, redirects and rate limiting
- [`DEPLOYMENT.md`](DEPLOYMENT.md): step-by-step server setup, updates and operations

## Continuous integration

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs lint, type-check, format check, build, the
full test suite and a Docker image build on every push to `main` and on every pull request.

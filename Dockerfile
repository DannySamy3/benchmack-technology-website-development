# syntax=docker/dockerfile:1
# Production image for the Benchmack Technology website (Next.js standalone output).
# Build:  docker compose --env-file .env.production build
# See DEPLOYMENT.md for the full server setup.

# Alpine (musl) avoids the glibc memory-fragmentation issue sharp has during image optimization.
ARG NODE_VERSION=22-alpine

# ---- 1. Install dependencies ----
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- 2. Build ----
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the browser JavaScript at build time,
# so the Turnstile site key must be passed as a build argument.
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=""
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY}
ENV NEXT_TELEMETRY_DISABLED=1

# `npm run build` also copies public/ and .next/static/ into .next/standalone (postbuild).
RUN npm run build

# ---- 3. Run ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# The standalone folder contains server.js, the minimal node_modules it needs,
# and the static assets. It must be writable by nextjs for the image cache.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]

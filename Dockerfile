# syntax=docker/dockerfile:1
# Production image for the Benchmack Technology website (Next.js standalone output).
# Build and run:  docker compose --env-file .env.production up -d --build
# See DEPLOYMENT.md for the full server setup.

# Alpine (musl) avoids the glibc memory-fragmentation issue sharp has during image optimization.
# Both versions are pinned together: the runtime stage copies the node binary onto plain
# Alpine, which only works when the Alpine versions match. Update them together.
ARG NODE_MAJOR=22
ARG ALPINE_VERSION=3.24

# ---- 1. Install dependencies ----
FROM node:${NODE_MAJOR}-alpine${ALPINE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- 2. Build ----
FROM node:${NODE_MAJOR}-alpine${ALPINE_VERSION} AS builder
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
# Plain Alpine plus only the node binary: no npm, npx, Corepack or Yarn at runtime
# (about 30 MB smaller than the node image, and less attack surface).
FROM node:${NODE_MAJOR}-alpine${ALPINE_VERSION} AS node
FROM alpine:${ALPINE_VERSION} AS runner
WORKDIR /app

RUN apk add --no-cache libstdc++ \
 && addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
COPY --from=node /usr/local/bin/node /usr/local/bin/node

# PORT: 3878 is deliberately unusual so it won't clash with other apps on the server
# (3000/8080/5000 are common defaults). Change it with APP_PORT in docker-compose.yml.
# NODE_OPTIONS / UV_THREADPOOL_SIZE / VIPS_CONCURRENCY: low-memory tuning for a small
# static site — cap the JS heap, shrink the young generation so garbage is collected
# sooner, and limit image-processing threads (see DEPLOYMENT.md, "Resource usage").
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3878 \
    HOSTNAME=0.0.0.0 \
    NODE_OPTIONS="--max-old-space-size=128 --max-semi-space-size=4" \
    UV_THREADPOOL_SIZE=2 \
    VIPS_CONCURRENCY=1

# The standalone folder contains server.js, the minimal node_modules it needs,
# and the static assets. It must be writable by nextjs for the image cache.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

USER nextjs
EXPOSE 3878

# BusyBox wget is far lighter than starting a second Node process for each check.
HEALTHCHECK --interval=60s --timeout=5s --start-period=30s --start-interval=2s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/robots.txt" || exit 1

CMD ["node", "server.js"]

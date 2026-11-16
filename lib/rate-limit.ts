/**
 * Small in-memory sliding-window rate limiter.
 *
 * Limits live in the memory of the Node.js process. On the single VPS this site
 * runs on, that makes them site-wide (they reset when the container restarts).
 * nginx enforces a second, coarser limit (deploy/nginx.conf). If the site ever
 * runs as several instances, move this to a shared store such as Redis.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 5000,
}: {
  limit: number
  windowMs: number
  maxKeys?: number
}) {
  const hits = new Map<string, number[]>()

  function prune(now: number) {
    for (const [key, times] of hits) {
      const recent = times.filter((t) => now - t < windowMs)
      if (recent.length === 0) hits.delete(key)
      else hits.set(key, recent)
    }
  }

  return {
    /** Records an attempt for `key` and reports whether it is allowed. */
    check(key: string, now = Date.now()): { allowed: boolean; retryAfterMs: number } {
      if (hits.size > maxKeys) prune(now)

      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
      if (recent.length >= limit) {
        hits.set(key, recent)
        return { allowed: false, retryAfterMs: windowMs - (now - recent[0]) }
      }

      recent.push(now)
      hits.set(key, recent)
      return { allowed: true, retryAfterMs: 0 }
    },
  }
}

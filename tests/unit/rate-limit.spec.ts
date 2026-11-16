import { expect, test } from '@playwright/test'
import { createRateLimiter } from '@/lib/rate-limit'

test.describe('createRateLimiter', () => {
  test('allows up to the limit, then blocks until the window passes', () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 })
    expect(limiter.check('a', 0).allowed).toBe(true)
    expect(limiter.check('a', 100).allowed).toBe(true)
    expect(limiter.check('a', 200).allowed).toBe(true)

    const blocked = limiter.check('a', 300)
    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterMs).toBe(700)

    // The first hit leaves the window at t=1000.
    expect(limiter.check('a', 1000).allowed).toBe(true)
  })

  test('tracks each key separately', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    expect(limiter.check('a', 0).allowed).toBe(true)
    expect(limiter.check('b', 0).allowed).toBe(true)
    expect(limiter.check('a', 1).allowed).toBe(false)
  })

  test('prunes expired keys when the map grows too large', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2 })
    limiter.check('a', 0)
    limiter.check('b', 0)
    limiter.check('c', 0)
    // All earlier keys have expired by t=5000, so pruning keeps memory bounded
    // and old keys are allowed again.
    expect(limiter.check('d', 5000).allowed).toBe(true)
    expect(limiter.check('a', 5000).allowed).toBe(true)
  })
})
